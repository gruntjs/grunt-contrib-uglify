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
    var files = grunt.file.expand({nonull: true}, this.file.srcRaw);

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
      result = uglify.minify(files, this.file.dest, options);
    } catch(e) {
      grunt.log.error(e);
      grunt.fail.warn('uglification failed!');
    }

    // Concat banner + minified source.
    var banner = grunt.template.process(options.banner);
    var output = banner + result.min;

    // Write the destination file.
    grunt.file.write(this.file.dest, output);

    // Write source map
    if (options.sourceMap) {
      grunt.file.write(options.sourceMap, result.sourceMap);
    }

    // Print a success message.
    grunt.log.writeln('File "' + this.file.dest + '" created.');

    // ...and report some size information.
    minlib.info(result.min, result.max);

    // Fail task if any errors were logged.
    if (this.errorCount > 0) { return false; }
  });

};
