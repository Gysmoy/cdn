class gCompare {

    constructor(text1, text2, minwords = 3) {
        var start = new Date().getTime();

        var original_array = text1.split(' ').concat(text2.split(' ')).filter(Boolean);

        text1 = this.clean(text1);
        text2 = this.clean(text2);

        var array1 = text1.split(' ').filter(Boolean);
        var array2 = text2.split(' ').filter(Boolean);

        var total = (array1.length + array2.length) / 2;
        var coincidencias = 0;
        var words = [];

        array1.map((palabra1) => {
            array2.map((palabra2) => {
                if (palabra1 === palabra2) {
                    coincidencias++;
                    words.push({
                        'word1': palabra1,
                        'word2': palabra2,
                        'relation': 'same'
                    });
                } else if (
                    palabra1.includes(palabra2) ||
                    palabra2.includes(palabra1) &&
                    palabra1.length >= minwords &&
                    palabra2.length >= minwords
                ) {
                    var maximo = Math.max(palabra1.length, palabra2.length);
                    var minimo = Math.min(palabra1.length, palabra2.length);
                    coincidencias += minimo / maximo;
                    var palabramin = palabra1.length < palabra2.length ? palabra1 : palabra2;
                    var palabramax = palabra1.length > palabra2.length ? palabra1 : palabra2;
                    words.push({
                        'word1': palabramin,
                        'word2': palabramax,
                        'relation': 'similar'
                    });
                }
            });
        });

        var percent = coincidencias / total;
        var end = new Date().getTime();
        var time = end - start;

        this.accuracy = {
            'atLeastOne': percent > 0,
            'permissive': percent > 0.25,
            'moderate': percent > 0.5,
            'strict': percent > 0.75,
            'exact': percent === 1
        };
        this.coincidences = coincidencias;
        this.delay = time;
        this.percent = percent;
        this.words = words;
    }

    clean(cadena) {
        var especial_char = [
            "Ã", "À", "Á", "Ä", "Â",
            "Ẽ", "È", "É", "Ë", "Ê",
            "Ĩ", "Ì", "Í", "Ï", "Î",
            "Õ", "Ò", "Ó", "Ö", "Ô",
            "Ũ", "Ù", "Ú", "Ü", "Û",
            "Ñ", "Ç"
        ];
        var normal_char = [
            "A", "A", "A", "A", "A",
            "E", "E", "E", "E", "E",
            "I", "I", "I", "I", "I",
            "O", "O", "O", "O", "O",
            "U", "U", "U", "U", "U",
            "N", "C"
        ];
        cadena = cadena.toUpperCase();
        cadena = cadena.replace(/[^A-Z0-9 ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇ]/gi, '');
        for (var i = 0; i < especial_char.length; i++) {
            cadena = cadena.replace(especial_char[i], normal_char[i]);
        }
        return cadena.split(' ').filter(Boolean).join(' ');
    }

    compareWord(word1, word2, minlength = 3) {
        return new gCompare(text1, text2, minwords);
    }
}