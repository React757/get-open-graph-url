const cheerio = require("cheerio");

module.exports = function Description(html) {
  var a = cheerio.load(html);

  const ogDesc = a('meta[property="og:description"]').attr("content");
  if (ogDesc !== null && ogDesc.length > 0) {
    return ogDesc;
  }

  const twitterDesc = a('meta[property="twitter:description"]').attr("content");
  if (twitterDesc !== null && twitterDesc.length > 0) {
    return twitterDesc;
  }

  const pureDesc = a('meta[name="description"]').attr("content");
  if (pureDesc !== null && pureDesc.length > 0) {
    return pureDesc;
  }

  return null;
};
