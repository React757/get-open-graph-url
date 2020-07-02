const cheerio = require("cheerio");

module.exports = function Images(html) {
  var a = cheerio.load(html);

  const ogImg = a('meta[property="og:image"]').attr("content");
  if (ogImg !== null && ogImg.length > 0) {
    return ogImg;
  }

  const twitterImg = a('meta[property="twitter:image"]').attr("content");
  if (twitterImg !== null && twitterImg.length > 0) {
    return twitterImg;
  }

  const pureImg = a('link[rel="image_src').attr("href");
  if (pureImg !== null && pureImg.length > 0) {
    return pureImg;
  }
  return null;
};
