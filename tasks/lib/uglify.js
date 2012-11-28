/*
 * grunt-contrib-uglify
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var UglifyJS = require('uglify-js');
var gzip = require('gzip-js');
var fs = require('fs');

exports.init = function(grunt) {
  var exports = {};

  // Minify with UglifyJS.
  // From https://github.com/mishoo/UglifyJS2
  // API docs at http://lisperator.net/uglifyjs/
  exports.minify = function(files, dest, options) {
    options = options || {};

    grunt.verbose.write('Minifying with UglifyJS...');

    try {
      var topLevel = null;
      var totalCode = '';

      files.forEach(function(file){
        var code = grunt.file.read(file);
        totalCode += code;
        topLevel = UglifyJS.parse(code, {
          filename: file,
          toplevel: topLevel
        });
      });

      var outputOptions = {
        beautify: false,
        source_map: null,
      };

      if (options.preserveComments) {
        if (options.preserveComments === 'all' || options.preserveComments === true) {
          // preserve all the comments we can
          outputOptions.comments = true;
        } else if (options.preserveComments === 'some') {
          // preserve comments with directives or that start with a bang (!)
          outputOptions.comments = function(node, comment) {
            return (/^!|@preserve|@license|@cc_on/i).test(comment.value);
          };
        } else if (grunt.util._.isFunction(options.preserveComments)) {
          // support custom functions passed in
          outputOptions.comments = options.preserveComments;
        }
      }

      if (options.beautify) {
        if (grunt.util._.isObject(options.beautify)) {
          grunt.util._.extend(outputOptions, options.beautify);
        } else {
          outputOptions.beautify = true;
        }
      }

      if (options.source_map) {
        if (grunt.util._.isObject(options.source_map)) {
          outputOptions.source_map = UglifyJS.SourceMap(options.source_map);
        } else {
          outputOptions.source_map = UglifyJS.SourceMap({
            file: dest,
            root: undefined,
            orig: undefined
          });
        }
      }

      var output = UglifyJS.OutputStream(outputOptions);

      // Need to call this before we mangle or compress,
      // and call after any compression or ast altering
      topLevel.figure_out_scope();

      var compressor;
      if (options.compress !== false) {
        if (options.compress.warnings !== true) {
          options.compress.warnings = false;
        }
        compressor = UglifyJS.Compressor(options.compress);
        topLevel = topLevel.transform(compressor);

        // Need to figure out scope again after source being altered
        topLevel.figure_out_scope();
      }

      if (options.mangle !== false) {
        // compute_char_frequency optimizes names for compression
        topLevel.compute_char_frequency(options.mangle);

        // Requires previous call to figure_out_scope
        // and should always be called after compressor transform
        topLevel.mangle_names(options.mangle);
      }

      // Print the ast to OutputStream
      topLevel.print(output);

      var min = output.get();

      if (options.source_map) {
        min += '\n//@ sourceMappingURL=' + options.source_map;
      }

      var result = {
        max: totalCode,
        min: min,
        source_map: outputOptions.source_map,
      };

      grunt.verbose.ok();

      return result;
    } catch (e) {
      grunt.verbose.error();
      if (e instanceof UglifyJS.DefaultsError) {
        grunt.warn(e.msg);
        grunt.verbose.log('Supported options:');
        grunt.verbose.debug(e.defs);
      } else {
        grunt.verbose.error(e.stack).or.writeln(e.toString().red);
      }
      grunt.warn('UglifyJS found errors.');
    }
  };

  return exports;
};
