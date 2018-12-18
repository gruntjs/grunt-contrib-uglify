# Usage examples

## Basic compression

This configuration will compress and mangle the input files using the default options.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'dest/output.min.js': ['src/input1.js', 'src/input2.js']
      }
    }
  }
});
```

## No mangling

Specify `mangle: false` to prevent changes to your variable and function names.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Reserved identifiers

You can specify identifiers to leave untouched with an `reserved` array in the `mangle` options.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: {
        reserved: ['jQuery', 'Backbone']
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Source maps

Generate a source map by setting the `sourceMap` option to `true`. The generated
source map will be in the same directory as the destination file. Its name will be
the basename of the destination file with a `.map` extension. Override these
defaults with the `sourceMapName` attribute.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        sourceMap: true,
        sourceMapName: 'path/to/sourcemap.map'
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Advanced source maps

Set the `sourceMap.includeSources` option to `true` to embed your sources directly into the map. To include
a source map from a previous compilation pass it as the value of the `sourceMapIn` option.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        sourceMap: {
          includeSources: true
        },
        sourceMapIn: 'example/coffeescript-sourcemap.js', // input sourcemap from a previous compilation
      },
      files: {
        'dest/output.min.js': ['src/input.js'],
      },
    },
  },
});
```

Refer to the [UglifyJS SourceMap Documentation](https://github.com/mishoo/UglifyJS2#source-map-options) for more information.

## Turn off console warnings

Specify `drop_console: true` as part of the `compress` options to discard calls to `console.*` functions.
This will suppress warning messages in the console.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      compress: {
        drop_console: true
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Beautify

Specify `beautify: true` to beautify your code for debugging/troubleshooting purposes.
Pass an object to manually configure any other output options.

See [UglifyJS documentation](https://github.com/mishoo/UglifyJS2#output-options) for more information.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        beautify: true
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    },
    my_advanced_target: {
      options: {
        beautify: {
          width: 80
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Banner comments

In this example, running `grunt uglify:my_target` will prepend a banner created by interpolating the `banner` template string with the config object. Here, those properties are the values imported from the `package.json` file (which are available via the `pkg` config property) plus today's date.

_Note: you don't have to use an external JSON file. It's also valid to create the `pkg` object inline in the config. That being said, if you already have a JSON file, you might as well reference it._

```js
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Conditional compilation

You can also enable UglifyJS conditional compilation. This is commonly used to remove debug code blocks for production builds. This is equivalent to the command line `--define` option.

See [UglifyJS global definitions documentation](https://github.com/mishoo/UglifyJS2#conditional-compilation) for more information.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      compress: {
        global_defs: {
          'DEBUG': false
        },
        dead_code: true
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Compiling all files in a folder dynamically

This configuration will compress and mangle the files dynamically.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      files: [{
        expand: true,
        cwd: 'src/js',
        src: '**/*.js',
        dest: 'dest/js'
      }]
    }
  }
});
```

## Compiling all files separately on the each their path

This configuration will compress and mangle all js files separately in each folder.

Also exclude jQuery for mangling and ignore all `*.min.js` files.

```js
// Project configuration.
uglify: {
  dev: {
    options: {
      mangle: {
        reserved: ['jQuery']
      }
    },
    files: [{
      expand: true,
      src: ['dist/assets/js/*.js', '!dist/assets/js/*.min.js'],
      dest: 'dist/assets',
      cwd: '.',
      rename: function (dst, src) {
        // To keep the source js files and make new files as `*.min.js`:
        // return dst + '/' + src.replace('.js', '.min.js');
        // Or to override to src:
        return src;
      }
    }]
  }
},
```

## Turn on object property name mangling

This configuration will turn on object property name mangling, but not mangle built-in browser object properties.
Additionally, variables and object properties listed in the `myExceptionsFile.json` will be mangled. For more info,
on the format of the exception file format please see the [UglifyJS docs](https://www.npmjs.com/package/uglify-js).

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: {
        properties: true
      },
      reserveDOMCache: true,
      exceptionsFiles: [ 'myExceptionsFile.json' ]
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

## Turn on use of name mangling cache

Turn on use of name mangling cache to coordinate mangled symbols between outputted uglify files. uglify will the
generate a JSON cache file with the name provided in the options. Note: this generated file uses the same JSON format
as the `exceptionsFiles` files.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      nameCache: '.tmp/grunt-uglify-cache.json',
    },
    my_target: {
      files: {
        'dest/output1.min.js': ['src/input1.js'],
        'dest/output2.min.js': ['src/input2.js']
      }
    }
  }
});
```
