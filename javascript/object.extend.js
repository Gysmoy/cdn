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

console.log(({
    "glossary": {
        "title": "example glossary",
        'milista': [
            1, 2, 3, 4, 5,
            {
                "hola": "mundo",
                "hello": "world"
            }
        ],
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}).flatten());