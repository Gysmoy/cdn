Node.prototype.text = function () {
    return this.textContent();
}

Node.prototype.data = function (key, value = undefined) {
    if (value != undefined) {
        this[key] = value;
        return;
    }
    return this[key];
}

Node.prototype.attr = function (key, value = undefined) {
    if (value != undefined) {
        this.setAttribute(key, value);
        return;
    }
    return this.getAttribute(key);
}

HTMLInputElement.prototype.val = function () {
    return this.value;
}

class HTML extends Node {
    static create = (elementName) => {
        let element = document.createElement(elementName);
        return element;
    }
}