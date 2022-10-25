/**
 * gClipboard es una clase que sirve para interacciones con el portapapeles
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */

class gClipboard {

    /**
     * Copia el texto del elemento con el atributo g-copy al portapapeles
     * @param pseudo - El elemento del que desea copiar el texto.
     * @param [callback] - La función que se llamará cuando la copia sea exitosa.
     * @param [fallback] - Una función que se llamará si el comando de copia falla.
     */
    static copy = (pseudo, callback = () => { }, fallback = () => { }) => {
        let element = typeof pseudo == 'string' ? document.querySelector(pseudo) : pseudo;
        let g_copy = element.getAttribute('g-copy');
        let span = document.createElement('span');
        span.id = 'g-3d3fb146';
        span.innerText = g_copy;
        document.body.appendChild(span);
        let tocopy = document.getElementById('g-3d3fb146');
        let selection = document.createRange();
        selection.selectNodeContents(tocopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(selection);
        let res = document.execCommand('copy');
        document.body.removeChild(span);
        window.getSelection().removeRange(selection);
        if (res) {
            callback();
        } else {
            fallback();
        }
    }
    
    /**
     * Agrega detectores de eventos al elemento que le pasa, y cuando pega o
     * suelta archivos en ese elemento, llama a la función de devolución de
     * llamada que le pasa y pasa los archivos que pegó o soltó a esa función
     * de devolución de llamada
     * @param pseudo - El elemento al que adjuntar el evento. Puede ser una
     * cadena o un elemento.
     * @param [callback] - La función que se llamará cuando se suelte o pegue
     * un archivo.
     */
    static paste(pseudo, callback = () => { }) {
        let element = typeof pseudo == 'string' ? document.querySelector(pseudo) : pseudo;
        element.addEventListener('paste', function (event) {
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
        })
        element.addEventListener('drop', function (event) {
            event.preventDefault();
            if (event.dataTransfer.items) {
                var items = [...event.dataTransfer.items];
                if (items.length == 0) {
                    callback(null);
                }
                items = items.filter(item => item.kind === 'file');
                if (items.length == 0) {
                    callback(null);
                }
                callback(items.map(item => item.getAsFile()));
            } else {
                callback([...event.dataTransfer.files]);
            }
        })
        element.addEventListener('dragover', function (event) {
            event.preventDefault();
        })
    }
}