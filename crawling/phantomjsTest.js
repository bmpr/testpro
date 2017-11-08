// var page = require('webpage').create();
//
// page.open('http://www.havehad.co.kr/custom', function(status) {
//     let html = page.content;
//     console.log(html);
//
//     phantom.exit()
// });
//
// var page = require('webpage').create();
// page.open('http://www.google.com', function(status) {
//   console.log("Status: " + status);
//   if(status === "success") {
//     page.render('google.png');
//   }
//   phantom.exit();
// });

const phantom = require('phantom');
const cheerio = require('cheerio');
let _page;

// phantom
//     .create()
//     .then(ph => {
//         return ph.createPage();
//     })
//     .then(page => {
//         _page = page;
//         return page.open('http://www.havehad.co.kr/custom/')
//     })
//     .then(status => {
//         console.log(status);
//         return _page.property('content');
//     })
//     .then((content) => {
//         const $ =cheerio.load(data);
//         //console.log($('#made_item > div > div.item-style > div > div:nth-child(3) > ul > li:nth-child(1) > img'));
//         console.log(content);
//     })
//     .catch(err => {
//         console.log(err);
//     })

    phantom
        .create()
        .then(ph => {
            return ph.createPage();
        })
        .then(page => {
            _page = page;
            return page.open('https://www.zara.com/kr/ko/%EC%97%90%EC%BD%94-%EC%8B%9C%EC%96%B4%EB%A7%81-%EC%BD%94%EB%93%80%EB%A1%9C%EC%9D%B4-%EC%A0%90%ED%8D%BC-p04341336.html?v1=5290284&v2=843009')
        })
        .then(status => {
            console.log(status);
            return _page.property('content');
        })
        .then((content) => {
            const $ =cheerio.load(content);
            // console.log($('#product > div.product-info-container._product-info-container > div > div > div.price._product-price > span').text());

            console.log($('#product > div.product-info-container._product-info-container > div > div > form > fieldset > div > div.size-list > label:nth-child(2) > span.size-name').text());

            // console.log($('#product > div.product-info-container._product-info-container > div > div > form > fieldset > div > div.size-list > label'));
            // console.log(content);
        })
        .catch(err => {
            console.log(err);
        })
