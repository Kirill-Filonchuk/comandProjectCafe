export default class Render {
    static refs = {
        body: document.body,
        servicePanel: document.createElement("section")
    }

    get refs() {
        return Render.refs;
    }

    getElementWithMarkup(parentNode, markup, position = "beforeend") {
        parentNode.insertAdjacentHTML(position, markup);
    }
    
    getElementWithNode(parentNode, childNode, position = "beforeend") {
        parentNode.insertAdjacentElement(position, childNode);
    }

    createElementWithOptions(tagName, options = {}) {
        const element = document.createElement(tagName);
        for (let optionKey in options) {
            if (optionKey === "textContent") {
                element[optionKey] = options[optionKey];
            } else {
                element.setAttribute(optionKey, options[optionKey]);
            }
        }
        return element;
    }
}