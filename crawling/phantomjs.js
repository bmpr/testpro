const cheerio = require('cheerio')
const rp = require('request-promise')
const phantom = require('phantom');
let _page;

phantom
    .create()
    .then(ph => {
        return ph.createPage();
    })
    .then(page => {
        _page = page;

        rp('https://www.zara.com/kr/ko/man-outerwear-l715.html?v1=764502').then((data) => {
            const $ = cheerio.load(data);

            $('li.product').each((idx, element) => {
                let subPageUrl = $(element).find('a.item').attr('href')
                let productName = $(element).find('div.product-info-item.product-info-item-name > a').text();

                setTimeout(function(){
                    page.open(subPageUrl).then(() => {
                        return page.property('content')
                    }).then((content) => {
                        const $sub = cheerio.load(content);

                        let price = $sub('#product > div.product-info-container._product-info-container > div > div > div.price._product-price > span').text();
                        let size = $sub('#product > div.product-info-container._product-info-container > div > div > form > fieldset > div > div.size-list > label > span.size-name').map((idx, elm) => {
                            return $sub(elm).text()
                        })

                        console.log({
                            curPageUrl : subPageUrl,
                            productName : productName,
                            price : price,
                            size : size.toArray()
                        })
                    })
                }, 500 * idx)
            })
        })
    })


//
//
// phantom
//     .create()
//     .then(ph => {
//         return ph.createPage();
//     })
//     .then(page => {
//         _page = page;
//
//         return page.open('https://www.zara.com/kr/ko/-p00706302.html?v1=5330005&v2=764502')
//     })
//     .then(status => {
//         console.log(status)
//         return _page.property('content');
//     })
//     .then(content => {
//         const $ = cheerio.load(content);
//         let price = $('#product > div.product-info-container._product-info-container > div > div > div.price._product-price > span').text();
//         let size = $('#product > div.product-info-container._product-info-container > div > div > form > fieldset > div > div.size-list > label > span.size-name').map((idx, elm) => {
//             return $(elm).text()
//         })
//
//     })
//     .catch(err => {
//         console.log(err)
//     })