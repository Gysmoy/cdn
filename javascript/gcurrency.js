class gNumber {

    static Unidades = (num) => {
        switch (num) {
            case 1: return "UN";
            case 2: return "DOS";
            case 3: return "TRES";
            case 4: return "CUATRO";
            case 5: return "CINCO";
            case 6: return "SEIS";
            case 7: return "SIETE";
            case 8: return "OCHO";
            case 9: return "NUEVE";
        }
        return "";
    }

    static Decenas = (num) => {
        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0: return "DIEZ";
                    case 1: return "ONCE";
                    case 2: return "DOCE";
                    case 3: return "TRECE";
                    case 4: return "CATORCE";
                    case 5: return "QUINCE";
                    default: return "DIECI" + Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0: return "VEINTE";
                    default: return "VEINTI" + Unidades(unidad);
                }
            case 3: return DecenasY("TREINTA", unidad);
            case 4: return DecenasY("CUARENTA", unidad);
            case 5: return DecenasY("CINCUENTA", unidad);
            case 6: return DecenasY("SESENTA", unidad);
            case 7: return DecenasY("SETENTA", unidad);
            case 8: return DecenasY("OCHENTA", unidad);
            case 9: return DecenasY("NOVENTA", unidad);
            case 0: return Unidades(unidad);
        }
    }

    static DecenasY = (strSin, numUnidades) => {
        if (numUnidades > 0)
            return strSin + " Y " + Unidades(numUnidades)

        return strSin;
    }

    static Centenas = (num) => {

        centenas = Math.floor(num / 100);
        decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return "CIENTO " + Decenas(decenas);
                return "CIEN";
            case 2: return "DOSCIENTOS " + Decenas(decenas);
            case 3: return "TRESCIENTOS " + Decenas(decenas);
            case 4: return "CUATROCIENTOS " + Decenas(decenas);
            case 5: return "QUINIENTOS " + Decenas(decenas);
            case 6: return "SEISCIENTOS " + Decenas(decenas);
            case 7: return "SETECIENTOS " + Decenas(decenas);
            case 8: return "OCHOCIENTOS " + Decenas(decenas);
            case 9: return "NOVECIENTOS " + Decenas(decenas);
        }

        return Decenas(decenas);
    }

    static Seccion = (num, divisor, strSingular, strPlural) => {
        cientos = Math.floor(num / divisor)
        resto = num - (cientos * divisor)

        letras = "";

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + " " + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += "";

        return letras;
    }

    static Miles = (num) => {
        divisor = 1000;
        cientos = Math.floor(num / divisor)
        resto = num - (cientos * divisor)

        strMiles = Seccion(num, divisor, "UN MIL", "MIL");
        strCentenas = Centenas(resto);

        if (strMiles == "")
            return strCentenas;

        return strMiles + " " + strCentenas;
    }

    static Millones = (num) => {
        divisor = 1000000;
        cientos = Math.floor(num / divisor)
        resto = num - (cientos * divisor)

        strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
        strMiles = Miles(resto);

        if (strMillones == "")
            return strMiles;

        return strMillones + " " + strMiles;
    }

    static ToString = (number, currency = 'SOL') => {
        var data = {
            number: number,
            integers: Math.floor(number),
            centavos: (((Math.round(number * 100)) - (Math.floor(number) * 100))),
            letrasCentavos: "",
            currency: {
                singular: currency,
                plural: currency + ['a', 'e', 'i', 'o', 'u'].includes(currency.charAt(currency.substring(-1))) ? 'S': 'ES'
            }
        };

        if (data.centavos > 0)
            data.letrasCentavos = "CON " + data.centavos + "/100";

        if (data.integers == 0)
            return "CERO " + data.currency.plural + " " + data.letrasCentavos;
        if (data.integers == 1)
            return Millones(data.integers) + " " + data.currency.singular + " " + data.letrasCentavos;
        else
            return Millones(data.integers) + " " + data.currency.plural + " " + data.letrasCentavos;
    }
}