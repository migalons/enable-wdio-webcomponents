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

    it('should perform a click', async () => {
        await driver.url("https://shop.polymer-project.org").pause(1000);
        await driver.click("shop-app shop-home shop-button").pause(1000);
        await driver.getTitle().then((title) => {
            title.should.equal("Men's Outerwear - SHOP")
        })
    });

    it('should perform getText', async () => {
        await driver.url("https://shop.polymer-project.org/list/mens_outerwear").pause(1000);
        await driver.getText("shop-app app-header app-toolbar .logo").then((text) => {
            text.should.equal("SHOP")
        })
    });

    afterEach(async () => {
        await driver.end();
    });

});
