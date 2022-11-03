const puppeteer = require('puppeteer');
const fs = require('fs');
const { monitorEventLoopDelay } = require('perf_hooks');

const getId = async (url) => {
    console.log(url)
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url);
    await page.addScriptTag({ path: 'locations.js' })
    setTimeout(async () => {
        let cityData = await page.evaluate(() => {
            let ans = fetchUrl();
            return ans;
        })

        let fileData = fs.readFileSync('id.json', { encoding: 'utf-8' });
        fileData = JSON.parse(fileData);
        let count = 0;
        for (const key in cityData) {
            if (fileData[key] == undefined) {
                count++;
            }
            fileData[key] = cityData[key];
        }
        console.log(count)
        let allCityId = JSON.stringify(fileData);
        fs.writeFile('id.json', allCityId, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('created!')
            }
        })
    }, 3000);
    setTimeout(() => {
        browser.close();
    }, 15 * 1000);
}


module.exports = {
    "getId": getId
}