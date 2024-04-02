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

function sendDataResponse(req, res, next) {
  res.json({ message: "Hello, World!" });
}

function sendHtmlFile(req, res, next) {
  res.sendFile(__dirname + "/about.html");
}

function sendDataWithQueryParam(req, res, next) {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
}

app.get("/", logger, sendHtmlResponse);
app.get("/about", logger, sendHtmlFile);
app.get("/api/data", logger, sendDataResponse);
app.get("/api/greeting", logger, sendDataWithQueryParam);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
