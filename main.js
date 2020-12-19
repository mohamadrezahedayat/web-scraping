const puppeteer = require('puppeteer');
const fs = require('fs');
const url = 'http://www.tsetmc.com/Loader.aspx?ParTree=15131F';

(async function () {
    const browser = await puppeteer.launch({ headless: false, setTimeout: 100000, });
    const page = await browser.newPage();
    console.log('new page done');
    await page.goto(url).catch(e => {
        console.log(e.toString());

    });

    console.log('go to navigation done');
    await page.waitFor(3000);
    console.log('wait for 3 is done');

    //extract names only
    const names = await page.$$eval('#main > div a', els => els.map(el => el.textContent));
    

    var file = fs.createWriteStream('names.txt');
    file.on('error', err => { console.log('an error occured', err.message); });
    let i = 0;
    names.forEach(name => file.write(`${++i}. ${name} , \n`));
    file.end();

    

    await browser.close();

})()