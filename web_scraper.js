var webScraper = require('./web_scraper_module.js');
var fs = require('fs');
console.log("processing... processing... processing")
webScraper().then(function(data){
  fs.writeFile('test.csv', data, function(err){
    if(err) {
      throw err;
    }
    console.log("The file was saved!");
  });
});