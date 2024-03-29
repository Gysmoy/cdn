/**
 * gImage es una clase que sirve para manejar imágenes, redimencionar y centrar,
 * de este modo se puede tener una miniatura de la imagen, una imagen grande y
 * la imagen original.
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class gImage {
    /**
     * Toma un blob y devuelve una promesa que se resuelve en una cadena base64
     * @param blob - El blob para convertir a base64
     * @returns Una promesa que se resuelve en una cadena base64.
     */
    static blobToBase64 = async (blob, callback = () => { }) => {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Toma un blob y devuelve tres cadenas base64, una para la imagen de tamaño
     * completo, otra para la miniatura y otra para la imagen original.
     * 
     * La función ejecuta un callback o retorna (con await):
     * @returns { ok, image_type, image_full, image_mini, image_real }
     */
    static compress = async ({
        blob,
        full_length = 1000,
        mini_length = 100,
        square = true,
        callback = () => { }
    }) => {
        let ok = true;
        let image_type = blob.type;
        let image_full = null;
        let image_mini = null;
        let image_real = null;

        try {
            let src = await this.blobToBase64(blob);
            let image = new Image();
            image.src = src;
            await image.onload;

            let xcrop = 0;
            let ycrop = 0;
            let original_width = image.width;
            let original_height = image.height;
            let original_length = Math.min(original_width, original_height);

            if (square) {
                xcrop = (original_width - original_length) / 2;
                ycrop = (original_height - original_length) / 2;
                original_width = original_length;
                original_height = original_length;
            }

            let canvas_full = document.createElement('canvas');
            canvas_full.width = full_length;
            canvas_full.height = full_length;
            canvas_full.style.objectFit = 'cover';
            canvas_full.style.objectPosition = 'center center';

            let ctx_full = canvas_full.getContext('2d');
            ctx_full.drawImage(
                image,
                xcrop, ycrop,
                original_width, original_height,
                0, 0,
                full_length, full_length
            );

            image_full = canvas_full.toDataURL(image_type).split(',')[1];

            let canvas_mini = document.createElement('canvas');
            canvas_mini.width = mini_length;
            canvas_mini.height = mini_length;

            let ctx_mini = canvas_mini.getContext('2d');
            ctx_mini.drawImage(
                image,
                xcrop, ycrop,
                original_width, original_height,
                0, 0,
                mini_length, mini_length
            );

            image_mini = canvas_mini.toDataURL(image_type).split(',')[1];

            image_real = src.split(',')[1];
        } catch (error) {
            console.error(error);
            alert(error);
            ok = false;
        } finally {
            callback({ ok, image_type, image_full, image_mini, image_real });
            return { ok, image_type, image_full, image_mini, image_real };
        }
    }
}
