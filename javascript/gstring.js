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

/**
 * Convierte una cadena CSV en formato JSON.
 *
 * @function
 * @memberof String.prototype
 * @param {string} [separator=','] - El separador de campo utilizado en la cadena CSV.
 * @param {number} [headers_pos=0] - La posición de la fila de encabezado en la cadena CSV.
 * @returns {Array<Object>} - Un array de objetos JSON, donde cada objeto representa una fila de la cadena CSV.
 * @throws {TypeError} - Si la función se llama sobre un valor que no es una cadena.
 */
String.prototype.csvToJson = function (separator = ',', headers_pos = 0) {
    let csv = this.toString();
    const lines = csv.trim().split("\n");
    const headers = lines[headers_pos].split(separator);
    const result = [];
    for (let i = (headers_pos + 1); i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(separator);
        let cursor = 0;
        if (!currentLine.every(c => c === "")) { // Validar si la fila está vacía
            for (let j = 0; j < headers.length; j++) {
                if (currentLine[cursor].startsWith('"')) {
                    let field = currentLine[cursor].substring(1);

                    while (!currentLine[cursor].endsWith('"')) {
                        cursor++;
                        field += `${separator}${currentLine[cursor]}`;
                    }
                    obj[headers[j]] = field.slice(0, -1);
                } else {
                    obj[headers[j]] = currentLine[cursor];
                }
                cursor++;
            }
            result.push(obj);
        }
    }
    return result;
}
