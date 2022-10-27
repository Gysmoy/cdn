const zerofill = require("./zerofill");

class gTrace {

    fullYear;
    month;
    day;
    hours;
    minutes;
    seconds;
    milliseconds;

    constructor() {
        let date = new Date();

        this.fullYear = zerofill({ number: date.getFullYear(), integers: 4 });
        this.month = zerofill({ number: date.getMonth(), integers: 2 });
        this.day = zerofill({ number: date.getDate(), integers: 2 });
        this.hours = zerofill({ number: date.getHours(), integers: 2 });
        this.minutes = zerofill({ number: date.getMinutes(), integers: 2 });
        this.seconds = zerofill({ number: date.getSeconds(), integers: 2 });
        this.milliseconds = zerofill({ number: date.getMilliseconds(), integers: 3 });
    }

    getTraceId() {
        let traceId = `${this.fullYear}${this.month}${this.day}${this.hours}${this.minutes}${this.seconds}${this.milliseconds}`;
        return traceId;
    }

    getDate() {
        let date = `${this.fullYear}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}`;
        return date;
    }
}

module.exports = gTrace;