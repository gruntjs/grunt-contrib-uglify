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

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


### Options

This task primarily delegates to [UglifyJS2][], so please consider the [UglifyJS documentation][] as required reading for advanced configuration.

[UglifyJS2]: https://github.com/mishoo/UglifyJS2
[UglifyJS documentation]: http://lisperator.net/uglifyjs/

#### mangle
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior).

#### compress
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed as options to `UglifyJS.Compressor()`.

#### beautify
Type: `Boolean` `Object`  
Default: `false`

Turns on beautification of the generated source code. An `Object` will be merged and passed with the options sent to `UglifyJS.OutputStream()`.

#### sourceMap
Type: `String`  
Default: `undefined`

Specify the location to output the source map.

#### sourceMapRoot
Type: `String`  
Default: `undefined`

The location where your source files can be found.

#### sourceMapIn
Type: `String`  
Default: `undefined`

The location of an input source map from an earlier compilation, e.g. from CoffeeScript.

#### sourceMappingURL
Type: `String`  
Default: `undefined`

The location of your sourcemap. Defaults to the location you use for sourceMap, override if you need finer control

#### sourceMapPrefix
Type: `Number`  
Default: `undefined`

The number of directories to drop from the path prefix when declaring files in the source map.

#### preserveComments
Type: `Boolean` `String` `Function`  
Default: `undefined`  
Options: `false` `'all'` `'some'`

Turn on preservation of comments.

- `false` will strip all comments
- `'all'` will preserve all comments in code blocks that have not been squashed or dropped
- `'some'` will preserve all comments that start with a bang (`!`) or include a closure compiler style directive (`@preserve` `@license` `@cc_on`)
- `Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return either `true` or `false`

#### banner
Type: `String`  
Default: empty string

This string will be prepended to the beginning of the minified output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

[grunt.template.process]: https://github.com/gruntjs/grunt/blob/devel/docs/api_template.md#grunttemplateprocess

#### wrap
Type: `String`
Default: `undefined`
Wrap all of the code in a closure, an easy way to make sure nothing is leaking.
For variables that need to be public `exports` and `global` variables are made available.
The value of wrap is the global variable exports will be available as.

#### exportAll
Type: `Boolean`
Default: `false`
When using `wrap` this will make all global functions and variables available via the export variable.

### Usage examples

#### Basic compression

In this example, running `grunt uglify:my_target` (or `grunt uglify` because `uglify` is a [multi task][]) will mangle and compress the input files using the default options.

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

#### No mangling

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

#### Reserved identifiers

You can specify identifiers to leave untouched with an `except` array in the `mangle` options.

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
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### Source maps

Configure basic source map output by specifying a file path for the `sourceMap` option.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        sourceMap: 'path/to/source-map.js'
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### Advanced source maps

You can specify the parameters to pass to `UglifyJS.SourceMap()` which will
allow you to configure advanced settings.

Refer to the [UglifyJS SourceMap Documentation](http://lisperator.net/uglifyjs/codegen#source-map) for more information.

```js
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        sourceMap: 'path/to/source-map.js',
        sourceMapRoot: 'http://example.com/path/to/src/', // the location to find your original source
        sourceMapIn: 'example/coffeescript-sourcemap.js', // input sourcemap from a previous compilation
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```


#### Beautify

Specify `beautify: true` to beautify your code for debugging/troubleshooting purposes.
Pass an object to manually configure any other output options passed directly to `UglifyJS.OutputStream()`.

See [UglifyJS Codegen documentation](http://lisperator.net/uglifyjs/codegen) for more information.

_Note that manual configuration will require you to explicitly set `beautify: true` if you want traditional, beautified output._

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
          width: 80,
          beautify: true
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### Banner comments

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

## Release History

 * 2012-11-27   v0.1.0   Work in progress, not yet officially released.

---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com)

*This file was generated on Sun Dec 30 2012 17:37:36.*
