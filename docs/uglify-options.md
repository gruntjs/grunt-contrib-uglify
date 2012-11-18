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
Type: `string`  
Default: `undefined`

Specify the sourcemap location to output.

## banner
Type: `string`
Default: `undefined`

Specify a banner to prepend to the output source, e.g. license comments.
