<?php

//Credenciales de la BD

define('DB_HOST', 'localhost');
define('DB_USUARIO', 'root');
define('DB_PASSWORD', 'root');
define('DB_NOMBRE', 'agendaphp');

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE );

// echo $conn->ping();   Ir a pagina de las credenciales en el navegador (si imprime 1 todo bien =D)
// para corregir posibles fallos a la conexion agregar como 5to dato de conn el puerto al que esta conectado