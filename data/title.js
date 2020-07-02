const cheerio = require("cheerio");

module.exports = function Title(html) {
  var a = cheerio.load(html);

  const ogTitle = a('meta[property="og:title"]').attr("content");
  if (ogTitle !== null && ogTitle.length > 0) {
    return ogTitle;
  }

  const twitterTitle = a('meta[property="twitter:title"]').attr("content");
  if (twitterTitle !== null && twitterTitle.length > 0) {
    return twitterTitle;
  }

  const pureTitle = a("title").html();
  if (pureTitle !== null && pureTitle.length > 0) {
    return pureTitle;
  }
  return null;
};
