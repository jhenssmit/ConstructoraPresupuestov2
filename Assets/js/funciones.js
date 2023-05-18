let tblUsuarios, tblMatePiso, tblMatePared, tblMateTecho;
var formularioDatos = {};
document.addEventListener("DOMContentLoaded", function () {
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + "Usuarios/listar",
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'usuario' },
            { data: 'nombre' },
            { data: 'rol' },
            { data: 'estado' },
            { data: 'acciones' }
        ]
    });
    //fin de la tabla Usuarios
    tblMatePiso = $('#tblMatePiso').DataTable({
        ajax: {
            url: base_url + "MatePisos/listar",
            dataSrc: ''
        },
        columns: [
            { data: 'id_elemento' },
            { data: 'nombre' },
            { data: 'cantidad' },
            { data: 'precioBajo' },
            { data: 'precioMedio' },
            { data: 'precioAlto' },
            { data: 'estado' },
            { data: 'acciones' },
            { data: 'totalBajo', visible: false },
            { data: 'totalMedio', visible: false },
            { data: 'totalAlto', visible: false },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary" onclick="enviarFormulario4(\'' + row.nombre + '\', \'' + row.cantidad + '\', \'' + row.precioBajo + '\', \'' + row.precioMedio + '\', \'' + row.precioAlto + '\', \'' + row.totalBajo + '\', \'' + row.totalMedio + '\', \'' + row.totalAlto + '\')">Seleccionar</button>';
                }
            },

        ]
    });
    //fin de la tabla Pisos
    tblMatePared = $('#tblMatePared').DataTable({
        ajax: {
            url: base_url + "MateParedes/listar",
            dataSrc: ''
        },
        columns: [
            { data: 'id_elemento' },
            { data: 'nombre' },
            { data: 'cantidad' },
            { data: 'precioBajo' },
            { data: 'precioMedio' },
            { data: 'precioAlto' },
            { data: 'estado' },
            { data: 'acciones' },
            { data: 'totalBajo', visible: false },
            { data: 'totalMedio', visible: false },
            { data: 'totalAlto', visible: false },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary" onclick="enviarFormulario2(\'' + row.nombre + '\', \'' + row.cantidad + '\', \'' + row.precioBajo + '\', \'' + row.precioMedio + '\', \'' + row.precioAlto + '\', \'' + row.totalBajo + '\', \'' + row.totalMedio + '\', \'' + row.totalAlto + '\')">Seleccionar</button>';
                }
            },
        ]
    });
    //fin de la tabla Paredes
    tblMateTecho = $('#tblMateTecho').DataTable({
        ajax: {
            url: base_url + "MateTechos/listar",
            dataSrc: ''
        },
        columns: [
            { data: 'id_elemento' },
            { data: 'nombre' },
            { data: 'cantidad' },
            { data: 'precioBajo' },
            { data: 'precioMedio' },
            { data: 'precioAlto' },
            { data: 'estado' },
            { data: 'acciones' },
            { data: 'totalBajo', visible: false },
            { data: 'totalMedio', visible: false },
            { data: 'totalAlto', visible: false },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary" onclick="enviarFormulario1(\'' + row.nombre + '\', \'' + row.cantidad + '\', \'' + row.precioBajo + '\', \'' + row.precioMedio + '\', \'' + row.precioAlto + '\', \'' + row.totalBajo + '\', \'' + row.totalMedio + '\', \'' + row.totalAlto + '\')">Seleccionar</button>';
                }
            },
        ]
    });
    //fin de la tabla Techos
})

function frmUsuario() {
    document.getElementById("title").innerHTML = "Nuevo Usuario";
    document.getElementById("btnAction").innerHTML = "Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo_usuario").modal("show");
    document.getElementById("id").value = "";
}
function RegistrarUser(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    const rol = document.getElementById("rol");
    if (usuario.value == "" || nombre.value == "" || rol.value == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "Usuarios/registrar";
        const frm = document.getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario creado exitosamente',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else if (res == "modificar") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario Modificado exitosamente',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarUser(id) {
    document.getElementById("title").innerHTML = "Actualizar Usuario";
    document.getElementById("btnAction").innerHTML = "Modificar";
    const url = base_url + "Usuarios/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            console.log(res);
            document.getElementById("id").value = res.id;
            document.getElementById("usuario").value = res.usuario;
            document.getElementById("nombre").value = res.nombre;
            document.getElementById("rol").value = res.id_rol;
            document.getElementById("claves").classList.add("d-none");
            $("#nuevo_usuario").modal("show");
        }
    }
}
function btnEliminarUser(id) {
    Swal.fire({
        title: '¿Estás seguro de eliminar?',
        text: "El usuario no se eliminara de forma permanente, solo cambiara de estado inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("title").innerHTML = "Actualizar Usuario";
            document.getElementById("btnAction").innerHTML = "Modificar";
            const url = base_url + "Usuarios/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'El usuario se inhabilito con éxito',
                            'success'
                        )
                        tblUsuarios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'success'
                        )
                    }
                }
            }

        }
    })
}
function btnReingresarUser(id) {
    Swal.fire({
        title: '¿Estás seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("title").innerHTML = "Actualizar Usuario";
            document.getElementById("btnAction").innerHTML = "Modificar";
            const url = base_url + "Usuarios/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'El usuario se reingreso con éxito',
                            'success'
                        )
                        tblUsuarios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'success'
                        )
                    }
                }
            }

        }
    })
}

