let wdio = require("webdriverio");
let customCommands = require("./custom_commands/index");
let driver = wdio.remote({desiredCapabilities: {browserName: "chrome"}})


async function test() {

    try {
        await driver.init()
            .url("https://shop.polymer-project.org/list/mens_outerwear")
            .click("shop-app shop-list shop-list-item shop-image")
            .then(()=>{console.log("Clicked!")})
            .pause(5000)
            .waitForVisible("shop-app shop-detail .detail h1", 5000)
            .getText("shop-app shop-detail .detail h1")
            .then((text) => {
                console.log("++++++++++++++++++++++++++ text +++++++++++++++++++++++++++++++");
                console.dir(text);
                console.log("---------------------------------------------------------------");
            })
            .waitForVisible("shop-app shop-detail .detail h1", 5000)
            .then(()=>{console.log(".waitForVisible(\"shop-app shop-list shop-list-item shop-image\", 5000)")})
            // .waitForVisible("shop-app shop-list shop-list-item", 5000)

    } catch (e) {
        console.error("Error:", e);
    } finally {
        console.log("Ending session......")
        await driver.end()
    }

};

customCommands(driver);

test();
