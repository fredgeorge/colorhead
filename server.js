var http = require('http');
var stack = require('stack');
var creationix = require('creationix');
var convert = require('./convert');

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
