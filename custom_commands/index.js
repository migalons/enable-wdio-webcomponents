const element = require("./element");
// const elements = require("./elements");

module.exports = function (driver) {

    driver.addCommand('element', function () {
        return element.apply(this, arguments);
    }, true);

    // driver.addCommand('elements', function () {
    //     return elements.apply(this, arguments);
    // }, true);

    console.log("Custom commands loaded!")

}
