# Usage examples

### All tasks are specified in an `uglify` block

        uglify: {

### This is a multitask and options specified at the root level will be merged with each task

          options: {
            mangle : {
              except : ['jQuery', 'Backbone']
            }
          },

### Just use default options to compress your source

          default: {
            files: {
              'source.min.js': ['source.js']
            }
          },

### Compress your source only, no mangling

          no_mangle: {
            files: {
              'source.min.js': ['source.js']
            },
            options : {
              mangle : false
            }
          },

### Compress, mangle, and output source map

          sourcemap: {
            files: {
              'source.min.js': ['source.js']
            },
            options : {
              source_map : 'sourcemap.js'
            }
          },

### Beautify your compressed and mangled source

          beautified: {
            files: {
              'source.min.js': ['source.js']
            },
            options : {
              beautify : {
                max_line_len : 120
              }
            }
          }

### Banner comments

          banner: {
            files: {
              'source.min.js': ['source.js']
            },
            options : {
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                      ' *  <%= grunt.template.today("yyyy-mm-dd") %> */'
            }
          }
