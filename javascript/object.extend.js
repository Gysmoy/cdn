/**
 * Convierte un objeto en formato JSON en una cadena, permitiendo reemplazar valores
 * si se proporciona una función `replacer`.
 *
 * @param {function} [replacer = null] - Función que transforma los valores encontrados
 * en el objeto. Puede ser `null` para que no se realice ninguna transformación.
 * @param {number} [tab = null] - Espacio que se utiliza para indentar cada nivel del
 * objeto JSON. Si se proporciona un número, se usará ese número de espacios. Si no
 * se proporciona, no se aplicará ninguna indentación.
 * @returns {string} - Una cadena que representa el objeto en formato JSON.
 */
Object.prototype.stringify = function (replacer = null, tab = null) {
    return JSON.stringify(this, replacer, tab);
}

/**
 * Convierte un objeto en formato JSON en una cadena, aplicando una indentación de
 * espacios para hacerla más legible.
 *
 * @param {number} [tab = 2] - Espacio que se utiliza para indentar cada nivel del
 * objeto JSON. Si se proporciona un número, se usará ese número de espacios. Si no
 * se proporciona, se usará un valor predeterminado de 2 espacios.
 * @returns {string} - Una cadena que representa el objeto en formato JSON con
 * indentación aplicada.
 */
Object.prototype.pretty = function (tab = 2) {
    return JSON.stringify(this, null, tab);
}

/**
 * Recursivamente aplana un objeto, concatenando las claves con el prefijo dado.
 * 
 * @param {string} [prefix=''] - El prefijo que se usará al concatenar las claves.
 * @returns {Object} - Un nuevo objeto con las claves concatenadas.
 */
Object.prototype.flatten = function (prefix = '') {
    let obj = this;
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (Array.isArray(obj[k])) {
            obj[k].forEach((item, i) => {
                const key = `${pre}${k}[${i}]`;
                if (typeof item === 'object' && item !== null) {
                    Object.assign(acc, item.flatten(key));
                } else {
                    acc[key] = item;
                }
            });
        } else if (typeof obj[k] === 'object' && obj[k] !== null) {
            Object.assign(acc, obj[k].flatten(pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
};

/**
 * Convierte un objeto de notación de puntos a un objeto anidado.
 * 
 * @param {Object} obj - El objeto a convertir.
 * @returns {Object} - El objeto convertido.
 */
Object.prototype.unflatten = function () {
    let obj = this;
    let result = {};
    for (let key in obj) {
        let keys = key.split('.');
        let cur = result;
        for (let i = 0; i < keys.length; i++) {
            let prop = keys[i];
            let isArray = false;
            if (prop.includes('[') && prop.endsWith(']')) {
                let index = parseInt(prop.slice(prop.indexOf('[') + 1, prop.length - 1));
                prop = prop.slice(0, prop.indexOf('['));
                if (!cur[prop]) {
                    cur[prop] = [];
                }
                isArray = true;
                while (cur[prop].length < index) {
                    cur[prop].push({});
                }
                if (i === keys.length - 1) {
                    cur[prop][index] = obj[key];
                } else {
                    if (!cur[prop][index]) {
                        cur[prop][index] = {};
                    }
                    cur = cur[prop][index];
                }
            } else {
                if (i === keys.length - 1) {
                    cur[prop] = obj[key];
                } else {
                    if (!cur[prop]) {
                        cur[prop] = {};
                    }
                    cur = cur[prop];
                }
            }
        }
    }
    return result;
}

/**
 * Toma una cantidad especificada de elementos desde el principio del array actual y
 * devuelve un nuevo array con esos elementos.
 *
 * @param {number} quantity - La cantidad de elementos que se tomarán del array actual.
 * Si se proporciona un valor negativo, se tomará ningún elemento.
 * @returns {Array} Un nuevo array que contiene los elementos tomados desde el array
 * actual.
 */
Array.prototype.take = function (quantity) {
    return this.slice(0, quantity);
}