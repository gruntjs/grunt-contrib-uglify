/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var uglify = require('./lib/uglify').init(grunt);
  var minlib = require('./lib/min').init(grunt);
  var path = require("path");

  grunt.registerMultiTask('uglify', 'Minify files with UglifyJS.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      banner: '',
      compress: {
        warnings: false
      },
      mangle: {},
      beautify: false
    });
    var result;

    // The source files to be processed. The "nonull" option is used
    // to retain invalid files/patterns so they can be warned about.
    var files = grunt.file.expand({nonull: true}, this.file.srcRaw),
      dest = this.file.dest;

    // Warn if a source file/pattern was invalid.
    var invalidSrc = files.some(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.error('Source file "' + filepath + '" not found.');
        return true;
      }
    });
    if (invalidSrc) { return false; }

    // Minify files, warn and fail on error.
    try {
      if (grunt.file.isDir(dest)) {
        result = files.map(function (file) {
          return uglify.minify([ file ], path.join(dest, path.basename(file)), options);
        });
      } else {
        result = [ uglify.minify(files, dest, options) ];
      }
    } catch(e) {
      grunt.log.error(e);
      grunt.fail.warn('uglification failed!');
    }

    result.forEach(function (result, x) {
      // Concat banner + minified source.
      var banner = grunt.template.process(options.banner);
      var output = banner + result.min;

      if (x > 0) grunt.log.writeln();

      // Write the destination file.
      grunt.file.write(result.dest, output);

      // Write source map
      if (options.sourceMap) {
        grunt.file.write(options.sourceMap, result.sourceMap);
        grunt.log.writeln('Source Map ' + options.sourceMap.cyan + ' created.');
      }

      // Print a success message.
      grunt.log.writeln('File ' + result.dest.cyan + ' created.');

      // ...and report some size information.
      minlib.info(result.min, result.max);
    });

    // Fail task if any errors were logged.
    if (this.errorCount > 0) { return false; }
  });

};
