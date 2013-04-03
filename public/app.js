var form = document.querySelector("form");
var textarea = document.querySelector("textarea");
form.addEventListener("submit", function (evt) {
  evt.preventDefault();   // Blocks form from submitting
  post("/", textarea.value, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
}, false);

function post(url, value, callback) {
  var req = new XMLHttpRequest();
  req.open("POST", "/");
  req.onreadystatechange = function (aEvt) {
    if (req.readyState !== 4) return;
    if (req.status !== 200) {
      return callback(new Error("Oh Nones"));
    }
    var data;
    try {
      data = JSON.parse(req.responseText);
    } catch(err) {
      return callback(err);
    }
    callback(null, data);
  }
  req.send(value)
}
