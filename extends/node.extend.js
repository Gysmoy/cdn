/**
 * Devuelve el texto dentro del nodo.
 *
 * @returns {string} El texto dentro del nodo.
 */
Node.prototype.text = function (text = undefined) {
    if (text === undefined) {
        return this.textContent;
    } else {
        this.textContent = text;
        return this;
    }
}

Node.prototype.val = function () {
    return this.value;
}

Node.prototype.html = function (html = undefined) {
    if (html === undefined) {
        return this.innerHTML;
    } else {
        this.innerHTML = html;
        return;
    }
}

Node.prototype.trigger = function (event) {
    const e = new Event(event);
    this.dispatchEvent(e);
}

Node.prototype.listen = function (event, callback = () => { }) {
    this.addEventListener(event, callback);
}
/**
 * Almacena o recupera el valor de una propiedad del nodo. Si se proporciona un valor,
 * la propiedad se establecerá en ese valor. Si no se proporciona un valor, se recuperará
 * el valor actual de la propiedad.
 * 
 * @param {string} key - La clave de la propiedad que se va a establecer o recuperar.
 * @param {*} [value=undefined] - El valor de la propiedad que se va a establecer. Se
 * establece en `undefined` si no se proporciona ningún valor.
 * @returns {*} El valor actual de la propiedad si no se proporciona ningún valor, de
 * lo contrario, no devuelve nada.
 */
Node.prototype.prop = function (key, value = undefined) {
    let nodeTypes = this['node-types'] || '{}';
    nodeTypes = JSON.parse(nodeTypes);
    if (value != undefined) {
        const type = typeof value;
        const stringifiedValue = (type === 'object' || type === 'function')
            ? JSON.stringify(value)
            : value;
        this[key] = stringifiedValue;

        nodeTypes[key] = {
            type: 'prop',
            valueType: type
        };
        this['node-types'] = JSON.stringify(nodeTypes);
        return this;
    } else {
        switch (nodeTypes[key]?.valueType) {
            case 'number':
                return Number(this[key]);
            case 'string':
                return String(this[key]);
            case 'object':
                return JSON.parse(this[key]);
            case 'function':
                const fn = new Function('', `return ${this[key]};`)();
                return fn.call(this);
            case 'null':
                return null;
            case 'boolean':
                return this[key] == 'true';
            case 'array':
                return JSON.parse(this[key]);
            default:
                return this[key];
        }
    }
}

/**
 * Establece o recupera el valor de un atributo en el nodo. Si se proporciona un valor,
 * el atributo se establecerá en ese valor. Si no se proporciona un valor, se recuperará
 * el valor actual del atributo.
 * 
 * @param {string} key - El nombre del atributo que se va a establecer o recuperar.
 * @param {*} [value=undefined] - El valor del atributo que se va a establecer. Se
 * establece en `undefined` si no se proporciona ningún valor.
 * @returns {*} El valor actual del atributo si no se proporciona ningún valor, de
 * lo contrario, no devuelve nada.
 */
Node.prototype.attr = function (key, value = undefined) {
    let nodeTypes = this['node-types'] || '{}';
    nodeTypes = JSON.parse(nodeTypes);
    if (value != undefined) {
        const type = typeof value;
        const stringifiedValue = (type === 'object' || type === 'function')
            ? JSON.stringify(value)
            : value;
        this.setAttribute(key, stringifiedValue);

        nodeTypes[key] = {
            type: 'attr',
            valueType: type
        };
        this['node-types'] = JSON.stringify(nodeTypes);
        return this;
    } else {
        switch (nodeTypes[key]?.valueType) {
            case 'number':
                return Number(this.getAttribute(key));
            case 'string':
                return String(this.getAttribute(key));
            case 'object':
                return JSON.parse(this.getAttribute(key));
            case 'function':
                const fn = new Function('', `return ${this.getAttribute(key)};`)();
                return fn.call(this);
            case 'null':
                return null;
            case 'boolean':
                return this.getAttribute(key) == 'true';
            case 'array':
                return JSON.parse(this.getAttribute(key));
            default:
                return this.getAttribute(key);
        }
    }
}

Node.prototype.toggle = function (delay = 0) {
    let style = window.getComputedStyle(this);
    this.style.transition = `${delay / 1000}s`;
    if (style.visibility == 'hidden' || style.display == 'none') {
        this.style.display = 'block';
        this.style.visibility = 'unset';
        this.style.opacity = 1;
    } else {
        this.style.display = null;
        this.style.visibility = 'hidden';
        this.style.opacity = 0;
    }
}

HTMLElement.prototype.empty = function () {
    this.innerHTML = null;
}

HTMLSelectElement.prototype.setOptions = function (options = []) {
    this.empty();
    options.forEach(option => {
        this.append(option);
    });
}

HTMLFormElement.prototype.getData = function () {
    let obj = {};
    [...this.elements].forEach(e => {
        if (e.name) {
            if (e.tagName === "INPUT") {
                if (e.type === "number") {
                    obj[e.name] = e.value !== "" ? Number(e.value) : null;
                } else if (e.type === "checkbox") {
                    obj[e.name] = e.checked;
                } else if (e.type === "radio") {
                    if (e.checked) {
                        obj[e.name] = e.value;
                    } else if (!obj.hasOwnProperty(e.name)) {
                        obj[e.name] = null;
                    }
                } else {
                    obj[e.name] = e.value !== "" ? e.value : null;
                }
            } else if (e.tagName === "SELECT") {
                if (e.multiple) {
                    var opcionesSeleccionadas = [];
                    for (var j = 0; j < e.options.length; j++) {
                        if (e.options[j].selected) {
                            opcionesSeleccionadas.push(e.options[j].value);
                        }
                    }
                    obj[e.name] = opcionesSeleccionadas;
                } else {
                    obj[e.name] = e.value !== "" ? e.value : null;
                }
            } else if (e.tagName === "TEXTAREA") {
                obj[e.name] = e.value !== "" ? e.value : null;
            }
        }
    });
    return obj;
};

/**
 * Clase HTML para simplificar el manejo de elementos HTML
 */
class HTML {
    /**
     * Devuelve el primer elemento que coincide con el selector dado
     * @param {string} selector - Selector CSS para buscar el elemento
     * @returns {HTMLElement} - Primer elemento encontrado
     */
    static take = (selector) => {
        return document.querySelector(selector);
    }

    /**
     * Devuelve una lista de todos los elementos que coinciden con el selector dado
     * @param {string} selector - Selector CSS para buscar los elementos
     * @returns {NodeList} - Lista de elementos encontrados
     */
    static takeAll = (selector) => {
        return document.querySelectorAll(selector);
    }

    /**
     * Crea un nuevo elemento HTML con el nombre especificado
     * @param {string} elementName - Nombre del elemento HTML a crear
     * @returns {HTMLElement} - Nuevo elemento HTML creado
     */
    static create = (elementName, attrs = {}) => {
        let element = document.createElement(elementName);
        for (const attr in attrs) {
            let value = attrs[attr];
            element.attr(attr, value);
        }
        return element;
    }
}