<?php

/**
 * guid es una clase que genera un id random.
 * 
 * Propiedad de SoDe World
 */
class guid
{
    /**
     * Función que genera un id corto
     * @return string - una cadena de 8 caracteres.
     */
    static public function short(): string
    {
        $bytes = openssl_random_pseudo_bytes(4);
        return bin2hex($bytes);
    }

    /**
     * Función que genera un id largo
     * @return string - una cadena de 36 caracteres.
     */
    static public function long(): string
    {
        $c1 = bin2hex(openssl_random_pseudo_bytes(4));
        $c2 = bin2hex(openssl_random_pseudo_bytes(2));
        $c3 = bin2hex(openssl_random_pseudo_bytes(2));
        $c4 = bin2hex(openssl_random_pseudo_bytes(2));
        $c5 = bin2hex(openssl_random_pseudo_bytes(6));

        return "{$c1}-{$c2}-{$c3}-{$c4}-{$c5}";
    }
}