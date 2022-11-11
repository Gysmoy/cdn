<?php

/**
 * gJSON es una clase que contiene métodos estáticos que son contenedores
 * para los métodos json_decode y json_encode.
 * 
 * Propiedad de SoDe World
 */
class gJSON
{
    static public function parse(string $text): array
    {
        $array = json_decode($text, true);
        return $array;
    }

    static public function stringify(mixed $object): string
    {
        $string = json_encode($object, JSON_PRETTY_PRINT);
        return $string;
    }

    /**
     * Método que verifica si un string es un JSON válido.
     * @param text - Texto a verificar.
     * @return bool - valor booleano.
     */
    static public function parseable(string $text): bool
    {
        try {
            gJSON::parse($text);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Recibe un objeto y retorna un nuevo objeto con todas las claves aplanadas.
     * @param object - El objeto que va a ser aplanado.
     * @param [prev] - La clave previa.
     * @return array un objeto con las claves y valores del objeto original, pero con las claves aplanadas.
     */
    static public function flatten(mixed $object, $notation = '.', string $prev = ''): array
    {
        $flattened = array();
        foreach ($object as $key => $value) {
            $type = gettype($value);
            if ($type == 'array') {
                $prev_key = $prev ? $prev . $notation . $key : $key;
                $object2 = gJSON::flatten($value, $notation, $prev_key);
                foreach ($object2 as $key2 => $value2) {
                    $flattened[$key2] = $value2;
                }
            } else {
                $prev_key = $prev ? $prev . $notation : '';
                $flattened["$prev_key$key"] = $value;
            }
        }
        return $flattened;
    }

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
                $restored[$key] = gJSON::restore($kv, $notation);
            } else {
                $restored[$key] = $value;
            }
        }
        return $restored;
    }
}
