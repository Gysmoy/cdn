/**
 * Toma un texto, una expresión regular y una estructura, y devuelve
 * un objeto con las claves de la estructura y las coincidencias de
 * la expresión regular.
 * @param this - El texto a comparar.
 * @param regex - Expresión regular. Ej: /(.*)-(.*):(.*)/
 * @param structure - Claves del objeto. EJ: key1, key2, ...
 * @returns Un objeto con la estructura de "structure".
 */
String.prototype.matchAndCreateObject = function (regex, structure) {
    try {
        let matched = this.match(regex);
        let object = {};

        structure.split(",").forEach((s, i) => {
            object[s.trim()] = matched[i + 1].trim();
        });

        return object;
    } catch (error) {
        return null;
    }
}

/**
 * Divide una cadena en una matriz de cadenas, recorta cada cadena y,
 * opcionalmente, crea un objeto a partir de cada cadena utilizando
 * una expresión regular y una estructura de objeto.
 * @param this - El texto a dividir.
 * @param separator - El separador para dividir el texto por.
 * @param { regex, ... } - Expresión regular. Ej: /(.*)-(.*):(.*)/
 * @param { ..., structure} - Claves del objeto. EJ: key1, key2, ...
 * @returns Una lista cadenas u objetos.
 */
String.prototype.split2 = function (separator, { regex, structure } = {}) {
    let array = this.split(separator);

    return array
        .map(e => {
            if (!regex) {
                return e.trim();
            } else {
                return e.trim().matchAndCreateObject(regex, structure);
            }
        })
        .filter(Boolean);
};