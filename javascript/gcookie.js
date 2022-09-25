/**
 * gCookie es una clase que sirve para manejar cookies y realizar acciones CRUD
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class gCookie {

    /**
     * Obtiene las cookies, las splitea en un array, splitea cada elemento
     * en un objeto de clave valor donde la clave es el nombre de la cookie
     * y el valor es el contenido de la cookie.
     * @returns un objeto con todas las cookies.
     */
    static all() {
        let list = document.cookie.split('; ');
        let cookies = {};
        list.forEach(e => {
            let key_value = e.split('=');
            cookies[key_value[0]] = key_value[1];
        })
        return cookies;
    }

    /**
     * Retorna el valor de una cookie específica, esta cookie es pasada como
     * argumento.
     * @param name - El nombre de la cookie a obtener.
     * @returns el contenido de la cookie solicitada.
     */
    static get(name) {
        return this.all()[name];
    }

    /**
     * Establece una cookie
     * @param name - El nombre de la cookie.
     * @param value - El valor de la cookie.
     */
    static set(name, value) {
        document.cookie = `${name}=${value}; `;
        return true;
    }

    /**
     * Recibe un string o un array de strings, y elimina las cookies con
     * esos nombres, si no se le pasa parámetro entonces elimina todas las
     * cookies.
     * @param [e] - La clave de la cookie que se quiere eliminar.
     */
    static clean(e) {
        let keys = [];
        if (typeof e == 'string') {
            keys.push(e);
        } else if (typeof e == 'object') {
            keys = e;
        } else {
            keys = Object.keys(this.all());
        }
        keys.forEach(key => {
            document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        })
        return true;
    }
}