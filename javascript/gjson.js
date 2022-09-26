/**
 * gJSON es una clase que contiene métodos estáticos que son contenedores
 * para los métodos JSON.parse y JSON.stringify.
 * 
 * Propiedad de SoDe World
 */
class gJSON {
    static parse(text) {
        return JSON.parse(text);
    }

    static stringify(object) {
        return JSON.stringify(object);
    }

    /**
     * Método que verifica si un string es un JSON válido.
     * @param text - Texto a verificar.
     * @returns un valor booleano.
     */
    static parseable(text) {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Recibe un objeto y retorna un nuevo objeto con todas las claves aplanadas.
     * @param object - El objeto que va a ser aplanado.
     * @param [prev] - La clave previa.
     * @returns un objeto con las claves y valores del objeto original, pero con las claves aplanadas.
     */
    static flatten(object, prev = '') {
        var flattened = {};
        for (let key in object) {
            var value = object[key];
            var type = typeof value;
            if (
                type == 'string' ||
                type == 'number' ||
                type == 'boolean' ||
                value == null
            ) {
                var prev_key = prev ? `${prev}.` : '';
                flattened[`${prev_key}${key}`] = value;
            } else {
                var prev_key = prev ? `${prev}.${key}` : key;
                var object2 = plainObject(value, prev_key);
                for (let key2 in object2) {
                    flattened[key2] = object2[key2];
                };
            }
        }
        return flattened;
    }
}