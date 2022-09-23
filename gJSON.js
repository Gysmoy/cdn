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
     * Si el texto es parseable, retorna true, de lo contrario, false.
     * @param text - Texto que será parseado.
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
}