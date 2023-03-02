/**
 * Crea un objeto a partir de una cadena de texto que coincide con una expresión
 * regular y una estructura de propiedades.
 *
 * @function
 * @memberof String.prototype
 * @param {RegExp} regex - La expresión regular para buscar en la cadena de texto.
 * @param {string} structure - Una cadena de texto con la estructura de propiedades
 * del objeto separadas por comas.
 * @returns {Object|null} - Un objeto con las propiedades especificadas en la
 * estructura o null si no se encuentra una coincidencia.
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
 * Divide una cadena de texto en un arreglo y opcionalmente crea objetos a partir
 * de cada elemento utilizando una expresión regular y una estructura de propiedades.
 *
 * @function
 * @memberof String.prototype
 * @param {string} separator - El separador utilizado para dividir la cadena de
 * texto en un arreglo.
 * @param {object} [options] - Un objeto con opciones adicionales.
 * @param {RegExp} [options.regex] - La expresión regular utilizada para crear un
 * objeto a partir de cada elemento.
 * @param {string} [options.structure] - Una cadena de texto con la estructura de
 * propiedades de cada objeto separadas por comas.
 * @returns {Array} - Un arreglo con los elementos de la cadena de texto y, si se
 * especifica la opción "regex", objetos creados a partir de cada elemento.
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
 * Convierte una cadena de texto en formato CSV en un arreglo de objetos JSON.
 *
 * @function
 * @memberof String.prototype
 * @param {string} [separator=','] - El separador utilizado para separar los campos
 * de la fila.
 * @param {number} [headers_pos=0] - La posición de la fila que contiene los
 * encabezados de las columnas.
 * @returns {Array} - Un arreglo de objetos JSON con los datos del archivo CSV.
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

/**
 * Capitaliza la primera letra de cada palabra de una cadena y deja en mayúscula las
 * palabras que estén separadas por un punto.
 * @method toTitleCase
 * @memberof String.prototype
 * @param {Boolean} [capitalizeSingleWords=true] - Si es verdadero, las palabras con
 * una sola letra también se capitalizarán, de lo contrario, se mantendrán en minúsculas.
 * @returns {string} Cadena con la primera letra de cada palabra en mayúscula y el resto
 * en minúscula.
 * @example
 * var title = "software integration consulting a E.I.R.L";
 * var capitalizedTitle = title.toTitleCase();
 * console.log(capitalizedTitle); // "Software Integration Consulting a E.I.R.L"
*/
String.prototype.toTitleCase = function (capitalizeSingleWords = true) {
    let text = this.toString();
    let lastChar = text.slice(-1);
    if (lastChar === " ") return text;
    text = text.replace(/\b\w/g, l => l.toUpperCase());
    let words = text.split(" ");
    let result = "";
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.includes(".")) {
            result += word + " ";
        } else {
            let capitalize = capitalizeSingleWords || word.length > 1;
            if (capitalize) {
                result += word.charAt(0) + word.slice(1).toLowerCase() + " ";
            } else {
                result += word.toLowerCase() + " ";
            }
        }
    }
    return result.trim();
}