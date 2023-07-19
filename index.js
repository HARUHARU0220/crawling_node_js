const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://addon.jinhakapply.com/RatioV1/RatioH/Ratio10190351.html');

    const links = await page.$$eval('a.rate', allA =>
        allA.map(a => a.href));

    console.log(links);

})();