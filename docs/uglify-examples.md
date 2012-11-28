# Usage examples

### Options
Like other multi tasks, per-target options will override options specified at the root level.

### Basic compression

Don't specify any options to mangle and compress your source with a default configuration.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

### No mangling

Specify `mangle : false` to prevent changes to your variable and function names.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        mangle: false
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

### Reserved identifiers

You can specify identifiers to leave untouched with an `except` array in the `mangle` options.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        mangle: {
          except: ['jQuery', 'Backbone']
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

### Source maps

Configure basic source map output by specifying a string value for the `source_map` option.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        source_map: 'path/to/source-map.js'
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

### Advanced source maps

You can specify the parameters to pass to `UglifyJS.SourceMap()` which will
allow you to configure advanced settings.

Refer to the [UglifyJS SourceMap Documentation](http://lisperator.net/uglifyjs/codegen#source-map) for more information.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        source_map: {
          file: 'path/to/source-map.js',             // your sourcemap output
          root: 'http://example.com/path/to/src/',   // the location of your original's source
          orig: 'example/coffeescript-sourcemap.js', // input sourcemap from a different compilation
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```


### Beautify

Specify `beautify : true` to beautify your code for debugging/troubleshooting purposes.
Pass an object to manually configure any other output options passed directly to `UglifyJS.OutputStream()`.

See [UglifyJS Codegen documentation](http://lisperator.net/uglifyjs/codegen) for more information.

*note*: manual configuration will require you to explicitly set `beautify : true` if you want traditional, beautified output.

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
          width         : 80,
          beautify      : true
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

### Banner comments

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    banner: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                ' *  <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```
