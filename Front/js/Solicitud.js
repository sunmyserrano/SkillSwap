const API_URL = "http://localhost:3000/api/solicitud_intercambio";

let editando = false;
let idEditando = null;

$(document).ready(function () {

    cargarSolicitudes();

    $("#SolicitudFormulario").on("submit", function (e) {
        e.preventDefault();

        const registro = {
            Usuario_solicita: $("#Usuario_solicita").val(),
            Usuario_ofrece: $("#Usuario_ofrece").val(),
            Habilidad_solicitada: $("#Habilidad_solicitada").val(),
            Habilidad_ofrecida: $("#Habilidad_ofrecida").val(),
            Estado: $("#Estado").val(),
            Fecha: $("#Fecha").val()
        };

        if (!editando) {
            crearSolicitud(registro);
        } else {
            actualizarSolicitud(idEditando, registro);
        }
    });

    // EVENTOS EN TABLA
    $("#tablaDatos").on("click", ".btn-editar", function () {
        const id = $(this).data("id");
        cargarEnFormulario(id);
    });

    $("#tablaDatos").on("click", ".btn-eliminar", function () {
        const id = $(this).data("id");

        if (!id) {
            alert("No se pudo identificar la solicitud.");
            return;
        }

        if (confirm("¿Eliminar esta solicitud de intercambio?")) {
            eliminarSolicitud(id);
        }
    });
});

// ==================================================
// ================= CRUD FUNCIONES =================
// ==================================================

function cargarSolicitudes() {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function (lista) {
            renderTabla(lista);
        },
        error: function (err) {
            console.error("Error al cargar solicitudes:", err);
        }
    });
}

function crearSolicitud(data) {
    $.ajax({
        url: API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            $("#SolicitudFormulario")[0].reset();
            $("#modalSolicitud").modal("hide");
            cargarSolicitudes();
            alert("Solicitud creada correctamente.");
        },
        error: function (err) {
            console.error("Error al crear solicitud:", err);
            alert("Error al crear la solicitud.");
        }
    });
}

function actualizarSolicitud(id, data) {
    $.ajax({
        url: ${API_URL}/${id},
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            editando = false;
            idEditando = null;
            $("#SolicitudFormulario")[0].reset();
            $("#modalSolicitud").modal("hide");
            cargarSolicitudes();
            alert("Solicitud actualizada correctamente.");
        },
        error: function (err) {
            console.error("Error al actualizar solicitud:", err);
            alert("Error al actualizar la solicitud.");
        }
    });


function eliminarSolicitud(id) {
    $.ajax({
        url: ${API_URL}/${id},
        method: "DELETE",
        success: function () {
            cargarSolicitudes();
            alert("Solicitud eliminada.");
        },
        error: function (err) {
            console.error("Error al eliminar solicitud:", err);
            alert("Error al eliminar la solicitud.");
        }
    });
}

function cargarEnFormulario(id) {
    $.ajax({
        url: ${API_URL}/${id},
        method: "GET",
        success: function (data) {

            $("#Id").val(data.Id);
            $("#Usuario_solicita").val(data.Usuario_solicita);
            $("#Usuario_ofrece").val(data.Usuario_ofrece);
            $("#Habilidad_solicitada").val(data.Habilidad_solicitada);
            $("#Habilidad_ofrecida").val(data.Habilidad_ofrecida);
            $("#Estado").val(data.Estado);
            $("#Fecha").val(data.Fecha?.substring(0, 10));

            editando = true;
            idEditando = data.Id;

            $("#modalSolicitud").modal("show");
        },
        error: function (err) {
            console.error("Error al cargar solicitud:", err);
        }
    });
}

// ==================================================
// ===================== TABLA ======================
// ==================================================

function renderTabla(lista) {

    const tbody = $("#tablaDatos");
    tbody.empty();

    if (!lista || lista.length === 0) {
        tbody.append(<tr><td colspan="7">No hay solicitudes registradas</td></tr>);
        return;
    }

    lista.forEach(item => {

        tbody.append(`
            <tr>
                <td>${item.Id}</td>
                <td>${item.Usuario_solicita}</td>
                <td>${item.Usuario_ofrece}</td>
                <td>${item.Habilidad_solicitada}</td>
                <td>${item.Habilidad_ofrecida}</td>
                <td>${item.Estado}</td>
                <td>${item.Fecha?.substring(0,10)}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${item.Id}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.Id}">Eliminar</button>
                </td>
            </tr>
        `);
    });
}