<?php

/**
 * JSON es una clase que contiene métodos estáticos que son contenedores
 * para los métodos json_decode y json_encode.
 * 
 * Propiedad de SoDe World
 */
class JSON
{

    /* A recursive function that flattens a JSON object. */
    static private function recurse($obj, $current, &$result)
    {
        foreach ($obj as $key => $value) {
            $newKey = $current . "." . $key;
            if ($current == '') {
                $newKey = $key;
            }
            if (is_array($value)) {
                foreach ($value as $index => $item) {
                    if (is_array($item) || is_object($item)) {
                        JSON::recurse($item, $newKey . "[$index]", $result);
                    } else {
                        $result[$newKey . "[$index]"] = $item;
                    }
                }
            } elseif (is_object($value)) {
                JSON::recurse($value, $newKey, $result);
            } else {
                $result[$newKey] = $value;
            }
        }
    }

    static public function parse(string $text): array
    {
        $array = json_decode($text, true);
        return $array;
    }

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
     * Método que verifica si un string es un JSON válido.
     * @param text - Texto a verificar.
     * @return bool - valor booleano.
     */
    static public function parseable(mixed $text): bool
    {
        json_decode($text);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    /**
     * Recibe un objeto y retorna un nuevo objeto con todas las claves aplanadas.
     * @param object - El objeto que va a ser aplanado.
     * @param [prev] - La clave previa.
     * @return array un objeto con las claves y valores del objeto original, pero con las claves aplanadas.
     */
    static public function flatten(mixed $obj): array
    {
        $result = array();
        JSON::recurse($obj, "", $result);
        return $result;
    }

    /* Restoring the flattened object. */
    static public function restore($object, $notation = '.')
    {
        $restored = array();
        foreach ($object as $key => $value) {
            $keys = explode($notation, $key);
            if (count($keys) > 1) {
                $key = array_shift($keys);
                $newkey = implode($notation, $keys);
                $kv = $restored[$key] ?? array();
                $kv[$newkey] = $value;
                $restored[$key] = JSON::restore($kv, $notation);
            } else {
                $restored[$key] = $value;
            }
        }
        return $restored;
    }

    static public function fromXML(string $xml): array
    {
        $xml = preg_replace('/<([a-z]+):([a-z]+)/i', '<$1_$2', $xml);
        $xml = preg_replace('/<\/([a-z]+):([a-z]+)>/i', '</$1_$2>', $xml);

        $xml_object = simplexml_load_string($xml);
        $json_array = json_decode(json_encode($xml_object), true, JSON_THROW_ON_ERROR);

        return $json_array;
    }
}
