const APIURL = "http://localhost:3000/api/notificaciones";

// -------------------------
// Cargar todas las notificaciones
// -------------------------
function cargarNotificaciones() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (datos) {
            const tbody = $("#tablaNotificaciones");
            tbody.empty();

            datos.forEach(n => {
                tbody.append(`
                    <tr>
                        <td>${n.Usuario_Id}</td>
                        <td>${n.Titulo}</td>
                        <td>${n.Mensaje}</td>
                        <td>${n.Tipo}</td>
                        <td>${n.Estado}</td>
                        <td>${new Date(n.Fecha_envio).toLocaleString()}</td>
                        <td>
                            <button class="btn btn-warning btn-sm"
                                onclick="editarNotificacion('${n._id}')">Editar</button>

                            <button class="btn btn-danger btn-sm"
                                onclick="eliminarNotificacion('${n._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (xhr) {
            console.error("ERROR AL CARGAR:", xhr.responseText);
            alert("Error al cargar las notificaciones");
        }
    });
}

// -------------------------
// Crear nueva notificación
// -------------------------
$("#formNotificacion").submit(function (e) {
    e.preventDefault();

    const nueva = {
        Usuario_Id: $("#Usuario_Id").val(),
        Titulo: $("#Titulo").val(),
        Mensaje: $("#Mensaje").val(),
        Tipo: $("#Tipo").val(),
        Estado: $("#Estado").val()
    };

    console.log("OBJETO A ENVIAR:", nueva);

    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(nueva),
        contentType: "application/json",
        processData: false,  // ← OBLIGATORIO PARA QUE FUNCIONE
        success: function () {
            alert("Notificación creada correctamente");
            cargarNotificaciones();
            $("#formNotificacion")[0].reset();
        },
        error: function (xhr) {
            console.error("ERROR AL GUARDAR:", xhr.status, xhr.responseText);
            alert("No se pudo guardar la notificación");
        }
    });
});

// -------------------------
// Editar una notificación
// -------------------------
function editarNotificacion(id) {
    const nuevoEstado = prompt("Ingrese nuevo estado (leída / no leída):");

    if (!nuevoEstado) return;

    $.ajax({
        type: "PUT",
        url: `${APIURL}/${id}`,
        data: JSON.stringify({ Estado: nuevoEstado }),
        contentType: "application/json",
        processData: false,
        success: function () {
            alert("Estado actualizado");
            cargarNotificaciones();
        },
        error: function (xhr) {
            console.error("ERROR AL EDITAR:", xhr.responseText);
            alert("No se pudo actualizar la notificación");
        }
    });
}

// -------------------------
// Eliminar una notificación
// -------------------------
function eliminarNotificacion(id) {
    if (!confirm("¿Eliminar esta notificación?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Notificación eliminada");
            cargarNotificaciones();
        },
        error: function (xhr) {
            console.error("ERROR AL ELIMINAR:", xhr.responseText);
            alert("No se pudo eliminar la notificación");
        }
    });
}

$(document).ready(cargarNotificaciones);
