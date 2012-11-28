# UglifyJS options

## API Note:

This task delegates most of its options directly to [UglifyJS api](http://lisperator.net/uglifyjs/) as documented below.

## mangle
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior).

## compress
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed as options to `UglifyJS.Compressor()`.

## beautify
Type: `Boolean`, `Object`  
Default: `false`

Turns on beautification of the generated source code. An `Object` will be merged and passed with the options sent to `UglifyJS.OutputStream()`.

## source_map
Type: `String`, `Object`  
Default: `undefined`

Specify the sourcemap location to output or, as an `Object`, specify the options to pass directly to UglifyJS.SourceMap()

## preserveComments
Type: `Boolean`, `String`, `Function`  
Default: `undefined`  
Options: `false`, `'all'`, `'some'`

Turn on preservation of comments.

- `false` will turn off all comments
- `'all'` will preserve all comments in code blocks that have not been squashed or dropped
- `'some'` will preserve all comments that start with a bang (`!`) or include a closure compiler style directive (`@preserve`, `@license`, `@cc_on`)
- `Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return a `true`|`false`

## banner
Type: `String`  
Default: empty string

This string will be prepended to the beginning of the minified output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

[grunt.template.process]: https://github.com/gruntjs/grunt/blob/devel/docs/api_template.md#grunttemplateprocess
