<?php
include "Views/Templates/header.php";


// recuperar los datos de las cookies
$formularioDatos2 = isset($_COOKIE['formularioDatos2']) ? json_decode($_COOKIE['formularioDatos2'], true) : array();



// agregar nuevos datos al array
if(isset($_POST['submit'])) {
    $nuevoDato = array(
        'nombre' => $_POST['nombre'],
        'cantidad' => $_POST['cantidad'],
        'precioBajo' => $_POST['precioBajo'],
        'precioMedio' => $_POST['precioMedio'],
        'precioAlto' => $_POST['precioAlto'],
        'totalBajo' => $_POST['totalBajo'],
        'totalMedio' => $_POST['totalMedio'],
        'totalAlto' => $_POST['totalAlto']
    );
    $formularioDatos2[] = $nuevoDato;

    // guardar los datos en la cookie y localStorage
    setcookie('formularioDatos2', json_encode($formularioDatos2), time() + 3600, '/');
    echo "<script>localStorage.setItem('formularioDatos2', JSON.stringify(" . json_encode($formularioDatos2) . "));</script>";
}


//total de presupuesto

if(empty($_POST['totalPresupuesto1'])) {
  $totalPresupuesto1 = 0;
} else {
  $totalPresupuesto1 = $_POST['totalPresupuesto1'];
}
//mano de obra
if(empty($_POST['totalPresupuesto2'])) {
  $totalPresupuesto2 = 0;
} else {
  $totalPresupuesto2 = $_POST['totalPresupuesto2'];
}

$tablaHTML = ''; // Variable para almacenar el código HTML de la tabla

// Verificar si la clave "usuario" está definida en el array $_COOKIE
if (isset($_COOKIE['usuario'])) {
  // Obtener el usuario almacenado en la cookie
  $usuarioLogeado = $_COOKIE['usuario'];

  // Utilizar el valor del usuario en tu aplicación
  //echo "Usuario logeado: " . $usuarioLogeado;
} else {
  echo "No se ha encontrado el usuario logeado.";
}

// Generar el código HTML de la tabla

$tablaHTML = '<table class="table table-light">
              <thead class="thead-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio Bajo</th>
                  <th>Precio Medio</th>
                  <th>Precio Alto</th>
                </tr>
              </thead>
              <tbody>';

$totalCantidad = 0;
$totalPrecioBajo = 0;
$totalPrecioMedio = 0;
$totalPrecioAlto = 0;
// Iniciar el formulario
$formularioHTML = '<form id="formularioDatos" method="post" action="http://localhost/constructora/Views/historialPared.php">';
//bucle de los datos
foreach ($formularioDatos2 as $key => $data) {
  $precioIndividualBajo = $data['totalBajo'] * $totalPresupuesto1;
  $Cantidad1 = $precioIndividualBajo / $data['precioBajo'];
  $cantidad2 = ceil($Cantidad1) * $data['precioBajo'];
  $precioIndividualMedio = $data['totalMedio'] * $totalPresupuesto1;
  $cantidad3 = ceil($Cantidad1) * $data['precioMedio'];
  $precioIndividualAlto = $data['totalAlto'] * $totalPresupuesto1;
  $cantidad4 = ceil($Cantidad1) * $data['precioAlto'];
  
  $totalCantidad += ceil($Cantidad1);
  $totalPrecioBajo += $cantidad2;
  $totalPrecioMedio += $cantidad3;
  $totalPrecioAlto += $cantidad4;

  $fila = '<tr><td>' . $data['nombre'] . '</td>
                <td>' . ceil($Cantidad1) . '</td>
                <td>S/ ' . number_format($cantidad2, 2) . '</td>
                <td>S/ ' . number_format($cantidad3, 2) . '</td>
                <td>S/ ' . number_format($cantidad4, 2) . '</td>

          </tr>';
  $tablaHTML .= $fila;
  $formularioHTML .= '<input type="hidden" name="nombre[]" value="' . $data['nombre'] . '">';
    $formularioHTML .= '<input type="hidden" name="cantidad[]" value="' . ceil($Cantidad1) . '">';
    $formularioHTML .= '<input type="hidden" name="precioBajo[]" value="' . $cantidad2 . '">';
    $formularioHTML .= '<input type="hidden" name="precioMedio[]" value="' . $cantidad3 . '">';
    $formularioHTML .= '<input type="hidden" name="precioAlto[]" value="' . $cantidad4 . '">';
    $pared = "3";
    $formularioHTML .= '<input type="hidden" name="idElemento[]" value="' . $pared . '">';
    $formularioHTML .= '<input type="hidden" name="precioBajoT[]" value="' . $totalPrecioBajo + $totalPresupuesto2  . '">';
    $formularioHTML .= '<input type="hidden" name="precioMedioT[]" value="' . $totalPrecioMedio+ $totalPresupuesto2  . '">';
    $formularioHTML .= '<input type="hidden" name="precioAltoT[]" value="' . $totalPrecioAlto+ $totalPresupuesto2  . '">';
    $formularioHTML .= '<input type="hidden" name="user[]" value="' .  $usuarioLogeado . '">';
    date_default_timezone_set('America/Lima');
    $formularioHTML .= '<input type="hidden" name="fechaEnv[]" value="' .  date('Y-m-d H:i:s') . '">';
    
}
    
    $formularioHTML .= '<button type="submit">Agregar al Historial</button></form>';
    
