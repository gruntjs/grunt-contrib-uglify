# Options

This task primarily delegates to [UglifyJS](https://github.com/mishoo/UglifyJS2), so please consider their documentation as required reading for advanced configuration.


#### Deprecated options from `2.x`

Option                  | Replacement
----------------------- | -----------
ASCIIOnly               | output.ascii_only
enclose                 | &mdash;
exportAll               | &mdash;
expression              | parse.expression
indentLevel             | output.indent_level
mangleProperties        | mangle.properties
maxLineLen              | output.max\_line_len
preserveComments        | output.comments
quoteStyle              | output.quote_style
screwIE8                | !ie8
sourceMapIncludeSources | sourceMap.includeSources
sourceMapRoot           | sourceMap.root
sourceMapUrl            | sourceMap.url


## mangle
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior). [View all options here](https://github.com/mishoo/UglifyJS2#mangle-options).

## compress
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed as options to `UglifyJS.Compressor()`. [View all options here](https://github.com/mishoo/UglifyJS2#compress-options).

## beautify
Type: `Boolean` `Object`  
Default: `false`

Turns on beautification of the generated source code. [View all options here](https://github.com/mishoo/UglifyJS2#output-options)

#### parse.expression
Type: `Boolean`  
Default: `false`

Parse a single expression, rather than a program (for parsing JSON)

## report
Type: `string`  
Choices: `'min'`, `'gzip'`  
Default: `'min'`

Report minification result or both minification and gzip results.
This is useful to see exactly how well uglify-js is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).

## sourceMap
Type: `Boolean`  
Default: `false`

If `true`, a source map file will be generated in the same directory as the `dest` file. By default it will have the same basename as the `dest` file, but with a `.map` extension.

## sourceMapName
Type: `String` `Function`  
Default: `undefined`

To customize the name or location of the generated source map, pass a string to indicate where to write the source map to. If a function is provided, the uglify destination is passed as the argument and the return value will be used as the file name.

## sourceMapIn
Type: `String` `Function`  
Default: `undefined`

The location of an input source map from an earlier compilation, e.g. from CoffeeScript. If a function is provided, the
uglify source is passed as the argument and the return value will be used as the sourceMap name. This only makes sense
when there's one source file.

## sourceMap.includeSources
Type: `Boolean`  
Default: `false`

Pass this flag if you want to include the content of source files in the source map as sourcesContent property.

#### sourceMap.root
Type: `String`  
Default: `undefined`

With this option you can customize root URL that browser will use when looking for sources.

If the sources are not absolute URLs after prepending of the `sourceMap.root`, the sources are resolved relative to the source map.

## sourceMap.url
Type: `String`  
Default: `undefined`

Override the calculated value for `sourceMappingURL` in the source map. This is useful if the source map location is not relative to the base path of the minified file, i.e. when using a CDN

## wrap
Type: `String`  
Default: `undefined`

Wrap all of the code in a closure, an easy way to make sure nothing is leaking.
For variables that need to be public `exports` and `global` variables are made available.
The value of wrap is the global variable exports will be available as.

## output.ascii_only
Type: `Boolean`  
Default: `false`

Enables to encode non-ASCII characters as \uXXXX.

## output.comments
Type: `Boolean` `String` `Function`  
Default: `undefined`  
Options: `false` `'all'` `'some'`

Turn on preservation of comments.

- `false` will strip all comments
- `'all'` will preserve all comments in code blocks that have not been squashed or dropped
- `'some'` will preserve all comments that include a closure compiler style directive (`@preserve` `@license` `@cc_on`)
- `Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return either `true` or `false`
- `RegExp` `'/[RegExp]/'` will preserve comments matching given RegExp or stringified RegExp

## banner
Type: `String`  
Default: `''`

This string will be prepended to the minified output. Template strings (e.g. `<%= config.value %>`) will be expanded automatically.

## footer
Type: `String`  
Default: `''`

This string will be appended to the minified output. Template strings (e.g. `<%= config.value %>`) will be expanded automatically.

## ie8
Type: `Boolean`  
Default: `false`

Set this to `true` if you still care about full compliance with Internet Explorer 6-8 quirks.

## mangle.properties
Type: `Boolean` `Object`  
Default: `false`

Turn on or off property mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_properties()` (mimicking command line behavior). [View all options here](https://github.com/mishoo/UglifyJS2#mangle-options).

## reserveDOMProperties
Type: `Boolean`  
Default: `false`

Use this flag in conjunction with `mangle.properties` to prevent built-in browser object properties from being mangled.

## exceptionsFiles
Type: `Array`  
Default: `[]`

Use this with `mangle.properties` to pass one or more JSON files containing a list of variables and object properties
that should not be mangled. See the [UglifyJS docs](https://www.npmjs.com/package/uglify-js) for more info on the file syntax.

## nameCache
Type: `String`  
Default: `''`

A string that is a path to a JSON cache file that uglify will create and use to coordinate symbol mangling between
multiple runs of uglify. Note: this generated file uses the same JSON format as the `exceptionsFiles` files.

## output.quote_style
Type: `Integer`  
Default: `0`

Preserve or enforce quotation mark style.

* `0` will use single or double quotes such as to minimize the number of bytes (prefers double quotes when both will do)
* `1` will always use single quotes
* `2` will always use double quotes
* `3` will preserve original quotation marks
