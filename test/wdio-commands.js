const wdio = require("webdriverio");
const customCommands = require("../index");
const chai = require("chai");

const capabilities = {
    desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["headless", "disable-cpu"]
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
        await driver.click("shop-home shop-button").pause(1000);
        await driver.getTitle().then((title) => {
            title.should.equal("Men's Outerwear - SHOP")
        })
    });

    it('should perform getText', async () => {
        await driver.url("https://shop.polymer-project.org/list/mens_outerwear").pause(1000);
        await driver.getText("app-toolbar .logo").then((text) => {
            text.should.equal("SHOP")
        })
    });

    it('should waitForVisible on visible elements', async () => {
        await driver.url("https://shop.polymer-project.org/list/mens_outerwear");
        await driver.waitForVisible("app-header app-toolbar .logo")
    });

    it('should isVisible returning true on visible elements', async () => {
        await driver.url("https://shop.polymer-project.org/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip").pause(1000);
        await driver.isVisible("shop-detail .price").then((isVisible) => {
            isVisible.should.be.true;
        })
    });

    it('should isVisible returning false on non visible elements', async () => {
        await driver.url("https://shop.polymer-project.org/list/mens_outerwear").pause(1000);
        await driver.isVisible("shop-detail .price").then((isVisible) => {
            isVisible.should.be.false;
        })
    });

    it('should select a value from list', async () => {
        await driver.url("https://shop.polymer-project.org/detail/mens_outerwear/Anvil+L+S+Crew+Neck+-+Grey").pause(2000);
        await driver.selectByValue("#sizeSelect", "XS");
        await driver.getValue("#sizeSelect").then((value) => {
            value.should.equal("XS");
        })
    });


    it('shoud support complex css selectors', async () => {
        await driver.url("https://shop.polymer-project.org/list/mens_outerwear")
        await driver.click("shop-image [alt='Rowan Pullover Hood']").pause(2000);
        await driver.getTitle().then(function (title) {
            title.should.equal("Rowan Pullover Hood - SHOP");
        })
    });

    afterEach(async () => {
        await driver.end();
    });

});
