<?php
//Eliminar
if (isset($_POST['eliminar'])) {
    // Obtener la fecha a eliminar
    $fecha = $_POST['fecha'];

    try {
        // Obtener la conexión PDO
        $pdo = new PDO("mysql:host=localhost;dbname=constructora", "root", "");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Eliminar los registros para la fecha especificada
        $stmt = $pdo->prepare("DELETE FROM historial WHERE fechaEnv = ?");
        $stmt->execute([$fecha]);

        // Redireccionar a la página principal
        header("Location: http://localhost/constructora/HistorialTechos");
        exit();
    } catch (PDOException $e) {
        echo "Error al eliminar los datos de la base de datos: " . $e->getMessage();
    }
}

?>