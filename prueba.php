<?php
$api_key = 'TU_API_KEY'; // Reemplazar 'TU_API_KEY' con tu propia clave API
$query = 'NOMBRE_DE_LA_CANCION'; // Reemplazar 'NOMBRE_DE_LA_CANCION' con el nombre de la canción que deseas buscar

$url = 'https://api.lolhuman.xyz/api/ytplay2?apikey='.$api_key.'&query='.urlencode($query); // Construir la URL de la API con la clave API y la consulta de búsqueda

$ch = curl_init(); // Inicializar la solicitud Curl
curl_setopt($ch, CURLOPT_URL, $url); // Establecer la URL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Configurar la opción para devolver el resultado de la solicitud como una cadena
$response = curl_exec($ch); // Ejecutar la solicitud y almacenar la respuesta en una variable
curl_close($ch); // Cerrar la solicitud Curl

$response_array = json_decode($response, true); // Convertir la respuesta JSON en un array asociativo de PHP

echo $response;

if(isset($response_array['result'][0]['link'])){ // Verificar si se encontró un video y obtener su URL de reproducción
    $video_url = $response_array['result'][0]['link'];
    echo $video_url; // Imprimir la URL del video de YouTube
} else {
    echo 'No se encontró ningún video.'; // Imprimir un mensaje de error si no se encontró ningún video
}
?>