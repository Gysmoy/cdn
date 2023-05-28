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
     * La función toma una cadena en formato JSON y devuelve una matriz.
     * 
     * @param string $text una cadena que contiene datos JSON que deben
     * analizarse en una matriz.
     * 
     * @return array Se devuelve una matriz. La cadena de entrada se
     * analiza como JSON y luego se convierte en una matriz asociativa
     * mediante la función `json_decode()`. La matriz resultante es
     * luego devuelta por la función `parse()`.
     */
    public static function parse(string $text): array
    {
        $array = json_decode($text, true);
        return $array;
    }

    /**
     * La función toma un objeto y devuelve una cadena JSON, con una
     * opción para formatearlo para facilitar la lectura.
     * 
     * @param mixed $object El objeto que se va a convertir en una
     * cadena JSON.
     * @param bool $pretty Un parámetro booleano que determina si la
     * cadena JSON de salida se debe formatear con sangría y saltos
     * de línea para facilitar la lectura (verdadero) o no (falso).
     * 
     * @return string Una representación de cadena del objeto de entrada
     * en formato JSON, con impresión bonita opcional si el segundo
     * argumento se establece en verdadero.
     */
    public static function stringify(mixed $object, bool $pretty = false): string
    {
        if ($pretty) {
            $string = json_encode($object, JSON_PRETTY_PRINT);
        } else {
            $string = json_encode($object);
        }
        return $string;
    }

    /**
     * Esta función de PHP comprueba si un texto dado se puede analizar
     * como JSON y devuelve el JSON analizado o falso.
     * 
     * @param mixed $text El texto de entrada que debe analizarse como
     * JSON.
     * 
     * @return array|false La función `parseable` devuelve una matriz
     * si la entrada `` se puede decodificar correctamente como JSON
     * usando `json_decode()` y `false` en caso contrario.
     */
    public static function parseable(mixed $text): array|false
    {
        $json = json_decode($text, true);
        return (json_last_error() == JSON_ERROR_NONE ? $json : false);
    }

    /**
     * La función aplana una matriz u objeto anidado en una matriz
     * unidimensional con claves generadas utilizando una notación
     * específica.
     * 
     * @param array $obj El objeto que se va a aplanar.
     * @param string $notation El separador utilizado para aplanar las
     * claves de la matriz/objeto. El valor predeterminado es '.' (punto).
     * @param string $prefix El parámetro de prefijo es una cadena que
     * se agrega al comienzo de cada clave plana. Se utiliza para
     * diferenciar entre claves que pueden tener el mismo nombre en
     * matrices u objetos anidados.
     * @param boolean $flattenLastArray Un parámetro booleano que
     * determina si aplanar la última matriz o no. Si se establece en
     * verdadero, y el último elemento de una matriz también es una
     * matriz, se aplanará. Si se establece en false, la última matriz
     * no se aplanará y se incluirá tal cual en la salida aplanada.
     * 
     * @return array una versión simplificada del objeto/matriz de
     * entrada con claves que representan la ruta a cada valor en el
     * objeto/matriz original. La versión aplanada se devuelve como
     * una matriz asociativa.
     */
    public static function flatten($obj, $notation = '.', $prefix = '', $flattenLastArray = true)
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
     * La función deshace una matriz aplanada en una matriz anidada
     * utilizando una notación específica.
     * 
     * @param array $obj El objeto de entrada que necesita desaplanarse.
     * @param string $notation El delimitador utilizado para separar
     * las claves anidadas en las claves del objeto de entrada. De
     * forma predeterminada, se establece en '.' (punto).
     * 
     * @return array una matriz que se ha descompuesto de una matriz
     * aplanada.
     */
    public static function unflatten($obj, $notation = '.')
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
     * La función toma un objeto y una cantidad y devuelve una matriz
     * que contiene los primeros n elementos del objeto.
     * 
     * @param array $obj Se espera que el parámetro del objeto sea una
     * matriz de la que se extraerá una cierta cantidad de elementos.
     * @param int $quantity El número de elementos a tomar desde el
     * principio de la matriz.
     * 
     * @return array una matriz que contiene los primeros elementos de
     * la matriz.
     */
    public static function take(array $obj, int $quantity)
    {
        return array_slice($obj, 0, $quantity);
    }

    /**
     * La función extrae un objeto JSON de una cadena y lo devuelve como
     * un objeto PHP.
     * 
     * @param string $text La cadena de texto de entrada que puede
     * contener datos JSON.
     * 
     * @return array|null un objeto JSON o nulo si el texto de entrada
     * no contiene un objeto JSON válido.
     */
    public static function getJSON(string $text)
    {
        $startIndex = -1;
        $braceCount = 0;
        $bracketCount = 0;

        for ($i = 0; $i < strlen($text); $i++) {
            if ($text[$i] === '{') {
                if ($startIndex === -1) {
                    $startIndex = $i;
                }
                $braceCount++;
            } else if ($text[$i] === '}') {
                $braceCount--;
            } else if ($text[$i] === '[') {
                if ($startIndex === -1) {
                    $startIndex = $i;
                }
                $bracketCount++;
            } else if ($text[$i] === ']') {
                $bracketCount--;
            }

            if ($braceCount === 0 && $bracketCount === 0 && $startIndex !== -1) {
                $json = substr($text, $startIndex, $i - $startIndex + 1);
                try {
                    return json_decode($json);
                } catch (Exception $e) {
                    return null;
                }
            }
        }
        return null;
    }
}