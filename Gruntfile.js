/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
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
      compress: {
        files: {
          'tmp/compress.js': ['test/fixtures/src/simple.js']
        },
        options: {
          mangle: false
        }
      },
      compress_mangle: {
        files: {
          'tmp/compress_mangle.js': ['test/fixtures/src/simple.js']
        }
      },
      compress_mangle_banner: {
        files: {
          'tmp/compress_mangle_banner.js': ['test/fixtures/src/simple.js']
        },
        options : {
          banner : '// banner without sourcemap\n'
        }
      },
      no_src: {
        files: {
          'tmp/compress_mangle.js': []
        }
      },
      compress_mangle_except: {
        files: {
          'tmp/compress_mangle_except.js': ['test/fixtures/src/simple.js']
        },
        options: {
          mangle: {
            except: ['argumentC']
          }
        }
      },
      compress_mangle_beautify: {
        files: {
          'tmp/compress_mangle_beautify.js': ['test/fixtures/src/simple.js']
        },
        options: {
          beautify: true
        }
      },
      enclose: {
        files: {
          'tmp/enclose.js': ['test/fixtures/src/simple.js']
        },
        options: {
          beautify: true,
          compress: false,
          enclose: {
            'window.argA': 'paramA',
            'window.argB': 'paramB'
          },
          mangle: false
        }
      },
      multifile: {
        files: {
          'tmp/multifile.js': ['test/fixtures/src/simple.js','test/fixtures/src/comments.js']
        },
        options: {
          mangle: false
        }
      },
      compress_mangle_sourcemap: {
        files: {
          '/dev/null': ['test/fixtures/src/simple.js']
        },
        options: {
          sourceMap: 'tmp/compress_mangle_sourcemap'
        }
      },
      sourcemapin: {
        files: {
          'tmp/sourcemapin.js': ['test/fixtures/src/simple2.js']
        },
        options: {
          mangle: false,
          banner: '// Hello World\n',
          sourceMap: 'tmp/sourcemapin',
          sourceMapIn: 'test/fixtures/src/simple2.map',
          sourceMapRoot: 'http://local.host/js/'
        }
      },
      sourcemapurl: {
        files: {
          'tmp/sourcemapurl.js': ['test/fixtures/src/simple.js']
        },
        options: {
          sourceMappingURL: 'js/sourcemapurl.js.map'
        }
      },
      sourcemaprelative: {
        files: {
          'tmp/sourcemaprelative.js': ['test/fixtures/src/simple.js']
        },
        options: {
          sourceMap: 'tmp/sourcemaprelative',
          sourceMapRelative: true
        }
      },
      comments: {
        src: 'test/fixtures/src/comments.js',
        dest: 'tmp/comments.js',
        options: {
          mangle: false,
          preserveComments: 'some'
        }
      },
      wrap: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/wrap.js',
        options: {
          mangle: false,
          wrap: 'testExport'
        }
      },
      exportAll: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/exportAll.js',
        options: {
          mangle: false,
          wrap: 'testExport',
          exportAll: true
        }
      },
      sourcemap_prefix: {
        files: {
          '/dev/null': ['test/fixtures/src/simple.js']
        },
        options: {
          sourceMap: 'tmp/sourcemap_prefix',
          sourceMapPrefix: 3
        }
      },
      multiple_sourcemaps: {
        files: {
          'tmp/multiple_sourcemaps1.js': ['test/fixtures/src/simple.js'],
          'tmp/multiple_sourcemaps2.js': ['test/fixtures/src/comments.js']
        },
        options: {
          sourceMap: function(dest) {
            return dest.replace(/\.js$/,".map");
          },
          sourceMappingURL: function(dest) {
            return dest.replace(/\.js$/,".mapurl");
          }
        }
      },
      sourcemap_in_generator_single_src: {
        files: [{
          expand: true,
          flatten: true,
          src: ['test/fixtures/expected/multiple_sourcemaps*.js'],
          dest: 'tmp',
          ext: '.min.js'
        }],
        options: {
          sourceMap: function (dest) { return dest.replace(/\.js$/, '') + '.map'; },
          sourceMapIn: function (src) { return src.replace(/\.js$/, '') + '.map'; }
        }
      },
      sourcemap_in_generator_multi_src: {
        src: 'test/fixtures/expected/multiple_sourcemaps*.js',
        dest: 'tmp/multiple_sourcemaps_all.min.js',
        options: {
          sourceMap: function (dest) { return dest.replace(/\.js$/, '') + '.map'; },
          sourceMapIn: function (src) { return src.replace(/\.js$/, '') + '.map'; }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // task that expects its argument (another task) to fail
  grunt.registerTask('expectFail', function(){
    var task = this.args.join(':');

    var done = this.async();

    function onComplete(error, result, code) {
      grunt.log.write("\n > " + result.stdout.split("\n").join("\n > ") + "\n");
      var rv = error ? true : new Error("Task " + task + " unexpectedly passed.");
      done(rv);
    }

    grunt.util.spawn({
      grunt : true,
      args : task
    }, onComplete);
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
  grunt.registerTask('test', [
    'clean',
    'uglify:compress',
    'uglify:compress_mangle',
    'uglify:compress_mangle_banner',
    'uglify:no_src',
    'uglify:compress_mangle_except',
    'uglify:compress_mangle_beautify',
    'uglify:multifile',
    'uglify:compress_mangle_sourcemap',
    'uglify:sourcemapin',
    'uglify:sourcemapurl',
    'uglify:sourcemaprelative',
    'uglify:comments',
    'uglify:wrap',
    'uglify:exportAll',
    'uglify:sourcemap_prefix',
    'uglify:multiple_sourcemaps',
    'uglify:enclose',
    'uglify:sourcemap_in_generator_single_src',
    'expectFail:uglify:sourcemap_in_generator_multi_src', // fail case
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
