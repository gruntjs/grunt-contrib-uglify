'use strict';

var grunt = require('grunt');
var path = require('path');

var read = function() {
  var filepath = path.join.apply(this, Array.prototype.slice.call(arguments));
  return grunt.util.normalizelf(grunt.file.read(filepath));
};

exports.contrib_uglify = {
  preuglified_files: function(test) {

    var files = [
      'beautify.js',
      'comments.js',
      'commentsWithImportant.js',
      'compress.js',
      'compress_explicit.js',
      'compress_mangle.js',
      'compress_mangle_banner.js',
      'compress_mangle_beautify.js',
      'compress_mangle_except.js',
      'multifile.js',
      'wrap.js',
      'maxLineLen.js',
      'asciionly.js',
      'screwIE8.js',
      'sourcemap_basic.js',
      'sourcemap_basic.js.map',
      'sourcemap_customDir.js',
      'sourcemap_customName.js',
      'source_map_custom_name',
      'sourcemap_customRoot.js',
      'sourcemap_customRoot.js.map',
      'sourcemap_customUrl.js',
      'sourcemap_customUrl.js.map',
      'sourcemap_functionName.js',
      'sourcemap_functionName.js.fn.map',
      path.join('deep', 'directory', 'location', 'source_map.js.map'),
      'sourcemapin.js',
      'sourcemapin.js.map',
      'sourcemap_sources.js.map',
      'sourcemapin_customUrl.js',
      'sourcemapin_customUrl.js.map',
      'sourcemapin_sources.js',
      'sourcemapin_sources.js.map',
      'sourcemaps_multiple1.js',
      'sourcemaps_multiple1.js.map',
      'sourcemaps_multiple2.js',
      'sourcemaps_multiple2.js.map',
      'sourcemaps_multiple1_fnName.js',
      'sourcemaps_multiple1_fnName.js.fn.map',
      'sourcemaps_multiple2_fnName.js',
      'sourcemaps_multiple2_fnName.js.fn.map',
      'expression.json',
      'expression.js',
      'mangleprops.js',
      'mangleprops_withExcept.js',
      'mangleprops_withExceptionsFiles.js',
      'mangleprops_withExceptAndExceptionsFiles.js',
      'mangleprops_withNameCacheFile1.js',
      'mangleprops_withNameCacheFile2.js',
      'mangleprops_withRegex.js',
      'uglify_name_cache.json',
      'quotes_single.js',
      'quotes_double.js',
      'quotes_original.js'
    ];

    test.expect(files.length);

    files.forEach(function(file) {
      var actual = read('tmp', file);
      var expected = read('test', 'fixtures', 'expected', file);
      test.equal(actual, expected, 'task output should equal ' + file);
    });

    test.done();
  }
};
