module.exports = function (selector) {



    function query(baseElement, selector) {
        let shadowElement, commonElement;

        if(baseElement.shadowRoot) {
            shadowElement = baseElement.shadowRoot.querySelector(selector);
        }
        let element = baseElement.querySelector(selector)

        if(shadowElement) {
            return shadowElement;
        } else {
            return element;
        }
    }

    function innerFindElement(selectors) {
        selectors = selectors.filter((item) => item);

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
        return innerFindElement(selector.split(' '));
    } else {
        return innerFindElement([selector])
    }
};
