/*******************************************
CREATE A COMMAND LINE WEB SCRAPER
*********************************************/

//Require external packages
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//Folder Path
const dir = './data';

//Container for individual shirt links
shirts = [];

//Checks to see if folder named Data is created
function folderCheck(dir) {
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}

//Function to scrape main page and return individual shirt links
let preScrape = new Promise(function(resolve, reject){
    let url = 'http://shirts4mike.com/shirts.php';
    request(url, (error, response, html) => {
     if(!error && response.statusCode == 200){
       $ = cheerio.load(html);
       const shirtQty = $('.products li a');
       shirtQty.each(function(){
         shirts.push($(this).attr('href'));
       });
       resolve();
    } else {
        errorWrite('', Date(), '404');
    }
  });
})

//Function to scrape info from each individual page
function scraper() {
const writeStream = fs.createWriteStream('./data/' + currentDate() + '.csv');
writeStream.write(`Title,Price,ImageURL,Url,Time \n`);
 for (shirt in shirts){
    let url = 'http://shirts4mike.com/' + shirts[shirt];
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
        } else {
          errorWrite('/' + shirts[shirt], Date(), response.statusCode);
        }
      }
    } )(shirt));
  }
  console.log('Scraping complete...')
}

//Calls for date and returns back in YYYY-MM-DD format
function currentDate() {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  (day.length == 1) && (day = '0' + day);
  (month.length == 1) && (month = '0' + month);
  let yyyymmdd = `${year}-${month}-${day}`;
  return yyyymmdd;
}

//Log error message based on error type to console and log file
function errorWrite(error, time, errorCode){
  const errorLog = fs.createWriteStream('./data/scraper-error.log');
  errorMessage = `There has been a ${errorCode} error. Cannot connect to http://shirts4mike.com${error}.`;
  console.log(errorMessage);
  errorLog.write(`${time}, ${errorMessage} \n`);
}

//Execute program
function execute(){
  folderCheck(dir);
  preScrape.then(scraper);
}

//Called function(s)
execute();
