<?php

class gTrace
{
    static public function getId(): string
    {
        date_default_timezone_set('America/Lima');
        return date('YmdHisu');
    }
    static public function getDate(string $format = 'iso'): string
    {
        date_default_timezone_set('America/Lima');
        switch ($format) {
            case 'mysql':
                return date('Y-m-d H:i:s');
                break;
            case 'iso':
                return date('Y-m-d\TH:i:s\Z');
                break;
            default:
                return date('Y-m-d H:i:s.u');
                break;
        }
    }
}
