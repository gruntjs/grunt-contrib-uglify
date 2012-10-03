'use strict';

var grunt = require('grunt');

exports.contrib_uglify = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should minify file.');

    test.done();
  }
};
