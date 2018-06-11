const findElement = require("./findElement");
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
    return this.execute(findElement, selectorArray)
        .then((result) => {
            const myResult = Object.assign({}, result, {selector: selector});
            if (result.value !== null) {
                return myResult;
            } else {
                return notFound(result.sessionId, selector);
            }
        });
};
