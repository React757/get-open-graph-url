const request = require("request");
const app = require("express")();
var cors = require("cors");
const bodyParser = require("body-parser");
const getUrls = require("get-urls");

const getTitle = require("./data/title");
const getImg = require("./data/img");
const getDesc = require("./data/desc");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Process is working");
});

app.post("/get", (req, res) => {
  const { url } = req.body;
  const checkURL = getUrls(url);

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
      url: url,
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
