const puppeteer = require('puppeteer');

async function getPageData(url,page){
    await page.goto(url);
    const td = await page.$$eval('tableRatio3', td =>
        td => td.textContent);

    return {
        title: td
    }
};

async function main() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    const data= getPageData('https://apply.jinhakapply.com/SmartRatio');
    console.log(data);
}

main();