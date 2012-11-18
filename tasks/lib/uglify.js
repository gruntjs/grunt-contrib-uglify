/*
 * grunt-contrib-uglify
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var uglifyjs = require('uglify-js2');
var gzip = require('gzip-js');
var fs = require('fs');

exports.init = function(grunt) {
  var exports = {};

  // Minify with UglifyJS2.
  // From https://github.com/mishoo/UglifyJS2
  // API docs at http://lisperator.net/uglifyjs/
  exports.minify = function(src, dest, options) {

    options = options || {};

    var code = grunt.file.read(src);
    grunt.verbose.write('Minifying with UglifyJS...');
    try {

      var ast = uglifyjs.parse(code, {
        // filename necessary for source map
        filename : src
      });

      var outputOptions = {
        beautify    : false,
        source_map  : null
      };

      if (options.beautify) {
        grunt.util._.extend(outputOptions, options.beautify);
        outputOptions.beautify = true;
      }

      if (options.source_map) {
        outputOptions.source_map = uglifyjs.SourceMap({
          file : dest,
          root: undefined,
          orig: undefined
        });
      }

      var output = uglifyjs.OutputStream(outputOptions);

      // Need to call this before we mangle or compress,
      // and call after any compression or ast altering
      ast.figure_out_scope();

      if (options.compress !== false) {
        var compressor = uglifyjs.Compressor(options.compress);
        ast = ast.transform(compressor);

        // Need to figure out scope again after source being altered
        ast.figure_out_scope();
      }

      if (options.mangle !== false ) {
        // compute_char_frequency optimizes names for compression
        ast.compute_char_frequency(options.mangle);

        // Requires previous call to figure_out_scope
        // and should always be called after compressor transform
        ast.mangle_names(options.mangle);
      }

      // Print the ast to OutputStream
      ast.print(output);

      var min = output.get();

      if (options.source_map) {
        min += "\n//@ sourceMappingURL=" + options.source_map;
      }

      var result = {
        max : code,
        min : min,
        source_map : outputOptions.source_map
      };

      grunt.verbose.ok();

      return result;
    } catch(e) {
      grunt.verbose.error();
      if (e instanceof uglifyjs.DefaultsError) {
        grunt.warn(e.msg);
        grunt.verbose.log("Supported options:");
        grunt.verbose.debug(e.defs);
      } else {
        grunt.verbose.error(e.stack).or.writeln(e.toString().red);
      }
      grunt.warn('UglifyJS found errors.', 10);
    }
  };

  // Return gzipped source.
  exports.gzip = function(src) {
    return src ? gzip.zip(src, {}) : '';
  };

  // Output some size info about a file.
  exports.info = function(min, max) {
    var gzipSize = String(exports.gzip(min).length);
    grunt.log.writeln('Uncompressed size: ' + String(max.length).green + ' bytes.');
    grunt.log.writeln('Compressed size: ' + gzipSize.green + ' bytes gzipped (' + String(min.length).green + ' bytes minified).');
  };

  return exports;
};
