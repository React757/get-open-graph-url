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

var port = process.env.PORT || 3000;

app.get("/", function (req, res) {

  console.log(req.query, req.query.size);
  if (Object.keys(req.query).length === 0) {
    res.send("fil like this ?url=URL ");
    return;
  }
  var url = req.query.url;

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

app.post("/", function (req, res) {
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