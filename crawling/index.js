const cheerio = require('cheerio');
const rp = require('request-promise');

rp('https://www.zara.com/kr/').then((data) => {
    const $ = cheerio.load(data);

    let categoryList = $('#menu > ul > li').map((i, el)=>{
        return $(el).find('a').attr('href');
    }).toArray();

    return Promise.resolve(categoryList)
}).then((categoryList) => {
    var categoryLinkData = categoryList.map((categoryUrl) => getCategoryData(categoryUrl))

    Promise.all(categoryLinkData).then((result) => {
        console.log('finish!');
    })
})

function getCategoryData(categoryUrl){
    return new Promise((resolve, reject)=>{
        rp(categoryUrl).then((data)=>{
            resolve(getItem(data));
        })
    });
}
function getItem(data){
    const $ = cheerio.load(data);
    let categoryLink = $('#menu > ul > li._category-link-wrapper.current.selected > ul > li').map((i, el)=>{
        return $(el).find('a').attr('href');
    }).toArray();
}
