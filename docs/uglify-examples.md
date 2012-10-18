## Usage examples

### Minifying individual files

In this example, running `grunt min:dist` (or `grunt min` because `min` is a [multi task](types_of_tasks.md)) will minify the specified source file, writing the output to `dist/built.min.js`.

_Note that UglifyJS strips all comments from the source, including banner comments. See the "Banner comments" example for instructions on how to add a banner to the generated source._

```javascript
// Project configuration.
grunt.initConfig({
  min: {
    dist: {
      src: ['dist/built.js'],
      dest: 'dist/built.min.js'
    }
  }
});
```

### Minifying while concatenating files

In this example, running `grunt min:dist` (or `grunt min` because `min` is a [multi task](types_of_tasks.md)) will first concatenate the three specified source files, in order, minifying the result and writing the output to `dist/built.min.js`.

_Note that UglifyJS strips all comments from the source, including banner comments. See the "Banner comments" example for instructions on how to add a banner to the generated source._

```javascript
// Project configuration.
grunt.initConfig({
  min: {
    dist: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.min.js'
    }
  }
});
```

With a slight modification, running `grunt min` will join the specified source files using `;` instead of the default newline character before minification.

```javascript
// Project configuration.
grunt.initConfig({
  min: {
    dist: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.min.js',
      separator: ';'
    }
  }
});
```

### Minifying and concatenating separately

Often, it's desirable to create both unminified and minified distribution files. In these cases, the [concat task](task_concat.md) should be run first, followed by the `min` task.

In this example, running `grunt concat:dist min:dist` (or `grunt concat min` because both `concat` and `min` are [multi tasks](types_of_tasks.md)) will first concatenate the three specified source files, in order, writing the output to `dist/built.js`. After that, grunt will minify the newly-created file, writing the output to `dist/built.min.js`.

_Note that UglifyJS strips all comments from the source, including banner comments. See the "Banner comments" example for instructions on how to add a banner to the generated source._

```javascript
// Project configuration.
grunt.initConfig({
  concat: {
    dist: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.js'
    }
  },
  min: {
    dist: {
      src: ['dist/built.js'],
      dest: 'dist/built.min.js'
    }
  }
});
```

### Banner comments

In this example, running `grunt min:dist` (or `grunt min` because `min` is a [multi task](types_of_tasks.md)) will first strip any preexisting comments from the `src/project.js` file (because that's how UglifyJS works), then concatenate the result with a newly-generated banner comment, writing the output to `dist/built.js`.

This generated banner will be the contents of the `min.options.banner` underscore template string interpolated with the config object. In this case, those properties are the values imported from the `package.json` file (which are available via the `pkg` config property) plus today's date.

_Note: you don't have to use an external JSON file. It's completely valid to create the `pkg` object inline in the config. That being said, if you already have a JSON file, you might as well reference it.

```javascript
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  min: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    dist: {
      src: ['dist/built.js'],
      dest: 'dist/built.min.js'
    }
  }
});
```