/**
 * gText es una clase que sirve para manejar textos y realizar acciones de comparación
 * y limpieza de estos a través de sus métodos compare y clean respectivamente.
 * 
 * @Author SoDe World.
 * @Copyright Todos los derechos reservados.
 */
class gText {

    /**
     * Compara dos strings y retorna un porcentaje de cuán similar son.
     * @param text1 - Primer texto a comparar.
     * @param text2 - Texto con el cuál se hará la comparación.
     * @param [minwords=3] - El mínimo número de caracteres que serán
     *        considerados en la comparación.
     * @returns un objeto con las propiedades de la comparación.
     */
    static compare(text1, text2, minwords = 3) {
        let start = new Date().getTime();

        text1 = this.clean(text1);
        text2 = this.clean(text2);

        let array1 = text1.split(' ').filter(Boolean);
        let array2 = text2.split(' ').filter(Boolean);

        let total = (array1.length + array2.length) / 2;
        let coincidences = 0;
        let words = [];

        array1.map((word1) => {
            array2.map((word2) => {
                if (word1 === word2) {
                    coincidences = coincidences + 1;
                    words.push({
                        'word1': word1,
                        'word2': word2,
                        'relation': 'same'
                    });
                } else if (
                    word1.includes(word2) ||
                    word2.includes(word1) &&
                    word1.length >= minwords &&
                    word2.length >= minwords
                ) {
                    let maximo = Math.max(word1.length, word2.length);
                    let minimo = Math.min(word1.length, word2.length);
                    coincidences += minimo / maximo;
                    let palabramin = word1.length < word2.length ? word1 : word2;
                    let palabramax = word1.length > word2.length ? word1 : word2;
                    words.push({
                        'word1': palabramin,
                        'word2': palabramax,
                        'relation': 'in'
                    });
                }
            });
        });

        let percent = coincidences / total;
        let end = new Date().getTime();
        let time = end - start;

        let response = {
            accuracy: {
                atLeastOne: percent > 0,
                permissive: percent > .25,
                moderate: percent > .5,
                strict: percent > .75,
                exact: percent === 1
            },
            coincidences,
            time,
            percent,
            words
        }

        return response;
    }

    /**
     * Recibe un string, remueve todos los caracteres no alfanuméricos y
     * reemplaza los acentados con caracteres normales.
     * @param text - Texto que se va a limpiar.
     * @returns un texto limpio de caracteres no alfanuméricos y acentos.
     */
    static clean(text) {
        let especial_chars = [
            "Ã", "À", "Á", "Ä", "Â",
            "Ẽ", "È", "É", "Ë", "Ê",
            "Ĩ", "Ì", "Í", "Ï", "Î",
            "Õ", "Ò", "Ó", "Ö", "Ô",
            "Ũ", "Ù", "Ú", "Ü", "Û",
            "Ñ", "Ç"
        ];
        let normal_chars = [
            "A", "A", "A", "A", "A",
            "E", "E", "E", "E", "E",
            "I", "I", "I", "I", "I",
            "O", "O", "O", "O", "O",
            "U", "U", "U", "U", "U",
            "N", "C"
        ];
        text = text.toUpperCase();
        text = text.replace(/[^A-Z0-9 ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇ]/gi, '');
        for (let i = 0; i < especial_chars.length; i++) {
            text = text.replaceAll(especial_chars[i], normal_chars[i]);
        }
        let clean = text.split(' ').filter(Boolean).join(' ');
        return clean;
    }

    /**
     * Si el texto es null o vacío, retorna true. De lo contrario, restorna false.
     * @param text - Texto a verificar.
     * @returns un booleano.
     */
    static nullOrEmpty(text) {
        text = String(text);
        if (text == 'null' || text.trim() == '') {
            return true;
        }
        return false;
    }
}