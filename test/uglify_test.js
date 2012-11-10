'use strict';

var grunt = require('grunt');

var tmp = 'tmp/',
    fixtures = 'test/expected/';

exports.contrib_uglify = {
  preuglified_files: function(test) {

    var files = [
      'lodash-c.js',
      'lodash-c-m.js',
      'lodash-c-m-rarrayRef.js',
      'lodash-c-m-b.js',
      'lodash-c-m-oDEVNULL--source-map.js',
    ];

    test.expect(files.length);

    files.forEach(function(file){
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
    });

    test.done();
  }
};
