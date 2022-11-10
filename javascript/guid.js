/**
 * guid es una clase que genera un id random.
 * 
 * Propiedad de SoDe World
 */
class guid {

    /**
     * Función que genera un id corto
     * @returns una cadena de 8 caracteres.
     */
    static short() {
        var date = new Date().getTime();
        var uuid = 'xxxxxxxx'.replace(/[x]/g, function (c) {
            var r = (date + Math.random() * 16) % 16 | 0;
            date = Math.floor(date / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * Función que genera un id largo
     * @returns una cadena de 36 caracteres.
     */
    static long() {
        var date = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
            var r = (date + Math.random() * 16) % 16 | 0;
            date = Math.floor(date / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * Recibe un string de caracteres 'x' y los reemplaza por un caracter
     * hexadecimal random.
     * @param any - Parámetro que recibe la función. Puede ser number o string.
     * @returns Una cadena de caracteres aleatorios.
     */
    static any(any) {
        let format = any;
        if (typeof any == 'number') {
            format = 'x'.repeat(any);
        }
        var date = new Date().getTime();
        var uuid = format.replace(/[x]/g, function (c) {
            var r = (date + Math.random() * 16) % 16 | 0;
            date = Math.floor(date / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}

console.log(guid.long())