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
        $headers = [];
        foreach ($options['headers'] as $key => $value) {
            $headers[] = "$key: $value";
        }
        curl_setopt_array($this->curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $options['method'] ?? 'GET',
            CURLOPT_POSTFIELDS => $options['method'] != 'GET' ? json_encode($options['body'] ?? [], JSON_PRETTY_PRINT) : null,
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

$res = new gFetch('https://cotizador-rimac-service-prd-hpo6gn7esq-uc.a.run.app/rimac/cliente/DNI/72941485');

echo $res->ok;
echo $res->status;
echo $res->contentType;
print_r($res->text());
