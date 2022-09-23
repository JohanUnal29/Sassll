<?php

$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$mail = $_POST["email"];
$numero = $_POST["numero"];
$direccion = $_POST["direccion"];
$pais = $_POST["pais"];
$ciudad = $_POST["ciudad"];
$departamento = $_POST["departamento"];

$mensaje = "Este mensaje fue enviado por ". $nombre .",\r\n";
$mensaje .= "Su e-mail es: ". $mail ." \r\n";
$mensaje .= "Su número/whatsapp es: ". $numero ." \r\n";
$mensaje .= "Su dirección es: ". $direccion ." \r\n";
$mensaje .= "País: ". $pais ." \r\n";
$mensaje .= "Su ciudad es: ". $ciudad ." \r\n";
$mensaje .= "Su departamento es: ". $departamento ." \r\n";
$mensaje .= "Enviado el: ". date("d/m/y", time());

$para = "johan.ardilah@gmail.com";
$asunto = "Este mail fue enviado desde la pagina Daseinjoyeria.com";

mail($para, $asunto, utf8_decode($mensaje), $header);

header("Location: ../pages/agradecimiento.html");

?>




