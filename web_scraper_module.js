var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

function promiseCallback(resolve, reject){
  request.get('http://substack.net/images/', populateScraper);
  function populateScraper(error, response, body) {
    var $ = cheerio.load(body);
    if (!error && response.statusCode == 200 ){
      scrapeTR(error, response, body);
    }
  }
  function scrapeTR(error, response, body) {
    var new_array = "";
    var $ = cheerio.load(body);
    $('tr').each(function(i, element) {
      var fileName = $(this).find('a').text();
      var code = $(this).find('code').first().text();
      new_array += 'http://substack.net/images/' + fileName + ', ' + path.extname(fileName) + ', ' + code + '\n';
    });
    resolve(new_array);
  }
}
function webScraper() {
  return new Promise(promiseCallback);
}

module.exports = webScraper;