module.exports = function (selector) {

    function query(baseElement, selector) {
        let shadowElement;

        if(baseElement.shadowRoot) {
            shadowElement = baseElement.shadowRoot.querySelector(selector);
        }
        if(shadowElement) {
            return shadowElement;
        } else {
            return baseElement.querySelector(selector);
        }
    }

    function innerFindElement(selectors) {
        let currentElement = document.documentElement;
        for (let i = 0; i < selectors.length; i++) {
            currentElement = query(currentElement, selectors[i]);
            if (!currentElement) {
                break;
            }
        }
        return currentElement;
    }

    if(document.body.createShadowRoot || document.body.attachShadow) {
        return innerFindElement(selector);
    } else {
        return innerFindElement([selector.join(' ')])
    }

};
