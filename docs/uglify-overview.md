Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

# Migrating from 2.x to 3.x

Version `3.x` introduced changes to configuring source maps. Accordingly, if you don't use the source map options you should be able to upgrade seamlessly. If you do use source maps, see below.

## Removed options

`sourceMapRoot` - The location of your sources is now calculated for you when `sourceMap` is set to `true`  
`sourceMapPrefix` - No longer necessary for the above reason  
`sourceMappingURL` - Once again, this is calculated automatically

## Changed options

`sourceMap` - Only accepts a `Boolean` value. Generates a map with a default name for you  

## New options

`sourceMapName` - Accepts a string or function to change the location or name of your map
`sourceMapIncludeSources` - Embed the content of your source files directly into the map
`expression` - Accepts a `Boolean` value. Parse a single expression (JSON or single functions)
