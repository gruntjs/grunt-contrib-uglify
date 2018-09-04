/*
 * grunt-contrib-uglify
 * https://gruntjs.com/
 *
 * Copyright (c) 2016 "Cowboy" Ben Alman, contributors
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
      compress_explicit: {
        files: {
          'tmp/compress_explicit.js': ['test/fixtures/src/simple.js']
        },
        options: {
          compress: true
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
        options: {
          banner: '// banner without sourcemap\n'
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
            reserved: ['argumentC']
          }
        }
      },
      compress_mangle_beautify: {
        files: {
          'tmp/compress_mangle_beautify.js': ['test/fixtures/src/simple.js']
        },
        options: {
          beautify: true,
          footer: '\n// This is a footer.'
        }
      },
      multifile: {
        files: {
          'tmp/multifile.js': ['test/fixtures/src/simple.js', 'test/fixtures/src/comments.js']
        },
        options: {
          mangle: false
        }
      },
      comments: {
        src: 'test/fixtures/src/comments.js',
        dest: 'tmp/comments.js',
        options: {
          mangle: false,
          output: {
            comments: 'some'
          }
        }
      },
      commentsWithImportant: {
        src: 'test/fixtures/src/comments.js',
        dest: 'tmp/commentsWithImportant.js',
        options: {
          mangle: false,
          output: {
            comments: /^!|@preserve|@license|@cc_on/i
          }
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
      maxLineLen: {
        src: 'test/fixtures/src/simple2.js',
        dest: 'tmp/maxLineLen.js',
        options: {
          mangle: false,
          output: {
            max_line_len: 100
          }
        }
      },
      ASCIIOnly: {
        src: 'test/fixtures/src/localization.js',
        dest: 'tmp/asciionly.js',
        options: {
          mangle: false,
          output: {
            ascii_only: true
          }
        }
      },
      screwIE8: {
        src: 'test/fixtures/src/screwIE8.js',
        dest: 'tmp/screwIE8.js',
        options: {
          ie8: true
        }
      },
      sourcemap_basic: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/sourcemap_basic.js',
        options: {
          sourceMap: true
        }
      },
      sourcemap_customName: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/sourcemap_customName.js',
        options: {
          sourceMap: true,
          sourceMapName: 'tmp/source_map_custom_name'
        }
      },
      sourcemap_customDir: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/sourcemap_customDir.js',
        options: {
          sourceMap: true,
          sourceMapName: 'tmp/deep/directory/location/source_map.js.map'
        }
      },
      sourcemap_customRoot: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/sourcemap_customRoot.js',
        options: {
          sourceMap: {
            root: 'https://github.com/RReverser/grunt-contrib-uglify/tree/master/tmp'
          }
        }
      },
      sourcemap_customUrl: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/sourcemap_customUrl.js',
        options: {
          sourceMap: {
            url: 'https://www.test.com/test/sourcemap_customUrl.js.map'
          }
        }
      },
      sourcemap_functionName: {
        src: 'test/fixtures/src/simple.js',
        dest: 'tmp/sourcemap_functionName.js',
        options: {
          sourceMap: true,
          sourceMapName: function(dest) {
            return dest + '.fn.map';
          }
        }
      },
      sourcemap_multiple: {
        files: {
          'tmp/sourcemaps_multiple1.js': ['test/fixtures/src/simple.js'],
          'tmp/sourcemaps_multiple2.js': ['test/fixtures/src/comments.js']
        },
        options: {
          sourceMap: true
        }
      },
      sourcemap_multipleFunctionNames: {
        files: {
          'tmp/sourcemaps_multiple1_fnName.js': ['test/fixtures/src/simple.js'],
          'tmp/sourcemaps_multiple2_fnName.js': ['test/fixtures/src/comments.js']
        },
        options: {
          sourceMap: true,
          sourceMapName: function(dest) {
            return dest + '.fn.map';
          }
        }
      },
      sourcemapin: {
        files: {
          'tmp/sourcemapin.js': ['test/fixtures/src/simple2.js']
        },
        options: {
          mangle: false,
          banner: '// Hello World\n',
          sourceMap: {
            includeSources: false
          },
          sourceMapIn: function() {
            return 'test/fixtures/src/simple2.map';
          }
        }
      },
      sourcemap_sources: {
        files: {
          'tmp/sourcemap_sources.js': ['test/fixtures/src/simple.js']
        },
        options: {
          sourceMap: {
            includeSources: true
          }
        }
      },
      sourcemapin_sources: {
        files: {
          'tmp/sourcemapin_sources.js': ['test/fixtures/src/simple2.js']
        },
        options: {
          sourceMap: {
            includeSources: true
          },
          sourceMapIn: function() {
            return 'test/fixtures/src/simple2.map';
          }
        }
      },
      sourcemapin_customUrl: {
        files: {
          'tmp/sourcemapin_customUrl.js': ['test/fixtures/src/simple2.js']
        },
        options: {
          sourceMap: {
            includeSources: true,
            url: 'sourcemapin_customUrl.js.map'
          },
          sourceMapIn: function() {
            return 'test/fixtures/src/simple2.map';
          }
        }
      },
      expression_json: {
        files: {
          'tmp/expression.json': ['test/fixtures/src/simple.json']
        },
        options: {
          parse: {
            expression: true
          },
          mangle: false,
          compress: false
        }
      },
      expression_js: {
        files: {
          'tmp/expression.js': ['test/fixtures/src/expression.js']
        },
        options: {
          parse: {
            expression: true
          },
          mangle: false,
          compress: false
        }
      },
      mangleprops: {
        files: {
          'tmp/mangleprops.js': ['test/fixtures/src/mangleprops.js']
        },
        options: {
          mangle: {
            properties: true
          }
        }
      },
      mangleprops_withExcept: {
        files: {
          'tmp/mangleprops_withExcept.js': ['test/fixtures/src/mangleprops.js']
        },
        options: {
          mangle: {
            reserved: ['dontMangleMeVariable'],
            properties: true
          }
        }
      },
      mangleprops_withExceptionsFiles: {
        files: {
          'tmp/mangleprops_withExceptionsFiles.js': ['test/fixtures/src/mangleprops.js']
        },
        options: {
          mangle: {
            toplevel: true,
            properties: true
          },
          exceptionsFiles: ['test/fixtures/src/exceptionsfile1.json', 'test/fixtures/src/exceptionsfile2.json']
        }
      },
      mangleprops_withExceptAndExceptionsFiles: {
        files: {
          'tmp/mangleprops_withExceptAndExceptionsFiles.js': ['test/fixtures/src/mangleprops.js']
        },
        options: {
          mangle: {
            toplevel: true,
            reserved: ['dontMangleMeVariable'],
            properties: true
          },
          exceptionsFiles: ['test/fixtures/src/exceptionsfile1.json', 'test/fixtures/src/exceptionsfile2.json']
        }
      },
      mangleprops_withNameCacheFile: {
        files: {
          'tmp/mangleprops_withNameCacheFile1.js': ['test/fixtures/src/mangleprops.js'],
          'tmp/mangleprops_withNameCacheFile2.js': ['test/fixtures/src/mangleprops_withNameCache.js']
        },
        options: {
          mangle: {
            toplevel: true,
            properties: true
          },
          nameCache: 'tmp/uglify_name_cache.json'
        }
      },
      mangleprops_withRegex: {
        files: {
          'tmp/mangleprops_withRegex.js': ['test/fixtures/src/mangleprops_withRegex.js']
        },
        options: {
          mangle: {
            properties: {
              regex: /^[^#].*/
            }
          }
        }
      },
      quotes_single: {
        files: {
          'tmp/quotes_single.js': ['test/fixtures/src/quotes.js']
        },
        options: {
          output: {
            quote_style: 1
          }
        }
      },
      quotes_double: {
        files: {
          'tmp/quotes_double.js': ['test/fixtures/src/quotes.js']
        },
        options: {
          output: {
            quote_style: 2
          }
        }
      },
      quotes_original: {
        files: {
          'tmp/quotes_original.js': ['test/fixtures/src/quotes.js']
        },
        options: {
          output: {
            quote_style: 3
          }
        }
      },
      mangle_isNotObject: {
        files: {
          'tmp/mangle.js': ['test/fixtures/src/simple.js']
        },
        mangle: true
      },
      beautify_Object: {
        files: {
          'tmp/beautify.js': ['test/fixtures/src/simple.js']
        },
        options: {
          beautify: {
            ascii_only: true,
            indent_start: 2,
            max_line_len: 55
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // task that expects its argument (another task) to fail
  grunt.registerTask('expectFail', function() {
    var task = this.args.join(':');

    var done = this.async();

    function onComplete(error, result) {
      grunt.log.write('\n > ' + result.stdout.split('\n').join('\n > ') + '\n');
      var rv = error ? true : new Error('Task ' + task + ' unexpectedly passed.');
      done(rv);
    }

    grunt.util.spawn({
      grunt: true,
      args: task
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
    'jshint',
    'clean',
    'uglify',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};
