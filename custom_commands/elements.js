const findElements = require("./findElements");
const splitWhitespaceKeepQuoted = require("../lib/splitWhitespaceKeepQuoted");

let notFound = function (sessionId, selector) {

    return {
        status: 7,
        type: 'NoSuchElement',
        message: 'An element could not be located on the page using the given search parameters.',
        state: 'failure',
        sessionId: sessionId,
        value: null,
        selector: selector
    }
};

module.exports = function (selector) {
    let selectorArray = splitWhitespaceKeepQuoted(selector);
    return this.execute(findElements, selectorArray)
        .then((result) => {
            return Object.assign({}, result, {selector: selector});
        });
};
