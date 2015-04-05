function llama() {
  var a = 'This is a single quote string';
  var b = "This is a double quote string";
  var c = {
    "this": "is part of an Object",
    'and': 'so is this',
    'but': 'this one has "mixed" quotes: \''
  };

  return [a, b, c];
}
