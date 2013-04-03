var convert = require('./convert');
var assert = require('assert');

var tests = {
  "": [],
  "10 miles": [{
    type: "distances",
    offset: 0,
    length: 8,
    value: "10 miles"
  }], 
  "Welcome to TrailHead. Today we'll have fun.": [],
  "Please walk 10 feet north to the start of the trail.": [{
    type: "directions",
    offset: 20,
    length: 5,
    value: "north"}, {
    type: "distances",
    offset: 12,
    length: 7,
    value: "10 feet"
  }], 
  "Then ride your bike 30 miles downhill (south).": [{
    type: "directions",
    offset: 39,
    length: 5,
    value: "south"}, {
    type: "distances",
    offset: 20,
    length: 8,
    value: "30 miles"
  }]
};

Object.keys(tests).forEach(function (input) {
  var expected = tests[input];
  var actual = convert(input);
  assert.deepEqual(expected, actual);
})
