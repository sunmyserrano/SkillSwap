const APIURL = "http://localhost:4000/api/usuarios";

// ======================================================
// CARGAR DATOS
// ======================================================
function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseUsuarios) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseUsuarios.forEach(usuario => {
                tbody.append(`
                    <tr>
                        <td>${usuario.rol_id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.correo_electronico}</td>
                        <td>${usuario.contrasena}</td>
                        <td>${usuario.telefono}</td>
                        <td>${new Date(usuario.fecha_registro).toLocaleDateString()}</td>
                        <td>${usuario.estado}</td>
                        <td>${usuario.direccion}</td>

                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarUsuario('${usuario._id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}


// ======================================================
// ELIMINAR USUARIO
// ======================================================
function eliminarUsuario(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Usuario eliminado");
            cargarDatos();
        }
    });
}


// ======================================================
// EDITAR USUARIO (Cargar datos en modal)
// ======================================================
function editarUsuario(id) {

    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (usuario) {

            $("#idUsuario").val(id);  // <-- marcar modo edición
            $("#rol_id").val(usuario.rol_id);
            $("#nombre").val(usuario.nombre);
            $("#apellido").val(usuario.apellido);
            $("#correo_electronico").val(usuario.correo_electronico);
            $("#contrasena").val(usuario.contrasena);
            $("#telefono").val(usuario.telefono);
            $("#fecha_registro").val(usuario.fecha_registro.split("T")[0]);
            $("#estado").val(usuario.estado);
            $("#direccion").val(usuario.direccion);

            $(".modal-title").text("Editar Usuario");

            $("#modalId").modal("show");
        }
    });
}


// ======================================================
// GUARDAR O ACTUALIZAR (POST / PUT)
// ======================================================
$("#usuarioFormulario").on("submit", function (e) {
    e.preventDefault();

    let id = $("#idUsuario").val();

    const datos = {
        rol_id: $("#rol_id").val(),
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        correo_electronico: $("#correo_electronico").val(),
        contrasena: $("#contrasena").val(),
        telefono: $("#telefono").val(),
        fecha_registro: $("#fecha_registro").val(),
        estado: $("#estado").val(),
        direccion: $("#direccion").val()
    };

    // SI EDITA → PUT
    if (id) {

        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Usuario actualizado");
                $("#usuarioFormulario")[0].reset();
                $("#idUsuario").val("");
                $("#modalId").modal("hide");
                cargarDatos();
            }
        });

        return;
    }

    // SI ES NUEVO → POST
    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function () {
            alert("Usuario guardado");
            $("#usuarioFormulario")[0].reset();
            $("#modalId").modal("hide");
            cargarDatos();
        }
    });

});

// ======================================================
cargarDatos();
