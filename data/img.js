const cheerio = require("cheerio");

module.exports = function Images(html) {
  var a = cheerio.load(html);

  const ogImg = a('meta[property="og:image"]').attr("content");
  if (ogImg && ogImg.length > 0) {
    return ogImg;
  }

  const twitterImg = a('meta[property="twitter:image"]').attr("content");
  if (twitterImg && twitterImg.length > 0) {
    return twitterImg;
  }
  return null;
};
