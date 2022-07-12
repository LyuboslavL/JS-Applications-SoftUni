const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto('http://softuni.bg/');
    await page.screenshot({path: 'softuni-screenshot.png'});
    await browser.close();
})();