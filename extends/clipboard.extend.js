/**
 * La clase Clipboard sirve para interacciones con el portapapeles
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */

class Clipboard {
    /**
     * Copia el texto del elemento con el atributo g-copy al portapapeles
     * @param pseudo - El elemento del que desea copiar el texto.
     * @param [callback] - La función que se llamará cuando la copia sea exitosa.
     * @param [fallback] - Una función que se llamará si el comando de copia falla.
     */
    static copy(pseudo, callback = () => { }, fallback = () => { }) {
        const element = typeof pseudo === 'string' ? document.querySelector(pseudo) : pseudo;
        const g_copy = element.getAttribute('g-copy');
        const span = document.createElement('span');
        span.innerText = g_copy;
        span.style.opacity = '0';
        span.style.position = 'absolute';
        span.style.top = '-9999px';
        document.body.appendChild(span);
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNode(span);
        selection.removeAllRanges();
        selection.addRange(range);
        let res = false;
        try {
            res = document.execCommand('copy');
        } catch (e) {
            console.error('Error al copiar al portapapeles');
        }
        selection.removeAllRanges();
        document.body.removeChild(span);
        if (res) {
            callback();
        } else {
            fallback();
        }
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