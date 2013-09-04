/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var contrib = require('grunt-lib-contrib').init(grunt);
  var uglify = require('./lib/uglify').init(grunt);

  grunt.registerMultiTask('uglify', 'Minify files with UglifyJS.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      banner: '',
      footer: '',
      compress: {
        warnings: false
      },
      mangle: {},
      beautify: false,
      report: false
    });

    // Process banner.
    var banner = grunt.template.process(options.banner);
    var footer = grunt.template.process(options.footer);
    var mapNameGenerator, mappingURLGenerator;

    var tally = {
      js: 0,
      sourceMaps: 0
    };

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file ' + filepath.cyan + ' not found.');
          return false;
        } else {
          return true;
        }
      });

      if (src.length === 0) {
        grunt.log.warn('Destination (' + f.dest.cyan + ') not written because src files were empty.');
        return;
      }

      // function to get the name of the sourceMap
      if (typeof options.sourceMap === "function") {
        mapNameGenerator = options.sourceMap;
      }

      // function to get the sourceMappingURL
      if (typeof options.sourceMappingURL === "function") {
        mappingURLGenerator = options.sourceMappingURL;
      }

      if (mapNameGenerator) {
        try {
          options.sourceMap = mapNameGenerator(f.dest);
        } catch (e) {
          var err = new Error('SourceMapName failed.');
          err.origError = e;
          grunt.fail.warn(err);
        }
      }

      if (mappingURLGenerator) {
        try {
          options.sourceMappingURL = mappingURLGenerator(f.dest);
        } catch (e) {
          var err = new Error('SourceMapName failed.');
          err.origError = e;
          grunt.fail.warn(err);
        }
      }

      // Minify files, warn and fail on error.
      var result;
      try {
        result = uglify.minify(src, f.dest, options);
      } catch (e) {
        var err = new Error('Uglification failed.');
        if (e.msg) {
          err.message += ', ' + e.msg + '.';
        }
        err.origError = e;
        grunt.log.warn('Uglifying source ' + src.cyan + ' failed.');
        grunt.fail.warn(err);
      }

      // Concat banner + minified source.
      var output = banner + result.min + footer;

      // Write the destination file.
      grunt.file.write(f.dest, output);

      // Write source map
      if (options.sourceMap) {
        grunt.file.write(options.sourceMap, result.sourceMap);
        grunt.verbose.writeln('Source map ' + options.sourceMap.cyan + ' created.');
        tally.sourceMaps++;
      }

      // Print a success message.
      grunt.verbose.writeln('File ' + f.dest.cyan + ' created.');
      tally.js++;

      // ...and report some size information.
      if (options.report) {
        contrib.minMaxInfo(output, result.max, options.report);
      }
    });

    if (tally.js) {
      grunt.log.write('Created ' + tally.js.toString().cyan + ' JS files');
    }

    if (tally.sourceMaps) {
      grunt.log.write((tally.js ? ' and ' : 'Created ') + tally.sourceMaps.toString().cyan + ' source map files');
    }

    grunt.log.writeln();

  });

};