//fin usuario

function frmMatePiso() {
    document.getElementById("title").innerHTML = "Nuevo Material";
    document.getElementById("btnAction").innerHTML = "Registrar";
    document.getElementById("frmMatePiso").reset();
    document.getElementById("id").value = "";
    $("#nuevo_matepiso").modal("show");
}
function RegistrarMatePiso(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const cantidad = document.getElementById("cantidad");
    const precioBajo = document.getElementById("precioBajo");
    const precioMedio = document.getElementById("precioMedio");
    const precioAlto = document.getElementById("precioAlto");
    const id_elemento = document.getElementById("id_elemento");
    if (nombre.value == "" || cantidad.value == "" || precioBajo.value == "" || precioMedio.value == "" || precioAlto.value == "" || id_elemento.value == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "MatePisos/registrar";
        const frm = document.getElementById("frmMatePiso");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Material creado exitosamente',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_matepiso").modal("hide");
                    tblMatePiso.ajax.reload();
                    tblMatePared.ajax.reload();
                    tblMateTecho.ajax.reload();
                } else if (res == "modificar") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Material Modificado exitosamente',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_matepiso").modal("hide");
                    tblMatePiso.ajax.reload();
                    tblMatePared.ajax.reload();
                    tblMateTecho.ajax.reload();
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarMatePiso(id) {
    document.getElementById("title").innerHTML = "Actualizar Material";
    document.getElementById("btnAction").innerHTML = "Modificar";
    const url = base_url + "MatePisos/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            console.log(res);
            document.getElementById("id").value = res.id;
            document.getElementById("nombre").value = res.nombre;
            document.getElementById("cantidad").value = res.cantidad;
            document.getElementById("precioBajo").value = res.precioBajo;
            document.getElementById("precioMedio").value = res.precioMedio;
            document.getElementById("precioAlto").value = res.precioAlto;
            $("#nuevo_matepiso").modal("show");
        }
    }
}
function btnEliminarMatePiso(id) {
    Swal.fire({
        title: '¿Estás seguro de eliminar?',
        text: "El Material no se eliminara de forma permanente, solo cambiara de estado inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("title").innerHTML = "Actualizar Material";
            document.getElementById("btnAction").innerHTML = "Modificar";
            const url = base_url + "MatePisos/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'El Material se inhabilito con éxito',
                            'success'
                        )
                        tblMatePiso.ajax.reload();
                        tblMatePared.ajax.reload();
                        tblMateTecho.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'success'
                        )
                    }
                }
            }

        }
    })
}
function btnReingresarMatePiso(id) {
    Swal.fire({
        title: '¿Estás seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "MatePisos/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'El usuario se reingreso con éxito',
                            'success'
                        )
                        tblMatePiso.ajax.reload();
                        tblMatePared.ajax.reload();
                        tblMateTecho.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'success'
                        )
                    }
                }
            }

        }
    })
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}


//funciones para agregar los datos de los materiales a la proforma Piso
function enviarFormulario4(nombre, cantidad, precioBajo, precioMedio, precioAlto, totalBajo, totalMedio, totalAlto) {
    // Obtener los datos previamente seleccionados desde la cookie
    let datosSeleccionados = [];
    if (document.cookie.includes('formularioDatos4')) {
        datosSeleccionados = JSON.parse(getCookie('formularioDatos4'));
    }

    // Agregar los nuevos datos seleccionados al arreglo
    datosSeleccionados.push({
        nombre: nombre,
        cantidad: cantidad,
        precioBajo: precioBajo,
        precioMedio: precioMedio,
        precioAlto: precioAlto,
        totalBajo: totalBajo,
        totalMedio: totalMedio,
        totalAlto: totalAlto
    });

    // Guardar el arreglo completo en la cookie
    document.cookie = "formularioDatos4=" + JSON.stringify(datosSeleccionados) + "; path=/";

    // Redirigir a la página de materiales pisos
    //window.location.href = 'http://localhost/constructora/PresupuestoPared';
    alert("Se ha agregado el material al presupuesto.");
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function eliminarFila4(nombre) {
    if (!localStorage) {
        console.error("El navegador no soporta localStorage.");
        return;
    }

    var formularioDatos4 = JSON.parse(getCookie('formularioDatos4'));

    if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
        if (formularioDatos4) {
            var index = formularioDatos4.findIndex(function (elemento) {
                return elemento.nombre === nombre;
            });

            if (index !== -1) {
                formularioDatos4.splice(index, 1);
                localStorage.setItem('formularioDatos4', JSON.stringify(formularioDatos4));
                document.cookie = "formularioDatos4=" + JSON.stringify(formularioDatos4) + "; path=/; max-age=3600;";
                document.querySelector("table tbody").deleteRow(index);
                location.reload();
            } else {
                console.error("El elemento con nombre " + nombre + " no existe en el array.");
            }
        } else {
            console.error("El array formularioDatos4 no existe o es null.");
        }
    }
}

