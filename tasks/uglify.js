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
      uglify: {}
    });

    // Process banner.
    var banner = grunt.template.process(options.banner);

    // Iterate over all specified file groups.
    this.files.forEach(function(fileObj) {
      // The source file to be minified.
      var srcpath = fileObj.src[0];
      var files = grunt.file.expandFiles(srcpath);
      // Abort if source didn't match any files.
      if (files.length === 0) {
        grunt.log.error('Source file "' + srcpath + '" not found.');
        return;
      }

      var src = files[0];

      // Get source of specified file.
      var result = uglify.minify(src, fileObj.dest, options);

      // Concat banner + minified source.
      var output = banner + result.min;

      // Write the destination file.
      grunt.file.write(fileObj.dest, output);

      // Write sourcemap
      if (options.source_map) {
        grunt.file.write(options.source_map, result.source_map);
      }

      // Print a success message.
      grunt.log.writeln('File "' + fileObj.dest + '" created.');

      // ...and report some size information.
      minlib.info(result.min, result.max);
    }, this);

    // Fail task if any errors were logged.
    if (this.errorCount > 0) { return false; }
  });

};
