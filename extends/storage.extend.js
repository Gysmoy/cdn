/**
 * La clase Local proporciona métodos para almacenar, recuperar, eliminar y
 * borrar datos en el almacenamiento local, al tiempo que realiza un seguimiento
 * de los tipos de datos.
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class Local {
    /**
     * La función establece un valor en el almacenamiento local y guarda su tipo
     * de datos.
     * @param name - El nombre de la clave que se establecerá en localStorage.
     * @param value - El valor que se almacenará en el almacenamiento local.
     * Puede ser de cualquier tipo de datos, incluidos objetos y matrices. Se
     * convertirá en una cadena JSON antes de almacenarse en el almacenamiento
     * local.
     */
    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
        Local.storage_types[name] = typeof value;
        Local.saveStorageTypes();
    }

    /**
     * Esta función recupera un valor del almacenamiento local y lo convierte al
     * tipo de datos adecuado.
     * @param name - El nombre del elemento que se va a recuperar de localStorage.
     * @returns El método `get` está devolviendo el valor almacenado en `localStorage`
     * con el `name` dado. El valor devuelto se analiza desde el formato JSON y su
     * tipo se determina en función del objeto `Local.storage_types`. Si el tipo es
     * booleano, numérico o de cadena, el valor se convierte al tipo correspondiente
     * antes de devolverlo. Si el tipo es objeto, el valor analizado se devuelve
     * tal cual es.
     */
    static get(name) {
        const value = JSON.parse(localStorage.getItem(name));
        const type = Local.storage_types[name];
        switch (type) {
            case "boolean":
                return Boolean(value);
            case "number":
                return Number(value);
            case "string":
                return String(value);
            case "object":
                return value;
            default:
                return value;
        }
    }

    /**
     * Esta función recupera todos los pares clave-valor del almacenamiento local y
     * los devuelve como un objeto.
     * @returns Un objeto que contiene todos los pares clave-valor almacenados en
     * localStorage.
     */
    static getAll() {
        const result = {};
        for (let i = 0; i < localStorage.length; i++) {
            const name = localStorage.key(i);
            const value = Local.get(name);
            result[name] = value;
        }
        return result;
    }

    /**
     * La función elimina un elemento del almacenamiento local y lo elimina de la
     * lista de tipos de almacenamiento.
     * @param name - El nombre del elemento que se eliminará del almacenamiento
     * local y de la lista de tipos de almacenamiento.
     */
    static delete(name) {
        localStorage.removeItem(name);
        delete Local.storage_types[name];
        Local.saveStorageTypes();
    }

    /**
     * La función borra el almacenamiento local y restablece los tipos de
     * almacenamiento local.
     */
    static destroy() {
        localStorage.clear();
        Local.storage_types = {};
        Local.saveStorageTypes();
    }

    /**
     * La función guarda los tipos de almacenamiento local como una cadena
     * JSON en el almacenamiento local del navegador.
     */
    static saveStorageTypes() {
        localStorage.setItem("storage_types", JSON.stringify(Local.storage_types));
    }
}

/** 
 * Esta línea de código inicializa el objeto `Local.storage_types` al intentar
 * recuperar la clave `"storage_types"` del `localStorage`. Si la clave existe,
 * su valor se analiza desde una cadena JSON a un objeto y se asigna a
 * `Local.storage_types`. Si la clave no existe, se asigna un objeto vacío a
 * `Local.storage_types`. Este objeto se utiliza para realizar un seguimiento de
 * los tipos de datos de los valores almacenados en `localStorage`.
 */
Local.storage_types = JSON.parse(localStorage.getItem("storage_types")) || {};


/**
 * La clase Session proporciona métodos para almacenar, recuperar, eliminar y
 * borrar datos en el almacenamiento sesión, al tiempo que realiza un seguimiento
 * de los tipos de datos.
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class Session {
    /**
     * Esta función establece un valor en el almacenamiento de la sesión y guarda
     * el tipo de datos del valor.
     * @param name - El nombre de la clave que se establecerá en sessionStorage.
     * @param value - El valor que se almacenará en el almacenamiento de la sesión.
     * Puede ser de cualquier tipo de datos, incluidos objetos y matrices, pero
     * debe convertirse en una cadena mediante JSON.stringify() antes de
     * almacenarse en el almacenamiento de la sesión.
     */
    static set(name, value) {
        sessionStorage.setItem(name, JSON.stringify(value));
        Session.storage_types[name] = typeof value;
        Session.saveStorageTypes();
    }

    /**
     * Esta función recupera un valor del almacenamiento de la sesión y lo convierte
     * al tipo de datos adecuado.
     * @param name - El nombre del elemento que se va a recuperar de sessionStorage.
     * @returns El método `get` está devolviendo el valor almacenado en `sessionStorage`
     * con el `name` dado. El valor devuelto se analiza desde el formato JSON y su
     * tipo se determina en función del objeto `Session.storage_types`. Si el tipo es
     * booleano, numérico o de cadena, el valor se convierte al tipo correspondiente
     * antes de devolverlo. Si el tipo es objeto, el valor analizado se devuelve
     * tal cual es.
     */
    static get(name) {
        const value = JSON.parse(sessionStorage.getItem(name));
        const type = Session.storage_types[name];
        switch (type) {
            case "boolean":
                return Boolean(value);
            case "number":
                return Number(value);
            case "string":
                return String(value);
            case "object":
                return value;
            default:
                return value;
        }
    }

    /**
     * Esta función recupera todos los pares clave-valor de sessionStorage y los
     * devuelve como un objeto.
     * @returns La función `getAll()` devuelve un objeto que contiene todos los pares
     * clave-valor almacenados en `sessionStorage`. Las claves son los nombres de los
     * elementos almacenados y los valores son los valores correspondientes de esos
     * elementos.
     */
    static getAll() {
        const result = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const name = sessionStorage.key(i);
            const value = Session.get(name);
            result[name] = value;
        }
        return result;
    }

    /**
     * La función elimina un elemento del almacenamiento de la sesión y lo elimina de
     * la lista de tipos de almacenamiento.
     * @param name - El nombre del elemento que se eliminará del almacenamiento de
     * la sesión.
     */
    static delete(name) {
        sessionStorage.removeItem(name);
        delete Session.storage_types[name];
        Session.saveStorageTypes();
    }

    /**
     * La función borra el almacenamiento de la sesión y restablece los tipos de
     * almacenamiento.
     */
    static destroy() {
        sessionStorage.clear();
        Session.storage_types = {};
        Session.saveStorageTypes();
    }

    /**
     * La función guarda los tipos de almacenamiento en el almacenamiento de la
     * sesión como una cadena JSON.
     */
    static saveStorageTypes() {
        sessionStorage.setItem("storage_types", JSON.stringify(Session.storage_types));
    }
}

/** 
 * Esta línea de código inicializa el objeto `Session.storage_types` al intentar
 * recuperar la clave `"storage_types"` del `sessionStorage`. Si la clave existe,
 * su valor se analiza desde una cadena JSON a un objeto y se asigna a
 * `Session.storage_types`. Si la clave no existe, se asigna un objeto vacío a
 * `Session.storage_types`. Este objeto se utiliza para realizar un seguimiento de
 * los tipos de datos de los valores almacenados en `sessionStorage`.
 */
Session.storage_types = JSON.parse(sessionStorage.getItem("storage_types")) || {};