const express = require("express");
const app = express();
const PORT = 8080;

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function sendHtmlResponse(req, res, next) {
  res.send("<h1>Hello, World!</h1>");
}
// this should be different than the query param one
function sendDataResponse(req, res, next) {
  res.json({ message: "Hello, World!" });
}
// you did not make a about.html file so  it will not work you will get an error
function sendHtmlFile(req, res, next) {
  res.sendFile(__dirname + "/about.html");
}

function sendDataWithQueryParam(req, res, next) {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
}
// you should run middleware before the routes. No need to run them in the argument.
app.get("/", logger, sendHtmlResponse);
app.get("/about", logger, sendHtmlFile);
app.get("/api/data", logger, sendDataResponse);
app.get("/api/greeting", logger, sendDataWithQueryParam);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
