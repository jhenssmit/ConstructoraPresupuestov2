<?php
class MateParedesModel extends Query
{
    private $nombre, $cantidad, $precioBajo, $precioMedio, $precioAlto, $id, $estado, $id_elemento, $totalBajo, $totalAlto, $totalMedio;
    public function __construct()
    {
        parent::__construct();
    }
    public function getMateParedes()
    {
        $sql = "SELECT m.*, e.nombre as id_elemento FROM materiales m INNER JOIN elementos e WHERE e.id_elemento=m.id_elemento and m.id_elemento=3";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarMatePiso(string $nombre, string $cantidad, string $precioBajo, string $precioMedio, string $precioAlto, string $totalBajo, string $totalMedio, string $totalAlto, string $id_elemento)
    {
        $this->nombre = $nombre;
        $this->cantidad = $cantidad;
        $this->precioBajo = $precioBajo;
        $this->precioMedio = $precioMedio;
        $this->precioAlto = $precioAlto;
        $this->id_elemento = $id_elemento;
        $this->totalBajo = $totalBajo;
        $this->totalMedio = $totalMedio;
        $this->totalAlto = $totalAlto;
        $verificar = "SELECT * FROM Materiales WHERE nombre = '$this->nombre'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO materiales(nombre, cantidad, precioBajo, precioMedio, precioAlto, totalBajo, totalMedio, totalAlto, id_elemento) values (?,?,?,?,?,?,?,?,?)";
            $datos = array($this->nombre, $this->cantidad, $this->precioBajo, $this->precioMedio, $this->precioAlto, $this->totalBajo, $this->totalMedio, $this->totalAlto, $this->id_elemento);
            $data = $this->save($sql, $datos);
            if ($data == 1) {
                $res = "ok";
            } else {
                $res = "error";
            }
        } else {
            $res = "existe";
        }
        return $res;
    }
    public function modificarMatePiso(string $nombre, string $cantidad, string $precioBajo, string $precioMedio, string $precioAlto, string $id_elemento, string $totalBajo, string $totalMedio, string $totalAlto, int $id)
    {
        $this->nombre = $nombre;
        $this->cantidad = $cantidad;
        $this->precioBajo = $precioBajo;
        $this->precioMedio = $precioMedio;
        $this->precioAlto = $precioAlto;
        $this->id_elemento = $id_elemento;
        $this->totalBajo = $totalBajo;
        $this->totalMedio = $totalMedio;
        $this->totalAlto = $totalAlto;
        $this->id = $id;
        $sql = "UPDATE materiales SET nombre = ?, cantidad = ?, precioBajo = ?, precioMedio = ?, precioAlto = ?, id_elemento = ?, totalBajo = ?, totalMedio = ?, totalAlto = ? WHERE id = ?";
        $datos = array($this->nombre, $this->cantidad, $this->precioBajo, $this->precioMedio, $this->precioAlto, $this->id_elemento, $this->totalBajo, $this->totalMedio, $this->totalAlto, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificar";
        } else {
            $res = "error";
        }
        return $res;
    }
    public function editarMatePiso(int $id)
    {
        $sql = "SELECT * FROM materiales WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function accionMatePiso(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE materiales SET estado = ? WHERE id = ?";
        $datos = array($this->estado, $this->id);
        $data = $this->save($sql, $datos);
        return $data;
    }
}
