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

//https://blog.miguelgrinberg.com/post/easy-web-scraping-with-nodejs


//Check to see if “Data” folder exists
               //If yes, do nothing
               //If no, create “Data” folder


//Send request for number of T-shirts

//Send request for each page based on T-shirt number length
               //Get Title
               //Get price
               //Get URL
               //Get ImageURL
               //Get time of data scrape


//Write saved data in CSV file
               //File to be named for date it was created (ex. 2018-9-20.csv)

//If program is run twice, overwrite previous data in CSV with updated info

//Add error capturing







shirts = [];

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

function nick() {
  console.log(shirts);
}

function scraper() {
 for (i = 1; i <= 8; i += 1){
    var url = `http://shirts4mike.com/shirt.php?id=10${i}`;
    request(url, (error, response, html) => {
     if(!error && response.statusCode == 200){
       $ = cheerio.load(html);
       const price = $('.shirt-details h1 span').text();
       const title = $('.breadcrumb').text().substring(9).replace(/,/, ' -');
       const imageURL = $('.shirt-picture img').attr('src');
       const shirtURL = `http://shirts4mike.com/shirt.php?id=10${i}`;
       const time = Date();
       writeStream.write(`${title}, ${price}, ${imageURL}, ${shirtURL}, ${time} \n`);
    }
   });
  }
  console.log('Scraping complete...')
}

preScrape.then(nick);


//scraper();
