var http = require('http');
var stack = require('stack');
var creationix = require('creationix');

var vfs = require('vfs-local')({
  root: __dirname + "/public/"
})

var server = http.createServer(stack(
  creationix.log(),
  function (req, res, next) {
    if (req.method === "GET") {
      if (req.url === '/') {
        req.url = '/index.html';
      }
      next();
      return;
    }
    if (req.method === "POST") {
      var text = "";
      req.setEncoding("utf8");
      req.on("data", function (chunk) {
        text += chunk;
      });
      req.on("end", function() {
        var data = convert(text);
        var json = JSON.stringify(data) + "\n";
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(json)
        });
        res.end(json);
      });
    }
  },
  require('vfs-http-adapter')("/", vfs)
)).listen(8080, function () {
  console.log("Http server listening at http://localhost:8080/");
});

var types = {
  directions: /\b(north|east|south|west)\b/i,
  times: /\b[0-9]+\+(second|minute|hour|day|week)s?\b/i,
  distances: /\b[0-9]+\+(feet|step|mile|kilometer|monkey length)s?\b/i
};

exports.convert = convert  //Export iff unit testing the function
function convert(text) {
  var matches = [];
  Object.keys(types).forEach(function (type) {
    console.log("Examining string for " + type)
    var offset = 0;
    var regexp = types[type];
    console.log("Looking at substring " + text.substr(offset));
    while (match = text.substr(offset).match(regexp)) {
      console.log("Found match\n");
      console.log(match);
      offset = offset + match.index
      matches.push({
        type: type,
        offset: offset,
        length: match[0].length
      });
      offset++;
    }
  });
  return matches;
}