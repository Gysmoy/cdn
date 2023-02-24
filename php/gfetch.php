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
            CURLOPT_POSTFIELDS => $options['method'] != 'GET' ? json_encode($options['body'] ?? []) : null,
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

$res = new gFetch('http://localhost:8081/rimac/proxy', [
    'method' => 'POST',
    'body' => [
        'url' => 'https://api.lolhuman.xyz/api/ytplay2?apikey=BrunoSobrino&query=avicii without you',
        'options' => [
            'method' => 'GET'
        ]
    ],
    'headers' => [
        'Content-Type: application/json',
        'Accept: application/json'
    ]
]);

$ok = $res->ok;
$status =  $res->status;
$contentType = $res->contentType;
$json = $res->text();

echo "status: {$ok}
status: {$status}
content-type: {$contentType}
json: {$json}
";
