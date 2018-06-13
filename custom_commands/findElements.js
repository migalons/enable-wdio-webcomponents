module.exports = function findElements(selector) {

    function concat (array, items) {
        for(let i = 0; i < items.length; i++) {
            array.push(items[i]);
        }
        return array;
    }

    function getChildren(baseElement) {
        let children = [], nextChildren = [];
        if(baseElement.shadowRoot) {
            concat(children, baseElement.shadowRoot.children)
        }
        concat(children, baseElement.children);

        for(let i = 0; i < children.length; i++) {
            concat(nextChildren, getChildren(children[i]));
        }

        return concat(children, nextChildren)
    }

    function queryAll(baseElements, selector) {
        let found = [];

        for(let i = 0; i < baseElements.length; i++) {
            concat(found, getChildren(baseElements[i]))
        }

        return found.filter(function (element) {
            return element.matches(selector)
        });
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
