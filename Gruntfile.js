/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    uglify: {
      compressed: {
        files: {
          'tmp/lodash-c.js': ['test/fixtures/lodash.js']
        },
        options : {
          compress : {},
          mangle : false
        }
      },
      compressed_mangled_sourcemap: {
        files: {
          '/dev/null': ['test/fixtures/lodash.js']
        },
        options : {
          source_map : 'tmp/lodash-c-m-oDEVNULL--source-map.js'
        }
      },
      compressed_mangled_DEFAULT: {
        files: {
          'tmp/lodash-c-m.js': ['test/fixtures/lodash.js']
        }
      },
      compressed_mangled_reserved: {
        files: {
          'tmp/lodash-c-m-rarrayRef.js': ['test/fixtures/lodash.js']
        },
        options : {
          compress : {},
          mangle : {
            except : ['arrayRef']
          }
        }
      },
      compressed_mangled_beautified: {
        files: {
          'tmp/lodash-c-m-b.js': ['test/fixtures/lodash.js']
        },
        options : {
          compress : {},
          mangle : {},
          beautify : {}
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'uglify', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
