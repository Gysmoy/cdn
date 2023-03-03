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