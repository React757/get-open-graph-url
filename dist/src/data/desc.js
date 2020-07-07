"use strict";

var cheerio = require("cheerio");

module.exports = function Description(html) {
  var a = cheerio.load(html);

  var ogDesc = a('meta[property="og:description"]').attr("content");
  if (ogDesc && ogDesc.length > 0) {
    return ogDesc;
  }

  var twitterDesc = a('meta[property="twitter:description"]').attr("content");
  if (twitterDesc && twitterDesc.length > 0) {
    return twitterDesc;
  }

  var pureDesc = a('meta[name="description"]').attr("content");
  if (pureDesc && pureDesc.length > 0) {
    return pureDesc;
  }

  return null;
};