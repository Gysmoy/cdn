<?php

namespace App\gLibraries;

class gtxt
{
    static private string $lineBreak = '
';
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
     * Esta función limpia los retornos de línea en una cadena dada.
     *
     * @param string $text La cadena que será limpiada.
     * 
     * @return string Una cadena limpia de retornos de línea.
     */
    static public function cleanLineBreak(string $text): string
    {
        $text = trim($text, '\\n');
        $text = trim($text, '\n');
        $text = trim($text, gtxt::$lineBreak);
        $text = trim($text);
        $text = preg_match('/^\s+|\s+$/m', '', $text);
        return $text;
    }

    /** 
     * Esta función devuelve una cadena con un salto de línea.
     * 
     * @return string un salto de línea
     */
    static public function lineBreak(?int $repeat = 1): string
    {
        return str_repeat(gtxt::$lineBreak, $repeat);
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

    static public function match(string $text, string $regex = '/{{(.+?)}}/') {
        try {
            $matches = [];
    
            $found = preg_match($regex, $text, $matches);
            $clean_text = str_replace($matches[0], '', $text);
    
            return [$found, $matches[1], $clean_text];
        } catch (\Throwable $th) {
            return [false, '', $text];
        }
    }
}