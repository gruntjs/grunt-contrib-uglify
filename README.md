# grunt-contrib-uglify [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-uglify.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-uglify)

> Minify files with UglifyJS.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-uglify --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Uglify task
_Run this task with the `grunt uglify` command._

#### Overview

This task is a [multi task](types_of_tasks.md), meaning that grunt will automatically iterate over all `uglify` targets if a target is not specified.

grunt-contrib-uglify primarily delegates to [UglifyJS2](https://github.com/mishoo/UglifyJS2), so please consider the [UglifyJS documentation](http://lisperator.net/uglifyjs/) as required reading for advanced configuration.
### UglifyJS options

#### API Note:

When in doubt, the options mimic the [UglifyJS2 api](http://lisperator.net/uglifyjs/) *except* where the command line API is found to be simpler (e.g. reusing options passed to `mangle_names` and `compute_char_frequency`.

#### mangle
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior).

#### compress
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed directly to `UglifyJS2.Compressor()`.

#### beautify
Type: `Boolean`, `Object`  
Default: `false`

Turns on beautification of the generated source code. Any extra options passed are merged with the options sent to `UglifyJS2.OutputStream()`.

#### source_map
Type: `String`, `Object`  
Default: `undefined`

Specify the sourcemap location to output or, as an `Object`, specify the options to pass directly to UglifyJS.SourceMap()

#### preserveComments
Type: `Boolean`, `String`, `Function`
Default: `undefined`
Options: `false`, `true` | `'all'`, `'some'`

Turn on preservation of comments.

-`false` will turn off all comments
-`'all'` will preserve all comments in code blocks that have not been squashed or dropped
-`'some'` will preserve all comments that start with a bang (`!`) or a closure compiler style directive (`@preserve`, `@license`, `@cc_on`)
-`Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return a `true`|`false`

#### banner
Type: `String`  
Default: empty string

This string will be prepended to the beginning of the minified output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

[grunt.template.process]: https://github.com/gruntjs/grunt/blob/devel/docs/api_template.md#grunttemplateprocess

### Usage examples

##### Options
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

##### Basic compression
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

##### No mangling
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

##### Source maps

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

##### Beautify

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

##### Banner comments

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


## Release History

_(Nothing yet)_


---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com)

*This file was generated on Tue Nov 27 2012 16:20:31.*
