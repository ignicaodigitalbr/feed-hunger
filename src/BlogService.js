function BlogService() {

  var fetch = require('node-fetch');

  var fixUrl = function (url) {
    return url.match(/http(s)?:\/\//) ? url : 'http://' + url;
  };

  this.getPostList = function (rssFeedUrl) {
    return fetch('http://rss2json.com/api.json?rss_url=' + fixUrl(rssFeedUrl));
  };

  this.getPostImage = function (postUrl) {
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=',
        select = 'SELECT * FROM html WHERE url=',
        where = '"' + postUrl + '" AND xpath="descendant-or-self::meta"',
        format = 'json';

    return fetch(yql + encodeURIComponent(select + where) + '&format=' + format);
  };

  return this;
};

module.exports = BlogService;
