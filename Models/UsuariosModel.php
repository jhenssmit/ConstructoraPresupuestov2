<?php
class UsuariosModel extends Query
{
    private $usuario, $nombre, $clave, $id_rol, $id, $estado;
    public function __construct()
    {
        parent::__construct();
    }
    public function getUsuario(string $usuario, string $clave)
    {
        $sql = "SELECT * FROM usuarios where usuario = '$usuario' and clave = '$clave'";
        $data = $this->select($sql);
        return $data;
    }
    public function getUsuarios()
    {
        $sql = "SELECT u.*, c.id as id_rol, c.rol FROM usuarios u INNER JOIN roles c WHERE u.id_rol = c.id";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getRoles()
    {
        $sql = "SELECT * FROM roles where estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarUsuario(string $usuario, string $nombre, string $clave, int $id_rol)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->clave = $clave;
        $this->id_rol = $id_rol;
        $verificar = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO usuarios(usuario, nombre, clave, id_rol) values (?,?,?,?)";
            $datos = array($this->usuario, $this->nombre, $this->clave, $this->id_rol);
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
    public function modificarUsuario(string $usuario, string $nombre, int $id_rol, int $id)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->id = $id;
        $this->id_rol = $id_rol;
        $sql = "UPDATE usuarios SET usuario = ?, nombre = ?, id_rol = ? WHERE id = ?";
        $datos = array($this->usuario, $this->nombre, $this->id_rol, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificar";
        } else {
            $res = "error";
        }
        return $res;
    }
    public function editarUsuario(int $id)
    {
        $sql = "SELECT * FROM usuarios WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function accionUsuario(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE usuarios SET estado = ? WHERE id = ?";
        $datos = array($this->estado, $this->id);
        $data = $this->save($sql, $datos);
        return $data;
    } 
    
}
?>