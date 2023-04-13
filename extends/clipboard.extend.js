/**
 * La clase Clipboard sirve para interacciones con el portapapeles
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */

class Clipboard {
    /**
     * Copia el contenido del atributo 'g-copy' de un elemento a la portapapeles
     *
     * @param {string | EventTarget | NodeElement} pseudo El selector CSS o el
     * elemento del cual se copiará el contenido.
     * @param {function(string)} callback Función que se llamará si la copia
     * fue exitosa, se le pasará el texto copiado como argumento.
     * @param {function(Error)} fallback Función que se llamará si la copia falló,
     * se le pasará el error como argumento.
     */
    static copy(pseudo, callback = () => { }, fallback = () => { }) {
        const element = typeof pseudo === 'string' ? document.querySelector(pseudo) : pseudo.target ?? pseudo;
        const g_copy = element.getAttribute('g-copy');

        navigator.clipboard.writeText(g_copy)
            .then(() => {
                callback(g_copy);
            })
            .catch(fallback);
    }

    /**
     * Le permite pegar archivos en un elemento de entrada
     * @param pseudo - El elemento que desea pegar.
     * @param [callback] - La función que se llamará cuando se suelte o pegue
     * un archivo.
     * @param [attrs] - Los atributos que se agregarán al elemento cuando el 
     * usuario arrastre un archivo sobre el elemento.
     * @returns Nothing.
     */
    static paste(pseudo, callback = () => { }, attrs = {}) {
        const element = typeof pseudo === "string" ? document.querySelector(pseudo) : pseudo;

        const defaultAttrs = {};
        for (let key in attrs) {
            let value = element.getAttribute(key);
            defaultAttrs[key] = value;
        }

        function handlePaste(event) {
            let files = event.clipboardData.files;
            if (files.length) {
                event.preventDefault();
                let fileList = [];
                for (let i = 0; i < files.length; i++) {
                    fileList.push(files.item(i));
                }
                callback(fileList);
            } else {
                callback(null);
            }
        }

        function handleDrop(event) {
            event.preventDefault();
            leave();
            let value = element.value;
            element.value = value + event.dataTransfer.getData("text");
            if (event.dataTransfer.items) {
                var items = [...event.dataTransfer.items];
                if (items.length == 0) {
                    callback(null);
                    return;
                }
                items = items.filter((item) => item.kind === "file");
                if (items.length == 0) {
                    callback(null);
                    return;
                }
                callback(items.map((item) => item.getAsFile()));
            } else {
                callback([...event.dataTransfer.files]);
            }
        }

        function handleDragOver(event) {
            event.preventDefault();
            over();
        }

        function handleDragLeave(event) {
            event.preventDefault();
            leave();
        }

        function over() {
            for (let i in attrs) {
                try {
                    element.setAttribute(i, attrs[i]);
                } catch (error) {
                    console.warn(error);
                }
            }
        }

        function leave() {
            for (let i in defaultAttrs) {
                try {
                    element.setAttribute(i, defaultAttrs[i]);
                } catch (error) {
                    console.warn(error);
                }
            }
        }

        element.addEventListener("paste", handlePaste);
        element.addEventListener("drop", handleDrop);
        element.addEventListener("dragover", handleDragOver);
        element.addEventListener("dragleave", handleDragLeave);
    }
}  