/**
 * La clase Cookies proporciona métodos para configurar, obtener, eliminar y
 * destruir cookies en un navegador web.
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class Cookies {
    /**
     * La función establece una cookie con un nombre dado, un valor y una
     * fecha de caducidad (7 días por defecto) en el documento.
     * @param name - El nombre de la cookie que se establecerá.
     * @param value - El valor que se almacenará en la cookie.
     * @param [days = 7] - El número de días hasta que caduque la cookie. Si
     * no se especifica, el valor predeterminado es 7 días.
     */
    static set(name, value, days = false) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    /**
     * Esta función recupera el valor de una cookie por su nombre.
     * @param name - El nombre de la cookie que debe recuperarse.
     * @returns El método `get` devuelve el valor de la cookie con el nombre
     * especificado si existe, y `undefined` si no existe.
     */
    static get(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1, cookie.length);
            }
        }
        return undefined;
    }

    /**
     * Esta función recupera todas las cookies y las devuelve como un objeto.
     * @returns La función `getAll()` devuelve un objeto que contiene todas
     * las cookies configuradas actualmente en el documento, donde los nombres
     * de las cookies son las claves y los valores de las cookies son los
     * valores.
     */
    static getAll() {
        const cookies = document.cookie.split(';');
        const result = {};
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const name = cookie.split('=')[0];
            result[name] = cookie.substring(name.length + 1, cookie.length);
        }
        return result;
    }

    /**
     * La función elimina una cookie estableciendo su valor en una cadena
     * vacía y estableciendo su fecha de caducidad en una fecha pasada.
     * @param name - El parámetro de nombre es una cadena que representa el
     * nombre de la cookie que debe eliminarse.
     */
    static delete(name) {
        Cookies.set(name, '', -1);
    }

    /**
     * Esta función elimina todas las cookies almacenadas en el navegador.
     */
    static destroy() {
        const cookies = Cookies.getAll();
        for (const name in cookies) {
            Cookies.delete(name);
        }
    }
}
