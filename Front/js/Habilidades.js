const APIURL = "http://localhost:3000/api/Habilidades";


// CARGAR DATOS

function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseHabilidades) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseHabilidades.forEach(Habilidades => {
                tbody.append(`
                    <tr>
                        <td>${Habilidades.Nombre}</td>
                        <td>${Habilidades.Descripcion}</td>
                        <td>${Habilidades.Categoria}</td>
                        <td>${Habilidades.Nivel}</td>
                        <td>${Habilidades.Usuario_Id}</td>

                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarHabilidades('${Habilidades._id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarHabilidades('${Habilidades._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}



// ELIMINAR Habilidades

function eliminarHabilidades(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Habilidades eliminado");
            cargarDatos();
        }
    });
}


// EDITAR Habilidades

function editarHabilidades(id) {

    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (Habilidades) {

            $("#Nombre").val(Habilidades.Nombre);
            $("#Descripcion").val(Habilidades.Descripcion);
            $("#Categoria").val(Habilidades.Categoria);
            $("#Nivel").val(Habilidades.Nivel);
            $("#Usuario_Id").val(Habilidades.Usuario_Id);
            $("#idMongo").val(Habilidades._id);

            $(".modal-title").text("Editar Habilidades");

            $("#modalId").modal("show");
        }
    });
}



// GUARDAR
$("#HabilidadesFormulario").on("submit", function (e) {
    e.preventDefault();

    // Leer valores del formulario (IDs del modal que te propuse)
    const idMongo = $("#idMongo").val(); // si viene vacío => crear; si trae valor => editar

    const datos = {
        Nombre: $("#Nombre").val(),
        Descripcion: $("#Descripcion").val(),
        Categoria: $("#Categoria").val(),
        Nivel: $("#Nivel").val(),
        Usuario_Id: $("#Usuario_Id").val()
    };

    // Validación básica
    if (!datos.Nombre || !datos.Descripcion || !datos.Categoria || !datos.Nivel || !datos.Usuario_Id) {
        alert("Completa todos los campos antes de guardar.");
        return;
    }

    // Función auxiliar para cerrar modal con Bootstrap 5
    function cerrarModal() {
        const modalEl = document.getElementById('modalId');
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
    }

    // Si idMongo tiene valor, es edición -> PUT /api/...
    if (idMongo) {

        $.ajax({
            type: "PUT",
            url: `${APIURL}/${idMongo}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Habilidades actualizado");
                $("#HabilidadesFormulario")[0].reset();
                $("#Usuario_Id").val("");
                $("#modalId").modal("hide");
                cargarDatos();
            }
        });
    }
    else {
        // Si no, es creación -> POST /api/...

        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Habilidades guardado");
                $("#HabilidadesFormulario")[0].reset();
                $("#modalId").modal("hide");
                cargarDatos();
            }
        });
    }

});

// ======================================================
cargarDatos();
