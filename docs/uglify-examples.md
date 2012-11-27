# Usage examples

### Options
Like other multi tasks, per-target options will override options specified at the root level.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: {
        except: ['jQuery', 'Backbone']
      }
    },
    my_target: {
      options: {
        // override here
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

### Basic compression
You can use the default options to compress your source.

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
Compress your source only, without mangling it.

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

### Source maps

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

### Beautify

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        beautify: {
          max_line_len: 120
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
