Object.prototype.stringify = function (replacer = null, tab = null) {
    return JSON.stringify(this, replacer, tab);
}

Object.prototype.pretty = function (tab = 2) {
    return JSON.stringify(this, null, tab);
}