<?php

$html = '<style>
* {
    margin: 0;
    padding: 0;
    font-family: "Poppins", sans-serif;
    font-weight: bolder;
}
main {
    width: max-content;
}
fieldset {
    margin: 5px 10px;
    padding: 5px 10px;
    width: 100%;
    border-radius: 10px;
    border: 4px solid #343a40;
}
fieldset legend {
    padding: 4px 8px;
    background-color: #343a40;
    color: #fff;
    border-radius: 5px;
}
table td {
    font-family: "Courier New", Courier, monospace;
    font-weight: bolder;
}
</style>
<main>
<fieldset>
    <legend>Archivos agregados</legend>
    <table style="color: rgba(3, 141, 232, 255)">
        <tr>
            <td>✚</td>
            <td>php\gtrace.php</td>
        </tr>
        <tr>
            <td>✚</td>
            <td>php\gtrace.php</td>
        </tr>
        <tr>
            <td>✚</td>
            <td>php\gtrace.php</td>
        </tr>
    </table>
</fieldset>
<fieldset>
    <legend>Archivos actualizados</legend>
    <table style="color: #343a40">
        <tr>
            <td>✐</td>
            <td>php\gtrace.php</td>
        </tr>
        <tr>
            <td>✐</td>
            <td>php\gtrace.php</td>
        </tr>
        <tr>
            <td>✐</td>
            <td>php\gtrace.php</td>
        </tr>
    </table>
</fieldset>
<fieldset>
    <legend>Archivos eliminados</legend>
    <table style="color: rgba(253, 64, 81, 255)">
        <tr>
            <td>✕</td>
            <td>php\gtrace.php</td>
        </tr>
        <tr>
            <td>✕</td>
            <td>php\gtrace.php</td>
        </tr>
        <tr>
            <td>✕</td>
            <td>php\gtrace.php</td>
        </tr>
    </table>
</fieldset>
</main>';

echo base64_encode($html);
header('Content-Type: text/plain')

?>