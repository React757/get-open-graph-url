const request = require("request");
const express = require("express");
const cheerio = require("cheerio");

const getTitle = require("./data/title");
const getImg = require("./data/img");
const getDesc = require("./data/desc");

const app = express();
const port = 3000;
const url = "https://andrejgajdos.com/how-to-create-a-link-preview/";

app.get("/", (req, res) => {
  res.send("Çalışıyor çalışmakta olan");
});

app.get("/get", (req, res) => {
  request(url, function (error, response, body) {
    res.json({
      title: getTitle(response.body),
      desc: getDesc(response.body),
      img: getImg(response.body),
      url: url,
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
