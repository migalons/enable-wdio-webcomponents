const wdio = require("webdriverio");
const customCommands = require("../index");
const chai = require("chai");

const capabilities = {
    desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["headless", "disable-gpu"]
        }
    }
};

describe("Webcomponent test", async function () {
    let driver;
    chai.should();

    this.timeout(10000);

    before(function () {
        driver = wdio.remote(capabilities);
        customCommands(driver);
    });

    beforeEach(async () => {
        await driver.init();
    })

    it('click', async () => {
        await driver.url("https://shop.polymer-project.org").pause(1000);
        await driver.click("shop-app shop-home shop-button").pause(1000);
        await driver.getTitle().then((title) => {
            title.should.equal("Men's Outerwear - SHOP")
        })
    });

    afterEach(async () => {
        await driver.end();
    });

});
