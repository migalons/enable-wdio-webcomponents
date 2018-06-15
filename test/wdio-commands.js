/* global it, describe, before, beforeEach, afterEach */
const wdio = require('webdriverio');
const customCommands = require('..');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const capabilities = {
    desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['headless', 'disable-cpu', '--start-maximized'],
        },
    },
    waitforTimeout: 5000,
};

describe('Webcomponent test', async function () {
    let driver;

    this.timeout(10000);

    chai.use(chaiAsPromised);
    chai.should();

    before(() => {
        driver = wdio.remote(capabilities);
        customCommands(driver);
    });

    beforeEach(async () => {
        await driver.init();
    });

    it('should wait for visible', () =>
        driver.url('https://shop.polymer-project.org/detail/mens_outerwear/Anvil+L+S+Crew+Neck+-+Grey')
            .waitForVisible('shop-home shop-button')
            .should.eventually.be.ok);

    it('should throw and exception when element des not exist', () => driver.url('https://shop.polymer-project.org/detail/mens_outerwear/Anvil+L+S+Crew+Neck+-+Grey')
        .waitForVisible('#thisDoesNotExist')
        .should.be.rejectedWith('element ("#thisDoesNotExist") still not visible after'));

    it('should throw and exception when element des not exist', () => driver.url('https://shop.polymer-project.org/detail/mens_outerwear/Anvil+L+S+Crew+Neck+-+Grey')
        .waitForVisible('#thisDoesNotExist')
        .should.be.rejectedWith('element ("#thisDoesNotExist") still not visible after'));

    it('should perform a click over css selector', () => driver.url('https://shop.polymer-project.org')
        .waitForVisible('shop-home .item:nth-of-type(2) shop-button')
        .click('shop-home .item:nth-of-type(2) shop-button')
        .waitForVisible('shop-list')
        .getTitle()
        .should.eventually.equal('Ladies Outerwear - SHOP'));

    it('should perform getText', () => driver.url('https://shop.polymer-project.org/list/mens_outerwear')
        .waitForVisible('app-toolbar .logo')
        .getText('app-toolbar .logo')
        .should.eventually.equal('SHOP'));

    it('should waitForVisible on visible elements', () => driver.url('https://shop.polymer-project.org/list/mens_outerwear')
        .waitForVisible('app-header app-toolbar .logo')
        .should.eventually.be.ok);

    it('should isVisible returning true on visible elements', () => driver.url('https://shop.polymer-project.org/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip')
        .waitForExist('shop-detail')
        .isVisible('shop-detail .price')
        .should.eventually.be.true);

    it('should isVisible returning false on non visible elements', () => driver.url('https://shop.polymer-project.org/list/mens_outerwear')
        .waitForExist('shop-list')
        .isVisible('shop-detail .price')
        .should.eventually.be.false);

    it('should select a value from list', () => driver.url('https://shop.polymer-project.org/detail/mens_outerwear/Anvil+L+S+Crew+Neck+-+Grey')
        .waitForVisible('#sizeSelect')
        .selectByValue('#sizeSelect', 'XS')
        .getValue('#sizeSelect')
        .should.eventually.equal('XS'));


    it('shoud support complex css selectors', () => driver.url('https://shop.polymer-project.org/list/mens_outerwear')
        .waitForVisible('shop-image [alt=\'Rowan Pullover Hood\']')
        .click("shop-image [alt='Rowan Pullover Hood']")
        .waitForVisible('shop-detail')
        .getTitle()
        .should.eventually.equal('Rowan Pullover Hood - SHOP'));

    afterEach(async () => {
        await driver.end();
    });
});

