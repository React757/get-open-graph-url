"use strict";

var request = require("request");
var app = require("express")();
var cors = require("cors");
var bodyParser = require("body-parser");
var getUrls = require("get-urls");

var getTitle = require("./data/title");
var getImg = require("./data/img");
var getDesc = require("./data/desc");

app.use(cors());
app.use(bodyParser.json());

var port = 3001;

app.get("/", function (req, res) {
  res.send("Process is working");
});

app.post("/post", function (req, res) {
  var url = req.body.url;

  var checkURL = getUrls(url);

  if (checkURL.size === 0) {
    res.send({ status: 400 });
    return;
  }

  request(url, function (error, response, body) {
    res.json({
      status: 200,
      title: getTitle(response.body),
      desc: getDesc(response.body),
      img: getImg(response.body),
      url: url
    });
  });
});

app.listen(port, function () {
  return console.log("Example app listening at http://localhost:" + port);
});