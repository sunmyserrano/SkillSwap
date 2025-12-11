const APIURL = "http://localhost:3000/api/notificaciones";

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
        }
    });
}

$("#formNotificacion").submit(function (e) {
    e.preventDefault();

    const nueva = {
        Usuario_Id: $("#Usuario_Id").val(),
        Titulo: $("#Titulo").val(),
        Mensaje: $("#Mensaje").val(),
        Tipo: $("#Tipo").val(),
        Estado: $("#Estado").val()
    };

    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(nueva),
        contentType: "application/json",
        success: function () {
            alert("Notificación creada");
            cargarNotificaciones();
            $("#formNotificacion")[0].reset();
        }
    });
});

function editarNotificacion(id) {

    const nuevoEstado = prompt("Ingrese nuevo estado (leída / no leída):");

    if (!nuevoEstado) return;

    $.ajax({
        type: "PUT",
        url: `${APIURL}/${id}`,
        data: JSON.stringify({ Estado: nuevoEstado }),
        contentType: "application/json",
        success: function () {
            alert("Notificación actualizada");
            cargarNotificaciones();
        }
    });
}

function eliminarNotificacion(id) {
    if (!confirm("¿Eliminar esta notificación?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Notificación eliminada");
            cargarNotificaciones();
        }
    });
}

$(document).ready(cargarNotificaciones);
