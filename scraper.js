/*******************************************
CREATE A COMMAND LINE WEB SCRAPER
*********************************************/

//Require external packages
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// //Write Headers
writeStream.write(`Title,Price,ImageURL,Url,Time \n`);

//Container for individual shirt links
shirts = [];

//Function to scrape main page and return individual shirt links
var preScrape = new Promise(function(resolve, reject){
    var url = 'http://shirts4mike.com/shirts.php';
    request(url, (error, response, html) => {
     if(!error && response.statusCode == 200){
       $ = cheerio.load(html);
       const shirtQty = $('.products li a');
       shirtQty.each(function(){
         shirts.push($(this).attr('href'));
       });
       resolve();
    }
  });
})


//Function to scrape info from each individual page
function scraper() {
 for (shirt in shirts){
    var url = 'http://shirts4mike.com/' + shirts[shirt];
    request(url, (function(shirt){
          return function(error, response, html) {
         if(!error && response.statusCode == 200){
           $ = cheerio.load(html);
           const price = $('.shirt-details h1 span').text();
           const title = $('.breadcrumb').text().substring(9).replace(/,/, ' -');
           const imageURL = $('.shirt-picture img').attr('src');
           const shirtURL = 'http://shirts4mike.com/' + shirts[shirt];
           const time = Date();
           writeStream.write(`${title}, ${price}, ${imageURL}, ${shirtURL}, ${time} \n`);
        }
      }
    } )(shirt));
  }
  console.log('Scraping complete...')
}

preScrape.then(scraper);