$tablaHTML .= '<tfoot>
  <tr>
    <td colspan="2"><strong>Total:</strong></td>
    <td>S/ ' . number_format($totalPrecioBajo + $totalPresupuesto2, 2) . '</td>
    <td>S/ ' . number_format($totalPrecioMedio+ $totalPresupuesto2, 2) . '</td>
    <td>S/ ' . number_format($totalPrecioAlto+ $totalPresupuesto2, 2) . '</td>
  </tr>
</tfoot>';

$tablaHTML .= '</tbody></table>';



?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Presupuesto de Materiales que van en el Pared</li>
</ol>
<?php if (empty($formularioDatos2)): ?>
  <table class="table table-light">
    <thead class="thead-dark">
      <tr>
        <th>Nombre</th>
        <th>Precio Bajo * unidad</th>
        <th>Precio Medio * unidad</th>
        <th>Precio Alto * unidad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="6"><div style="text-align: center; font-size: 30px; color:#1e90ff; font-weight: bold;">No hay datos.</div></td>
      </tr>
    </tbody>
  </table>
<?php else: ?>
  <table class="table table-light">
    <thead class="thead-dark">
      <tr>
        <th>Nombre</th>
        <th>Precio Bajo * unidad</th>
        <th>Precio Medio * unidad</th>
        <th>Precio Alto * unidad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($formularioDatos2 as $key => $data): ?>
        <tr>
          <td><?php echo $data['nombre']; ?></td>
          <td>S/ <?php echo $data['precioBajo']; ?></td>
          <td>S/ <?php echo $data['precioMedio']; ?></td>
          <td>S/ <?php echo $data['precioAlto']; ?></td>
          <td><button class="btn btn-danger" onclick="eliminarFila2('<?php echo $data['nombre']; ?>')">Eliminar</button></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
<?php endif; ?>
<form action="PresupuestoPared" method="post">
  <label for="">Agregar Metraje</label><br>
  <input type="number" step="any" name="totalPresupuesto1" id="totalPresupuesto1" value="<?php echo $totalPresupuesto1 === null ? 0 : $totalPresupuesto1;?>"><br>
  <label for="">Agregar mano de obra</label><br>
  <input type="number" step="any" name="totalPresupuesto2" id="totalPresupuesto2" value="<?php echo $totalPresupuesto2 === null ? 0 : $totalPresupuesto2; ?>">
  <button class="btn btn-primary" type="submit">Actualizar total</button> 
</form><br>
<?php echo $tablaHTML;
echo $formularioHTML;?>


<?php include "Views/Templates/footer.php"; ?>