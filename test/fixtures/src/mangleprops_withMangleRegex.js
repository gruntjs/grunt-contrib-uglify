var myObj = {
  myFunction: function(mangleMeVar) { mangleMeVar++; },
  dontMangleMe: function() {},
  _mangleMePls: function() {}
};

myObj.dontMangleMe();
myObj._mangleMePls();

var mangleMe1 = function() {};
var mangleMe2 = function() {};
