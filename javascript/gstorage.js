/**
 * gStorage te permite almacenar y recuperar cualquier tipo de dato en
 * sessionStorage o localStorage manteniendo la integridad de su valor, si es un
 * objeto devuelve un objeto, si es un booleano devuelve un booleano
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class gStorage {
    /**
     * Función que devuelve una representación de cadena del tipo del valor pasado
     * to it.
     * @param value - El valor que se va a convertir en una cadena.
     * @returns El valor devuelto es el tipo del valor y el valor en sí mismo.
     */
    static #switchset(value) {
        switch (typeof value) {
            case 'undefined':
                return `undefined:${value}`;
            case 'boolean':
                return `boolean:${value}`;
            case 'number':
                return `number:${value}`;
            case 'string':
                return `string:${value}`;
            case 'bigint':
                return `bigint:${value}`;
            case 'object':
                return `object:${JSON.stringify(value)}`;
            default:
                return value;
        }
    }

    /**
     * Toma una cadena y devuelve el valor de la cadena.
     * @param value - El valor a convertir.
     * @returns El valor de la clave.
     */
    static #switchget(value) {
        let kv = String(value).split(':');
        switch (kv[0]) {
            case 'undefined':
                return undefined;
            case 'boolean':
                return value.replace('boolean:', '') == 'true' ? true : false;
            case 'number':
                return Number(value.replace('number:', ''));
            case 'string':
                return value.replace('string:', '');
            case 'bigint':
                return BigInt(value.replace('bigint:', ''));
            case 'object':
                value = value.replace('object:', '');
                return value == 'null' ? null : JSON.parse(value);
            default:
                return value;
        }
    }
    
    /**
     * Le permite almacenar y recuperar cualquier tipo de datos en sessionStorage
     * manteniendo la integridad de su valor, si es objeto, retorna un objeto, si
     * es booleano retorna un booleano
     * @param key - La clave del valor a almacenar.
     * @param value [e7efa9b9-4e0f-0626-5419-6b627e28bbca] - El valor que se
     * almacenará en sessionStorage.
     * @returns El valor de la clave en el sessionStorage.
     */
    static session(key, value = 'e7efa9b9-4e0f-0626-5419-6b627e28bbca') {
        if (value != 'e7efa9b9-4e0f-0626-5419-6b627e28bbca') {
            sessionStorage.setItem(key, this.#switchset(value));
            return;
        } else {
            value = sessionStorage.getItem(key);
            return this.#switchget(value);
        }
    }

    /**
     * Le permite almacenar y recuperar cualquier tipo de datos en localStorage
     * manteniendo la integridad de su valor, si es objeto, retorna un objeto, si
     * es booleano retorna un booleano
     * @param key - La clave del valor a almacenar.
     * @param value [e7efa9b9-4e0f-0626-5419-6b627e28bbca] - El valor que se
     * almacenará en localStorage.
     * @returns The value of the key in localStorage.
     */
    static local(key, value = 'e7efa9b9-4e0f-0626-5419-6b627e28bbca') {
        if (value != 'e7efa9b9-4e0f-0626-5419-6b627e28bbca') {
            localStorage.setItem(key, this.#switchset(value));
            return;
        } else {
            value = localStorage.getItem(key);
            return this.#switchget(value);
        }
    }
}