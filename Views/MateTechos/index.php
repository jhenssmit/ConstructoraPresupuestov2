<?php
include "Views/Templates/header.php"; ?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Materiales Techos</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="frmMatePiso();"><i class="fas fa-plus"></i></button>
<table class="table table-light" id="tblMateTecho">
    <thead class="thead-dark">
        <tr>
            <th>Elemento</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>PrecioBajo</th>
            <th>PrecioMedio</th>
            <th>PrecioAlto</th>
            <th>Estado</th>
            <th></th>
            <th hidden></th>
            <th hidden></th>
            <th hidden></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="nuevo_matepiso" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="title">Nuevo Material</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <div class="modal-body">
                <form method="post" id="frmMatePiso">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="hidden" id="id" name="id">
                        <input value="2" type="hidden" id="id_elemento" name="id_elemento">
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre del Material">
                    </div>
                    <div class="form-group">
                        <label for="cantidad">Cantidad</label>
                        <input id="cantidad" class="form-control" type="text" name="cantidad" placeholder="cantidad">
                    </div>
                    <div class="form-group">
                        <label for="precioBajo">Precio Bajo</label>
                        <input id="precioBajo" class="form-control" type="text" name="precioBajo" placeholder="precioBajo">
                    </div>
                    <div class="form-group">
                        <label for="precioMedio">Precio Medio</label>
                        <input id="precioMedio" class="form-control" type="text" name="precioMedio" placeholder="precioMedio">
                    </div>
                    <div class="form-group">
                        <label for="precioAlto">Precio Alto</label>
                        <input id="precioAlto" class="form-control" type="text" name="precioAlto" placeholder="precioAlto">
                    </div><br>
                    <button class="btn btn-primary" type="button" onclick="RegistrarMatePiso(event);" id="btnAction">Registrar</button>
                    <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include "Views/Templates/footer.php"; ?>