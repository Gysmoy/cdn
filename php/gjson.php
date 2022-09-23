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
        $string = json_encode($object);
        return $string;
    }

    /**
     * Método que verifica si un string es un JSON válido.
     * @param text - Texto a verificar.
     * @returns un valor booleano.
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
}
