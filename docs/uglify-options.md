# UglifyJS options

## API Note:

When in doubt, the options mimic the [UglifyJS2 api](http://lisperator.net/uglifyjs/) *except* where the command line API is found to be simpler (e.g. reusing options passed to `mangle_names` and `compute_char_frequency`.

## mangle
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior).

## compress
Type: `Boolean`, `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed directly to `UglifyJS2.Compressor()`.

## beautify
Type: `Boolean`, `Object`  
Default: `false`

Turns on beautification of the generated source code. Any extra options passed are merged with the options sent to `UglifyJS2.OutputStream()`.

## source_map
Type: `string`, `Object`
Default: `undefined`

Specify the sourcemap location to output or, as an `Object`, specify the options to pass directly to UglifyJS.SourceMap()

## preserveComments
Type: `Boolean`, `string`, `Function`
Default: `undefined`
Options: `false`, `true` | `'all'`, `'some'`

Turn on preservation of comments.

-`false` will turn off all comments
-`'all'` will preserve all comments in code blocks that have not been squashed or dropped
-`'some'` will preserve all comments that start with a bang (`!`) or a closure compiler style directive (`@preserve`, `@license`, `@cc_on`)
-`Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return a `true`|`false`

## banner
Type: `string`
Default: `undefined`

Specify a banner to prepend to the output source, e.g. license comments.
