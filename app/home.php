<?php
session_start();

// Conectar a la base de datos
$mysqli = new mysqli("localhost", "root", "0007", "chatCifrado");

if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

// Comprobar si el usuario está autenticado
if (!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
    header("Location: login.php"); // Redirigir al formulario de inicio de sesión
    exit();
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NetTalk - Private Chat</title>

</head>

    
</head>
<body>

     
</body>
</html>