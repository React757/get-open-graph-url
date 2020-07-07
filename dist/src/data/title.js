"use strict";

var cheerio = require("cheerio");

module.exports = function Title(html) {
  var a = cheerio.load(html);

  var ogTitle = a('meta[property="og:title"]').attr("content");
  if (ogTitle && ogTitle.length > 0) {
    return ogTitle;
  }

  var twitterTitle = a('meta[property="twitter:title"]').attr("content");
  if (twitterTitle && twitterTitle.length > 0) {
    return twitterTitle;
  }

  var pureTitle = a("title").html();
  if (pureTitle && pureTitle.length > 0) {
    return pureTitle;
  }
  return null;
};