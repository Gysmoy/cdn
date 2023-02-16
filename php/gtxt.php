<?php

class gtxt
{
    /**
     * Verifica si un String comienza con un caracter en especifico.
     *
     * @param string $string El String con el que se va a realizar la verificación.
     * @param string $needle El caracter con el que se va a realizar la comparación.
     * 
     * @return bool Un valor booleano capaz de representar si el string comienza con el caracter especificado.
     */
    static public function startsWith($string, $needle): bool
    {
        return strpos($string, $needle) === 0;
    }

    /**
     * Función para limpiar retornos de línea de una cadena 
     *
     * @param string $text Cadena que será limpiada
     *
     * @return string Cadena limpia
     */
    static public function cleanLineBreak(string $text): string
    {
        $text = trim($text, '
');
        $text = trim($text, '\n');
        $text = trim($text, '\\n');
        return $text;
    }

    /** 
     * Esta función devuelve una cadena con un salto de línea.
     * 
     * @return string un salto de línea
     */
    static public function lineBreak(): string
    {
        return '
';
    }

    /**
     * Separa una cadena de texto en palabras o partes según el separador.
     *
     * @param string $text La cadena a separar.
     * @param string $separator El carácter separador para los elementos del array. (Opcional, por defecto es un espacio en blanco).
     *
     * @return array Un array con las cadenas separadas.
     */
    static public function split(string $text, string $separator = ' '): array
    {
        return explode($separator, $text);
    }
}
