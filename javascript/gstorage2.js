class gStorage {
    static session(key, value = 'e7efa9b9-4e0f-0626-5419-6b627e28bbca') {
        if (value != 'e7efa9b9-4e0f-0626-5419-6b627e28bbca') {
            switch (typeof value) {
                case 'undefined':
                    sessionStorage.setItem(key, `undefined:${value}`);
                    break;
                case 'boolean':
                    sessionStorage.setItem(key, `boolean:${value}`);
                    break;
                case 'number':
                    sessionStorage.setItem(key, `number:${value}`);
                    break;
                case 'string':
                    sessionStorage.setItem(key, `string:${value}`);
                    break;
                case 'bigint':
                    sessionStorage.setItem(key, `bigint:${value}`);
                    break;
                case 'object':
                    sessionStorage.setItem(key, `object:${JSON.stringify(value)}`);
                    break;
                default:
                    sessionStorage.setItem(key, value);
                    break;
            }
            return;
        } else {
            value = sessionStorage.getItem(key);
            let kv = String(value).split(':');
            switch (kv[0]) {
                case 'undefined':
                    return undefined;
                case 'boolean':
                    return value.replace('boolean:', '') == 'true' ? true : false;
                case 'number':
                    return Number(value.replace('number:', ''));
                case 'string':
                    return value.replace('string:', '');
                case 'bigint':
                    return BigInt(value.replace('bigint:', ''));
                case 'object':
                    value = value.replace('object:', '');
                    return value == 'null' ? null : JSON.parse(value);
                default:
                    return value;
            }
        }
    }
}