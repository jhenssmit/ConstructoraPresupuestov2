<?php
// Obtener los valores del formulario
$idElemento = $_POST['idElemento'];
$nombre = $_POST['nombre'];
$cantidad = $_POST['cantidad'];
$precioBajo = $_POST['precioBajo'];
$precioMedio = $_POST['precioMedio'];
$precioAlto = $_POST['precioAlto'];
$precioBajoT = $_POST['precioBajoT'];
$precioMedioT = $_POST['precioMedioT'];
$precioAltoT = $_POST['precioAltoT'];
$user = $_POST['user'];
$fechaEnv = $_POST['fechaEnv'];

try {
    // Obtener la conexión PDO
    $pdo = new PDO("mysql:host=localhost;dbname=constructora", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Preparar la consulta de inserción
    $stmt = $pdo->prepare("INSERT INTO historial (idElemento, idUser, nomMaterial, cantidad, precioBajoMate, precioMedioMate, precioAltoMate, precioBajoT, precioMedioT, precioAltoT, fechaEnv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    // Ejecutar la inserción para cada conjunto de valores
    foreach ($nombre as $index => $value) {
        $stmt->bindParam(1, $idElemento[$index]);
        $stmt->bindParam(2, $user[$index]);
        $stmt->bindParam(3, $nombre[$index]);
        $stmt->bindParam(4, $cantidad[$index]);
        $stmt->bindParam(5, $precioBajo[$index]);
        $stmt->bindParam(6, $precioMedio[$index]);
        $stmt->bindParam(7, $precioAlto[$index]);
        $stmt->bindParam(8, $precioBajoT[$index]);
        $stmt->bindParam(9, $precioMedioT[$index]);
        $stmt->bindParam(10, $precioAltoT[$index]);
        $stmt->bindParam(11, $fechaEnv[$index]);

        $stmt->execute();
    }
    
    echo "<script>
    alert('Datos insertados correctamente en la base de datos.');
    window.location.href = 'http://localhost/constructora/PresupuestoPisos';
</script>";
  
    exit();
} catch (PDOException $e) {
    echo "Error al insertar los datos en la base de datos: " . $e->getMessage();
}
?>