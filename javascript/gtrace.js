class gTrace {

    /* Variables privadas. */
    #fullYear;
    #month;
    #day;
    #hours;
    #minutes;
    #seconds;
    #milliseconds;

    /**
     * Toma un objeto con las siguientes propiedades: año completo, mes, día, horas,
     * minutos, segundos, milisegundos.
     * 
     * Luego, la función crea un nuevo objeto de fecha y establece las propiedades
     * del nuevo objeto de fecha en las propiedades del objeto pasado a la función.
     * 
     * Luego, la función establece las propiedades de la clase en las propiedades
     * del nuevo objeto Fecha.
     * 
     * La función luego devuelve la clase.
     * @param {
     *  fullYear = 0,
     *  month = 0,
     *  day = 0,
     *  hours = 0,
     *  minutes = 0,
     *  seconds = 0,
     *  milliseconds = 0
     * }
     */
    constructor({
        fullYear = 0,
        month = 0,
        day = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0,
    } = {}) {
        let date = new Date();

        date.setFullYear(date.getFullYear() + fullYear);
        date.setMonth(date.getMonth() + month);
        date.setDate(date.getDate() + day);
        date.setHours(date.getHours() + hours);
        date.setMinutes(date.getMinutes() + minutes);
        date.setSeconds(date.getSeconds() + seconds);
        date.setMilliseconds(date.getMilliseconds() + milliseconds);

        this.#fullYear = this.#zerofill({ number: date.getFullYear(), integers: 4 });
        this.#month = this.#zerofill({ number: date.getMonth(), integers: 2 });
        this.#day = this.#zerofill({ number: date.getDate(), integers: 2 });
        this.#hours = this.#zerofill({ number: date.getHours(), integers: 2 });
        this.#minutes = this.#zerofill({ number: date.getMinutes(), integers: 2 });
        this.#seconds = this.#zerofill({ number: date.getSeconds(), integers: 2 });
        this.#milliseconds = this.#zerofill({ number: date.getMilliseconds(), integers: 3 });
    }

    /* Un método privado que se utiliza para agregar ceros a la izquierda de un número. */
    #zerofill = ({
        number,
        integers = String(number).length,
        decimals = 0
    }) => {
        var formatted = number.toLocaleString('en', { minimumIntegerDigits: integers, minimumFractionDigits: decimals, useGrouping: false });
        return formatted;
    };

    /**
     * Devuelve una cadena que es una concatenación de la fecha y hora actuales.
     * @returns Una cadena de la fecha y hora actual.
     */
    getTraceId() {
        let traceId = `${this.#fullYear}${this.#month}${this.#day}${this.#hours}${this.#minutes}${this.#seconds}${this.#milliseconds}`;
        return traceId;
    }

    /**
     * La función devuelve una cadena que es una fecha con el formato YYYY-MM-DD HH:MM:SS.
     * @returns La fecha en el formato YYYY-MM-DD HH:MM:SS
     */
    getDate() {
        let date = `${this.#fullYear}-${this.#month}-${this.#day} ${this.#hours}:${this.#minutes}:${this.#seconds}`;
        return date;
    }
}