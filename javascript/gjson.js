/**
 * gJSON es una clase que contiene métodos estáticos que son contenedores
 * para los métodos JSON.parse y JSON.stringify.
 * 
 * Propiedad de SoDe World
 */
class gJSON {
  static parse(text) {
    return JSON.parse(text);
  }

  static stringify(object) {
    return JSON.stringify(object, false, 2);
  }

  /**
   * Método que verifica si un string es un JSON válido.
   * @param text - Texto a verificar.
   * @returns un valor booleano.
   */
  static parseable(text) {
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Recibe un objeto y retorna un nuevo objeto con todas las claves aplanadas.
   * @param object - El objeto que va a ser aplanado.
   * @param [prev] - La clave previa.
   * @returns un objeto con las claves y valores del objeto original, pero con las claves aplanadas.
   */
  static flatten(object, prev = '') {
    let flattened = {};
    for (let key in object) {
      let value = object[key];
      let type = typeof value;
      if (
        type == 'string' ||
        type == 'number' ||
        type == 'boolean' ||
        value == null
      ) {
        let prev_key = prev ? `${prev}.` : '';
        flattened[`${prev_key}${key}`] = value;
      } else {
        let prev_key = prev ? `${prev}.${key}` : key;
        let object2 = this.flatten(value, prev_key);
        for (let key2 in object2) {
          flattened[key2] = object2[key2];
        };
      }
    }
    return flattened;
  }

  /**
   * Recibe un objeto con claves de notación de puntos y devuelve un objeto con claves anidadas.
   * @param object - El objeto a restaurar.
   * @returns un objeto con claves anidadas.
   */
  static restore(object) {
    let restored = {};
    for (let i in object) {
      let key = i;

      if (parseInt(key)) {
        restored = [];
      } else {
        restored = {};
      }

      let keys = key.split('.');
      let value = object[i];
      if (keys.length > 1) {
        let key = keys.shift()
        let newkey = keys.join('.');
        let kv = restored[key] ?? {};
        kv[newkey] = value;
        restored[key] = this.restore(kv);
      } else {
        restored[key] = value;
      }
    }
    return restored;
  }
}