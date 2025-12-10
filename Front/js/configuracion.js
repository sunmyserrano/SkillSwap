
//Configuracion.js nuevo
// Front/js/configuracion.js

// Usa la misma forma que usuario.js
const API_CONFIG = "http://localhost:3000/api/configuracion";

let editando = false;
let idEditando = null;

// Cuando la página cargue
$(document).ready(function () {
    cargarConfiguraciones();

    $("#formConfiguracion").on("submit", function (e) {
        e.preventDefault();

        const registro = {
            Id: parseInt($("#Id").val(), 10),
            // OJO: nombres con tilde porque así está el esquema
            Parámetros: $("#Parametros").val(),
            Descripción: $("#Descripcion").val()
        };

        if (!editando) {
            crearConfiguracion(registro);
        } else {
            actualizarConfiguracion(idEditando, registro);
        }
    });

    $("#tablaConfiguracion").on("click", ".btn-editar", function () {
        const id = $(this).data("id");
        cargarConfiguracionEnFormulario(id);
    });

    $("#tablaConfiguracion").on("click", ".btn-eliminar", function () {
        const id = $(this).data("id");
        if (confirm("¿Seguro que desea eliminar esta configuración?")) {
            eliminarConfiguracion(id);
        }
    });
});

// ====================== API =======================

function cargarConfiguraciones() {
    $.ajax({
        type: "GET",
        url: API_CONFIG,
        success: function (lista) {
            pintarTabla(lista);
        },
        error: function (xhr) {
            console.error("Error al obtener configuraciones:", xhr.responseText);
            alert("No se pudieron cargar las configuraciones.");
        }
    });
}

function crearConfiguracion(registro) {
    $.ajax({
        type: "POST",
        url: API_CONFIG,
        data: JSON.stringify(registro),
        contentType: "application/json",
        success: function () {
            limpiarFormulario();
            cargarConfiguraciones();
            alert("Configuración guardada correctamente.");
        },
        error: function (xhr) {
            console.error("Error al crear configuración:", xhr.status, xhr.responseText);
            alert("Error al guardar la configuración.");
        }
    });
}

function actualizarConfiguracion(id, registro) {
    $.ajax({
        type: "PUT",
        url: `${API_CONFIG}/${id}`,
        data: JSON.stringify(registro),
        contentType: "application/json",
        success: function () {
            limpiarFormulario();
            cargarConfiguraciones();
            alert("Configuración actualizada correctamente.");
        },
        error: function (xhr) {
            console.error("Error al actualizar configuración:", xhr.status, xhr.responseText);
            alert("Error al actualizar la configuración.");
        }
    });
}

function eliminarConfiguracion(id) {
    $.ajax({
        type: "DELETE",
        url: `${API_CONFIG}/${id}`,
        success: function () {
            cargarConfiguraciones();
            alert("Configuración eliminada.");
        },
        error: function (xhr) {
            console.error("Error al eliminar configuración:", xhr.status, xhr.responseText);
            alert("Error al eliminar la configuración.");
        }
    });
}

function cargarConfiguracionEnFormulario(id) {
    $.ajax({
        type: "GET",
        url: `${API_CONFIG}/${id}`,
        success: function (cfg) {
            $("#Id").val(cfg.Id);
            $("#Parametros").val(cfg["Parámetros"]);
            $("#Descripcion").val(cfg["Descripción"]);

            editando = true;
            idEditando = cfg.Id;
        },
        error: function (xhr) {
            console.error("Error al obtener configuración:", xhr.status, xhr.responseText);
            alert("No se pudo cargar la configuración seleccionada.");
        }
    });
}

// ====================== UI =======================

function pintarTabla(lista) {
    const tbody = $("#tablaConfiguracion");
    tbody.empty();

    if (!lista || lista.length === 0) {
        tbody.append(
            `<tr><td colspan="4" class="text-center">No hay configuraciones registradas.</td></tr>`
        );
        return;
    }

    lista.forEach(cfg => {
        const fila = `
            <tr>
                <td>${cfg.Id}</td>
                <td>${cfg["Parámetros"]}</td>
                <td>${cfg["Descripción"]}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="${cfg.Id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="${cfg.Id}">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.append(fila);
    });
}

function limpiarFormulario() {
    $("#formConfiguracion")[0].reset();
    editando = false;
    idEditando = null;
}