//funciones para agregar los datos de los materiales a la proforma Techo
function enviarFormulario1(nombre, cantidad, precioBajo, precioMedio, precioAlto, totalBajo, totalMedio, totalAlto) {
    // Obtener los datos previamente seleccionados desde la cookie
    let datosSeleccionados = [];
    if (document.cookie.includes('formularioDatos1')) {
        datosSeleccionados = JSON.parse(getCookie('formularioDatos1'));
    }

    // Agregar los nuevos datos seleccionados al arreglo
    datosSeleccionados.push({
        nombre: nombre,
        cantidad: cantidad,
        precioBajo: precioBajo,
        precioMedio: precioMedio,
        precioAlto: precioAlto,
        totalBajo: totalBajo,
        totalMedio: totalMedio,
        totalAlto: totalAlto
    });

    // Guardar el arreglo completo en la cookie
    document.cookie = "formularioDatos1=" + JSON.stringify(datosSeleccionados) + "; path=/";

    // Redirigir a la página de materiales techos
    //window.location.href = 'http://localhost/constructora/PresupuestoPared';
    alert("Se ha agregado el material al presupuesto.");
}


function eliminarFila1(nombre) {
    if (!localStorage) {
        console.error("El navegador no soporta localStorage.");
        return;
    }

    var formularioDatos1 = JSON.parse(getCookie('formularioDatos1'));

    if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
        if (formularioDatos1) {
            var index = formularioDatos1.findIndex(function (elemento) {
                return elemento.nombre === nombre;
            });

            if (index !== -1) {
                formularioDatos1.splice(index, 1);
                localStorage.setItem('formularioDatos1', JSON.stringify(formularioDatos1));
                document.cookie = "formularioDatos1=" + JSON.stringify(formularioDatos1) + "; path=/; max-age=3600;";
                document.querySelector("table tbody").deleteRow(index);
                location.reload();
            } else {
                console.error("El elemento con nombre " + nombre + " no existe en el array.");
            }
        } else {
            console.error("El array formularioDatos1 no existe o es null.");
        }
    }
}

//funciones para agregar los datos de los materiales a la proforma Pared
function enviarFormulario2(nombre, cantidad, precioBajo, precioMedio, precioAlto, totalBajo, totalMedio, totalAlto) {
    // Obtener los datos previamente seleccionados desde la cookie
    let datosSeleccionados = [];
    if (document.cookie.includes('formularioDatos2')) {
        datosSeleccionados = JSON.parse(getCookie('formularioDatos2'));
    }

    // Agregar los nuevos datos seleccionados al arreglo
    datosSeleccionados.push({
        nombre: nombre,
        cantidad: cantidad,
        precioBajo: precioBajo,
        precioMedio: precioMedio,
        precioAlto: precioAlto,
        totalBajo: totalBajo,
        totalMedio: totalMedio,
        totalAlto: totalAlto
    });

    // Guardar el arreglo completo en la cookie
    document.cookie = "formularioDatos2=" + JSON.stringify(datosSeleccionados) + "; path=/";

    // Redirigir a la página de materiales techos
    //window.location.href = 'http://localhost/constructora/PresupuestoTecho';
    alert("Se ha agregado el material al presupuesto.");
}

function eliminarFila2(nombre) {
    if (!localStorage) {
        console.error("El navegador no soporta localStorage.");
        return;
    }

    var formularioDatos2 = JSON.parse(getCookie('formularioDatos2'));

    if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
        if (formularioDatos2) {
            var index = formularioDatos2.findIndex(function (elemento) {
                return elemento.nombre === nombre;
            });

            if (index !== -1) {
                formularioDatos2.splice(index, 1);
                localStorage.setItem('formularioDatos2', JSON.stringify(formularioDatos2));
                document.cookie = "formularioDatos2=" + JSON.stringify(formularioDatos2) + "; path=/; max-age=3600;";
                document.querySelector("table tbody").deleteRow(index);
                location.reload();
            } else {
                console.error("El elemento con nombre " + nombre + " no existe en el array.");
            }
        } else {
            console.error("El array formularioDatos2 no existe o es null.");
        }
    }
}