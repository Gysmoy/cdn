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
}