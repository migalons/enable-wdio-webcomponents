module.exports = function findElements(selector) {

    function concat (array, items) {
        for(let i = 0; i < items.length; i++) {
            array.push(items[i]);
        }
        return array;
    }

    function queryAll(baseElements, selector) {
        let shadowElements, commonElements;
        let found = [];

        for(let i = 0; i < baseElements.length; i++) {
            let baseElement = baseElements[i];
            if(baseElement.shadowRoot) {
                shadowElements = baseElement.shadowRoot.querySelectorAll(selector);
                if(shadowElements && shadowElements.length > 0) {
                    found = concat(found, shadowElements);
                }
            }
            let commonElements = baseElement.querySelectorAll(selector);
            if(commonElements && commonElements.length > 0) {
                found = concat(found, commonElements);
            }
        }

        return found;
    }

    function innerFindElements(selectors) {
        let currentElements = [document.documentElement];
        for (let i = 0; i < selectors.length; i++) {
            currentElements = queryAll(currentElements, selectors[i]);
            if (!currentElements) {
                break;
            }
        }
        return currentElements;
    }

    if(document.body.createShadowRoot || document.body.attachShadow) {
        return innerFindElements(selector);
    } else {
        return innerFindElements([selector.join(' ')])
    }
};
