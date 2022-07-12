const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 200 });
    const page = await browser.newPage();

    await page.goto('http://softuni.bg/');
    await page.screenshot({ path: 'softuni-screenshot.png' });
    await page.click('text=ПРЕПОДАВАТЕЛИ');
    await page.screenshot({ path: 'teachers-screenshot.png' });
    await browser.close();
})();