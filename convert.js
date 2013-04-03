module.exports = convert

var types = {
  directions: /\b(north|east|south|west)\b/i,
  times: /\b[0-9]+ (second|minute|hour|day|week)s?\b/i,
  distances: /\b[0-9]+ (feet|step|mile|kilometer|monkey length)s?\b/i
};

function convert(text) {
  var matches = [];
  Object.keys(types).forEach(function (type) {
    var offset = 0;
    var regexp = types[type];
    while (match = text.substr(offset).match(regexp)) {
      offset = offset + match.index
      length = match[0].length
      matches.push({
        type: type,
        offset: offset,
        length: length,
        value: match[0]
      });
      offset += length;
    }
  });
  return matches;
}