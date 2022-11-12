<?php

class gFetch
{
    private $curl;
    private string $response;
    public bool $ok;
    public string $status;
    public string $contentType;
    function __construct($url, $options = [
        'method' => 'GET',
        'body' => [],
        'headers' => []
    ])
    {
        $this->curl = curl_init();
        curl_setopt_array($this->curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $options['method'] ?? 'GET',
            CURLOPT_POSTFIELDS => json_encode($options['body'] ?? [], JSON_PRETTY_PRINT),
            CURLOPT_HTTPHEADER => $options['headers'],
        ]);
        $this->response = curl_exec($this->curl);
        $this->status = curl_getinfo($this->curl, CURLINFO_RESPONSE_CODE);
        $this->ok = $this->status >= 200 && $this->status < 300 ? true : false;
        $this->contentType = curl_getinfo($this->curl, CURLINFO_CONTENT_TYPE);
    }

    public function text(): string
    {
        return $this->response;
    }
    public function json(): array
    {
        return json_decode($this->response, true);
    }
    public function blob(): string
    {
        return $this->response;
    }
    function __destruct()
    {
        curl_close($this->curl);
    }
}

// $res = new gFetch('https://files.sode.me/api/files', [
//     'method' => 'POST',
//     'body' => [
//         'type' => 'text/plain',
//         'conent' => 'RXN0ZSBlcyB1biBhcmNoaXZvIGRlIHBydWViYSB4RA=='
//     ],
//     'headers' => [
//         'Accept: application/json',
//         'Content-Type: application/json',
//         'SoDe-Auth-Token: ddedb807-8ff9-3c65-6887-c6b69efd28ea',
//         'SoDe-Auth-Service: activity'
//     ]
// ]);

// echo $res->ok;
// echo $res->status;
// echo $res->contentType;
// print_r($res->json());
