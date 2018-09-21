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







shirts = {
    'Shirt1': 1,
    'Shirt2': 2,
    'Shirt3': 3,
    'Shirt4': 4,
    'Shirt5': 5,
    'Shirt6': 6,
    'Shirt7': 7,
    'Shirt8': 8
};

function scraper() {
  for (shirt in shirts) {
      var url = 'http://shirts4mike.com/shirt.php?id=10' + shirts[shirt];
      request(url, ( function(shirt) {
          return function(err, resp, body) {
              if (err)
                  throw err;
              $ = cheerio.load(body);
              const price = $('.shirt-details h1 span').text();
              const title = $('.breadcrumb').text().substring(9).replace(/,/, ' -');
              //     //const url = $('html');  Add variable to request statement and use variable techdegree
              const imageURL = $('.shirt-picture img').attr('src');
              const shirtURL = 'http://shirts4mike.com/shirt.php?id=10' + shirts[shirt];
              const time = Date();

              writeStream.write(`${title}, ${price}, ${imageURL}, ${shirtURL}, ${time} \n`);
          }
      } )(shirt));
  }
  console.log('Scraping complete...')
}

scraper();











//
// //Write Headers
// writeStream.write(`Price,Title,URL \n`);

// request('http://shirts4mike.com/shirt.php?id=102', (error, response, html) => {
//   if(!error && response.statusCode == 200){
//     const $ = cheerio.load(html);
//     const price = $('.shirt-details h1 span').text();
//     const title = $('.breadcrumb').text().substring(9).replace(/,/, ' -');
//     //const url = $('html');  Add variable to request statement and use variable techdegree
//     const imageURL = $('.shirt-picture img').attr('src');
//
//     //Write row to CSV
//     writeStream.write(`${price}, ${title}, ${imageURL} \n`);
//     console.log('Scraping done...');
//   }
// });
