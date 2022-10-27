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
     * Toma un blob, crea una imagen a partir de él, crea dos lienzos a partir de
     * la imagen y devuelve los datos codificados en base64 de los lienzos.
     * 
     * La función ejecuta un callback o retorna (con await):
     * @returns { ok, image_type, image_full, image_mini }
     */
    static async compress({
        blob,
        full_length = 1000,
        mini_length = 100,
        callback = () => { }
    }) {
        let ok = true;
        let image_type = blob.type;
        let image_full = null;
        let image_mini = null;

        try {
            let image = new Image();
            image.width = full_length;
            image.height = full_length;
            image.src = await this.blobToBase64(blob);
            image.style.objectFit = 'cover';
            image.style.objectPosition = 'center center';
            await image.onload;

            let canvas_full = document.createElement('canvas');
            canvas_full.width = full_length;
            canvas_full.height = full_length;
            canvas_full.style.objectFit = 'cover';
            canvas_full.style.objectPosition = 'center center';

            let ctx_full = canvas_full.getContext('2d');
            ctx_full.drawImage(image, 0, 0, full_length, full_length);

            image_full = canvas_full.toDataURL(image_type).split(',')[1];

            let canvas_mini = document.createElement('canvas');
            canvas_mini.width = mini_length;
            canvas_mini.height = mini_length;

            let ctx_mini = canvas_mini.getContext('2d');
            ctx_mini.drawImage(image, 0, 0, mini_length, mini_length);

            image_mini = canvas_mini.toDataURL(image_type).split(',')[1];
        } catch (error) {
            console.error(error);
            ok = false;
        } finally {
            callback({ ok, image_type, image_full, image_mini });
            return { ok, image_type, image_full, image_mini };
        }
    }
}
