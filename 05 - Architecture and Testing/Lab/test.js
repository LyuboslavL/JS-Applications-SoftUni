const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('E2E tests', function() {
    this.timeout(6000);

    before(async () => { browser = await chromium.launch() });
    after(async () => { browser.close()} );
    beforeEach(async () => { page = await browser.newPage() });
    afterEach(async () => { page.close() });

    it('loads static page', async function() {
        await page.goto('http://localhost:3002/');
        await page.screenshot({ path: `image.png` });
        await browser.close();
    })
});

