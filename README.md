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
Type: `string`, `Object`
Default: `undefined`

Specify the sourcemap location to output or, as an `Object`, specify the options to pass directly to UglifyJS.SourceMap()

#### preserveComments
Type: `Boolean`, `string`, `Function`
Default: `undefined`
Options: `false`, `true` | `'all'`, `'some'`

Turn on preservation of comments.

-`false` will turn off all comments
-`'all'` will preserve all comments in code blocks that have not been squashed or dropped
-`'some'` will preserve all comments that start with a bang (`!`) or a closure compiler style directive (`@preserve`, `@license`, `@cc_on`)
-`Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return a `true`|`false`

#### banner
Type: `string`
Default: `undefined`

Specify a banner to prepend to the output source, e.g. license comments.

### Usage examples

##### All tasks are specified in an `uglify` block

```js
uglify: {
```

##### This is a multitask and options specified at the root level will be merged with each task

```js
  options: {
    mangle : {
      except : ['jQuery', 'Backbone']
    }
  }
```

##### Just use default options to compress your source

```js
  default: {
    files: {
      'source.min.js': ['source.js']
    }
  }
```

##### Compress your source only, no mangling

```js
  no_mangle: {
    files: {
      'source.min.js': ['source.js']
    },
    options : {
      mangle : false
    }
  }
```

##### Compress, mangle, and output source map

```js
  sourcemap: {
    files: {
      'source.min.js': ['source.js']
    },
    options : {
      source_map : 'sourcemap.js'
    }
  }
```

##### Beautify your compressed and mangled source

```js
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
```

##### Banner comments

```js
  banner: {
    files: {
      'source.min.js': ['source.js']
    },
    options : {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              ' *  <%= grunt.template.today("yyyy-mm-dd") %> */'
    }
  }
```


## Release History

_(Nothing yet)_


---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com)

*This file was generated on Sun Nov 25 2012 10:54:24.*
