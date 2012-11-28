# grunt-contrib-uglify [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-uglify.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-uglify)

> Minify files with UglifyJS.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-contrib-uglify --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-uglify');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The uglify task

#### Overview

This task is a [multi task](types_of_tasks.md), meaning that grunt will automatically iterate over all `uglify` targets if a target is not specified.

grunt-contrib-uglify primarily delegates to [UglifyJS2](https://github.com/mishoo/UglifyJS2), so please consider the [UglifyJS documentation](http://lisperator.net/uglifyjs/) as required reading for advanced configuration.
### UglifyJS options

#### API Note:

This task delegates most of its options directly to [UglifyJS api](http://lisperator.net/uglifyjs/) as documented below.

#### mangle
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior).

#### compress
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed as options to `UglifyJS.Compressor()`.

#### beautify
Type: `Boolean`, `Object`  
Default: `false`

Turns on beautification of the generated source code. An `Object` will be merged and passed with the options sent to `UglifyJS.OutputStream()`.

#### source_map
Type: `String`, `Object`  
Default: `undefined`

Specify the sourcemap location to output or, as an `Object`, specify the options to pass directly to UglifyJS.SourceMap()

#### preserveComments
Type: `Boolean`, `String`, `Function`  
Default: `undefined`  
Options: `false`, `'all'`, `'some'`

Turn on preservation of comments.

- `false` will turn off all comments
- `'all'` will preserve all comments in code blocks that have not been squashed or dropped
- `'some'` will preserve all comments that start with a bang (`!`) or include a closure compiler style directive (`@preserve`, `@license`, `@cc_on`)
- `Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return a `true`|`false`

#### banner
Type: `String`  
Default: empty string

This string will be prepended to the beginning of the minified output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

[grunt.template.process]: https://github.com/gruntjs/grunt/blob/devel/docs/api_template.md#grunttemplateprocess

### Usage examples

##### Options
Like other multi tasks, per-target options will override options specified at the root level.

##### Basic compression

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

##### No mangling

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

##### Reserved identifiers

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

##### Source maps

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

##### Advanced source maps

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


##### Beautify

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


--
Task submitted by <a href="http://benalman.com">"Cowboy" Ben Alman</a>.

*Generated on Tue Nov 27 2012 23:32:19.*
