```js
grunt.initConfig({
  concat: {
    dist: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.js'
    }
  },
  uglify: {
    dist: {
      src: ['dist/built.js'],
      dest: 'dist/built.min.js'
    }
  }
});
```