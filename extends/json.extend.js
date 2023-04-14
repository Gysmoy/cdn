/**
 * Definición de un nuevo método `parseable` en el objeto `JSON` que toma una cadena
 * como entrada e intenta analizarla como JSON usando `JSON.parse()`. Si el análisis
 * es exitoso, devuelve "verdadero", de lo contrario, devuelve "falso". Este método
 * se puede usar para verificar si una cadena determinada es JSON válida o no.
 */
JSON.parseable = function (text) {
    try {
        let json = JSON.parse(text);
        return json;
    } catch (error) {
        return false;
    }
}

/**
 * Una función que imprime de forma legible la representación JSON de un objeto con
 * opciones adicionales de formato.
 *
 * @param {number} [tab = 2] - El número de espacios para indentar la salida.
 * @param {Object} [options] - Opciones adicionales para el formato de la salida.
 * @param {boolean} [options.keyNative = false] - Indica si las comillas dobles alrededor
 * de las claves de objeto deben eliminarse.
 * @param {boolean} [options.valueNative = false] - Indica si las comillas dobles alrededor
 * de los valores de cadena deben eliminarse.
 * @param {string} [options.asigner = ':'] - El separador a utilizar entre las claves y
 * los valores del objeto.
 * @param {string} [options.separator = ','] - El separador a utilizar entre cada par
 * clave-valor del objeto.
 * @returns {string} - Una cadena que contiene la representación JSON del objeto formateado
 * de manera legible.
 */
JSON.pretty = function (obj, tab = 2, {
    keyNative = false,
    valueNative = false,
    asigner = ':',
    separator = ','
} = { asigner: ':', separator: ',' }) {
    let str = JSON.stringify(obj, null, tab);
    if (keyNative) str = str.replace(/"([^"]+)":/g, '$1:');
    if (valueNative) str = str.replace(/: "([^"]+)"/g, ': $1');
    str = str.replace(/:/g, asigner);
    str = str.replace(/,\n/g, `${separator}\n`)
    return str;
}

/**
 * Recursivamente aplana un objeto, concatenando las claves con el prefijo dado.
 * 
 * @param {string} [prefix=''] - El prefijo que se usará al concatenar las claves.
 * @returns {Object} - Un nuevo objeto con las claves concatenadas.
 */
JSON.flatten = function (obj, notation = '.', prefix = '', flattenLastArray = true) {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + notation : '';
        if (Array.isArray(obj[k])) {
            if (flattenLastArray && typeof obj[k][0] !== 'object') {
                obj[k].forEach((item, i) => {
                    acc[`${pre}${k}[${i}]`] = item;
                });
            } else {
                acc[pre + k] = obj[k];
            }
        } else if (typeof obj[k] === 'object' && obj[k] !== null) {
            Object.assign(acc, JSON.flatten(obj[k], notation, pre + k, flattenLastArray));
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
JSON.unflatten = function (obj, notation = '.') {
    let result = {};
    for (let key in obj) {
        let keys = key.split(notation);
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
JSON.take = function (obj, quantity) {
    return obj.slice(0, quantity);
}