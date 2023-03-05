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

HTMLInputElement.prototype.val = function () {
    return this.value;
}