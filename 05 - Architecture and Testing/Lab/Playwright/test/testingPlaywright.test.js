const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

let browser, page;

describe('SoftUni testing', function() {
    this.timeout(10000);
    
    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('Should go to trainers page', async () => {
        await page.goto('http://softuni.bg/');
        await page.click('text=Преподаватели');
        let heading = await page.textContent('.trainers-page-content-header-info-title');
        heading = heading.trim();
        assert.equal(heading, 'Преподаватели');
    });
})