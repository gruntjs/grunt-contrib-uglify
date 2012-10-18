### Specifying UglifyJS options

In this example, custom UglifyJS `mangle`, `squeeze` and `codegen` options are specified. The listed methods and their expected options are explained in the API section of the [UglifyJS documentation][uglify]:

* The `mangle` object is passed into the `pro.ast_mangle` method.
* The `squeeze` object is passed into the `pro.ast_squeeze` method.
* The `codegen` object is passed into the `pro.gen_code` method.

```javascript
// Project configuration.
grunt.initConfig({
  min: {
    dist: {
      src: ['dist/built.js'],
      dest: 'dist/built.min.js'
    }
  },
  uglify: {
    mangle: {toplevel: true},
    squeeze: {dead_code: false},
    codegen: {quote_keys: true}
  }
});
```

See the [min task source](../tasks/min.js) for more information.