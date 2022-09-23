class gJSON {
    static parse(text) {
        return JSON.parse(text);
    }

    static stringify(object) {
        return JSON.stringify(object);
    }

    static parseable(value) {
        try {
            JSON.parse(value);
            return true;
        } catch (error) {
            return false;
        }
    }

    static stringifyable(value) {
        try {
            JSON.stringify(value);
            return true;
        } catch (error) {
            return false;
        }
    }
}