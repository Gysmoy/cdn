<?php

/**
 * JSON es una clase que contiene métodos estáticos que son contenedores
 * para los métodos json_decode y json_encode.
 * 
 * Propiedad de SoDe World
 */
class JSON
{
    /**
     * El `análisis de función pública estática` es un método que toma
     * una cadena como entrada y devuelve una matriz. Utiliza la función
     * `json_decode` para decodificar la cadena de entrada en una matriz.
     * El segundo parámetro de `json_decode` se establece en `true`
     * para garantizar que la salida sea una matriz asociativa. Luego,
     * el método devuelve la matriz resultante.
     */
    static public function parse(string $text): array
    {
        $array = json_decode($text, true);
        return $array;
    }

    /**
     * La `función pública estática stringify` es un método que toma
     * un objeto como entrada y devuelve una representación de cadena
     * JSON de ese objeto. Utiliza la función `json_encode` para codificar
     * el objeto en una cadena JSON. Si el segundo parámetro `` se
     * establece en `true`, utiliza la opción `JSON_PRETTY_PRINT` para
     * formatear la cadena JSON con sangría y saltos de línea para
     * mejorar la legibilidad. Luego, el método devuelve la cadena
     * JSON resultante.
     */
    static public function stringify(mixed $object, bool $pretty = false): string
    {
        if ($pretty) {
            $string = json_encode($object, JSON_PRETTY_PRINT);
        } else {
            $string = json_encode($object);
        }
        return $string;
    }

    /**
     * El método de `función pública estática analizable` toma un
     * parámetro `` mixto y devuelve un valor booleano. Utiliza la función
     *  `json_decode` para decodificar la cadena JSON y luego verifica
     * si hubo algún error durante el proceso de decodificación usando
     * la función `json_last_error`. Si no hubo ningún error, devuelve
     * `true`, lo que indica que la cadena JSON se puede analizar. De
     * lo contrario, devuelve `falso`.
     */
    static public function parseable(mixed $text): bool
    {
        json_decode($text);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    /**
     * El método `static public function flatten` toma un objeto como
     * entrada y devuelve un nuevo objeto con todas las claves aplanadas.
     * Utiliza array_reduce para iterar a través de cada clave en el
     * objeto de entrada y aplanar recursivamente cualquier matriz u
     * objeto anidado. El parámetro `` especifica el separador que se
     * usará entre las claves planas, mientras que `` permite agregar
     * un prefijo a todas las claves. El parámetro `` determina si la
     * última matriz en una estructura anidada también debe aplanarse
     * o no. El método devuelve el objeto aplanado como una matriz.
     */
    static public function flatten($obj, $notation = '.', $prefix = '', $flattenLastArray = true)
    {
        return array_reduce(array_keys($obj), function ($acc, $k) use ($notation, $prefix, $flattenLastArray, $obj) {
            $pre = strlen($prefix) ? $prefix . $notation : '';
            if (is_array($obj[$k])) {
                if ($flattenLastArray && !is_array($obj[$k][0])) {
                    foreach ($obj[$k] as $i => $item) {
                        $acc[$pre . $k . '[' . $i . ']'] = $item;
                    }
                } else {
                    $acc[$pre . $k] = $obj[$k];
                }
            } else if (is_object($obj[$k])) {
                $acc += JSON::flatten((array) $obj[$k], $notation, $pre . $k, $flattenLastArray);
            } else {
                $acc[$pre . $k] = $obj[$k];
            }
            return $acc;
        }, []);
    }

    /**
     * La función `unflatten` toma una matriz u objeto aplanado y la
     * vuelve a convertir en una matriz u objeto anidado. Lo hace
     * iterando a través de cada clave en la matriz aplanada, dividiéndola
     * en sus claves anidadas usando la notación especificada (el valor
     * predeterminado es ".") y luego creando matrices u objetos anidados
     * según sea necesario para reconstruir la estructura original. Si
     * una clave contiene corchetes (por ejemplo, "foo[0]"), se trata
     * como un índice de matriz y la matriz anidada correspondiente se
     * crea o amplía según sea necesario. La función devuelve la matriz
     * u objeto anidado reconstruido.
     */
    static public function unflatten($obj, $notation = '.')
    {
        $result = [];
        foreach ($obj as $key => $value) {
            $keys = explode($notation, $key);
            $cur = &$result;
            foreach ($keys as $i => $prop) {
                if (strpos($prop, '[') !== false && strpos($prop, ']') === strlen($prop) - 1) {
                    $index = intval(substr($prop, strpos($prop, '[') + 1, -1));
                    $prop = substr($prop, 0, strpos($prop, '['));
                    if (!isset($cur[$prop])) {
                        $cur[$prop] = [];
                    }
                    while (count($cur[$prop]) < $index) {
                        $cur[$prop][] = [];
                    }
                    if ($i === count($keys) - 1) {
                        $cur[$prop][$index] = $value;
                    } else {
                        if (!isset($cur[$prop][$index])) {
                            $cur[$prop][$index] = [];
                        }
                        $cur = &$cur[$prop][$index];
                    }
                } else {
                    if ($i === count($keys) - 1) {
                        $cur[$prop] = $value;
                    } else {
                        if (!isset($cur[$prop])) {
                            $cur[$prop] = [];
                        }
                        $cur = &$cur[$prop];
                    }
                }
            }
            unset($cur);
        }
        return $result;
    }

    /**
     * El método `take` es una función pública estática que toma una
     * matriz `` y una cantidad `` como parámetros. Luego devuelve una
     * nueva matriz que contiene los primeros `` elementos de la matriz
     * original ``. Lo logra mediante el uso de la función `array_slice`,
     * que devuelve una parte de una matriz. En este caso, devuelve
     * los primeros `` elementos del array ``.
     */
    static public function take($obj, $quantity)
    {
        return array_slice($obj, 0, $quantity);
    }
}
