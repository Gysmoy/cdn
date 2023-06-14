<?php

namespace SoDe\Extend;

class Text
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
        $text = str_replace(' ', ' ', $text);
        $text = trim($text, '\\n');
        $text = trim($text, '\n');
        $text = trim($text, Text::$lineBreak);
        $text = trim($text);
        $text = preg_replace('/^\s+|\s+$/m', '', $text);
        return $text;
    }

    /** 
     * Esta función devuelve una cadena con un salto de línea.
     * 
     * @return string un salto de línea
     */
    static public function lineBreak(?int $repeat = 1): string
    {
        return str_repeat(Text::$lineBreak, $repeat);
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

    /**
     * The "keep" function filters a string to only include specified characters and removes any
     * whitespace.
     * 
     * @param string string The input string that needs to be filtered and returned.
     * @param string characters The characters parameter is a string that contains all the characters
     * that should be kept in the input string. All other characters will be removed.
     * 
     * @return string a string that contains only the characters specified in the ``
     * parameter, with any non-matching characters removed. Additionally, any whitespace characters are
     * removed and the remaining words are concatenated with a single space character between them.
     */
    public static function keep(string $string, string $characters): string
    {
        $regex = '/[^' . preg_quote($characters, '/') . ']/';
        $filteredString = preg_replace($regex, '', $string);
        $wordsArray = preg_split('/\s+/', $filteredString);
        $filteredArray = array_filter($wordsArray, 'strlen');
        $result = implode(' ', $filteredArray);
        return $result;
    }

    /**
     * The function matches a regular expression pattern in a given string and returns the result along
     * with the remaining text.
     * 
     * @param string text The input string that needs to be matched against the regular expression.
     * @param string regex The regular expression pattern to search for in the given text. It is set to
     * '/{{(.+?)}}/' by default, which matches any text enclosed in double curly braces.
     * 
     * @return An array is being returned with three elements:
     */
    public static function match(string $text, string $regex = '/{{(.+?)}}/')
    {
        try {
            $matches = [];

            $found = preg_match($regex, $text, $matches);
            $clean_text = str_replace($matches[0], '', $text);

            return [$found, $matches[1], $clean_text];
        } catch (\Throwable $th) {
            return [false, '', $text];
        }
    }

    /**
     * The function reduces a given string to a specified number of characters and adds ellipsis if the
     * string is longer than the specified number of characters.
     * 
     * @param string string A string of characters that needs to be reduced in length.
     * @param int chars The maximum number of characters that the string should be reduced to.
     * 
     * @return a string that is either the original string passed in, or a shortened version of it with
     * an ellipsis added at the end if the original string was longer than the specified number of
     * characters.
     */
    public static function reduce(string $string, int $chars)
    {
        $text = strval($string);
        if (strlen($text) > $chars) {
            $text = substr($text, 0, $chars - 3) . "...";
        }
        return $text;
    }
}
