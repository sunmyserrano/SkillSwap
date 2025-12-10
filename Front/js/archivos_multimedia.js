// Front/js/archivos_multimedia.js

const API_MULTIMEDIA = "http://localhost:3000/api/multimedia";

let editandoMultimedia = false;
let idEditandoMultimedia = null;

$(document).ready(function () {
    cargarMultimedia();

    $("#formMultimedia").on("submit", function (e) {
        e.preventDefault();

        const registro = {
            Id: parseInt($("#Id").val(), 10),
            Usuario_Id: parseInt($("#Usuario_Id").val(), 10),
            Tipo: $("#Tipo").val(),
            URL: $("#URL").val(),
            Fecha_subido: $("#Fecha_subido").val(),
            Descripción: $("#Descripcion").val(),
            Intercambio_Id: $("#Intercambio_Id").val()
                ? parseInt($("#Intercambio_Id").val(), 10)
                : null
        };

        if (!editandoMultimedia) {
            crearMultimedia(registro);
        } else {
            actualizarMultimedia(idEditandoMultimedia, registro);
        }
    });

    $("#tablaMultimedia").on("click", ".btn-editar", function () {
        const id = $(this).data("id");
        cargarMultimediaEnFormulario(id);
    });

    $("#tablaMultimedia").on("click", ".btn-eliminar", function () {
        const id = $(this).data("id");
        if (confirm("¿Seguro que desea eliminar este archivo?")) {
            eliminarMultimedia(id);
        }
    });
});

// ====================== API =======================

function cargarMultimedia() {
    $.ajax({
        type: "GET",
        url: API_MULTIMEDIA,
        success: function (lista) {
            pintarTablaMultimedia(lista);
        },
        error: function (xhr) {
            console.error("Error al obtener archivos multimedia:", xhr.status, xhr.responseText);
            alert("No se pudieron cargar los archivos multimedia.");
        }
    });
}

function crearMultimedia(registro) {
    $.ajax({
        type: "POST",
        url: API_MULTIMEDIA,
        data: JSON.stringify(registro),
        contentType: "application/json",
        success: function () {
            limpiarFormularioMultimedia();
            cargarMultimedia();
            alert("Archivo multimedia guardado correctamente.");
        },
        error: function (xhr) {
            console.error("Error al crear archivo multimedia:", xhr.status, xhr.responseText);
            alert("Error al guardar el archivo multimedia.");
        }
    });
}

function actualizarMultimedia(id, registro) {
    $.ajax({
        type: "PUT",
        url: `${API_MULTIMEDIA}/${id}`,
        data: JSON.stringify(registro),
        contentType: "application/json",
        success: function () {
            limpiarFormularioMultimedia();
            cargarMultimedia();
            alert("Archivo multimedia actualizado correctamente.");
        },
        error: function (xhr) {
            console.error("Error al actualizar archivo multimedia:", xhr.status, xhr.responseText);
            alert("Error al actualizar el archivo multimedia.");
        }
    });
}

function eliminarMultimedia(id) {
    $.ajax({
        type: "DELETE",
        url: `${API_MULTIMEDIA}/${id}`,
        success: function () {
            cargarMultimedia();
            alert("Archivo multimedia eliminado.");
        },
        error: function (xhr) {
            console.error("Error al eliminar archivo multimedia:", xhr.status, xhr.responseText);
            alert("Error al eliminar el archivo multimedia.");
        }
    });
}

function cargarMultimediaEnFormulario(id) {
    $.ajax({
        type: "GET",
        url: `${API_MULTIMEDIA}/${id}`,
        success: function (dato) {
            $("#Id").val(dato.Id);
            $("#Usuario_Id").val(dato.Usuario_Id);
            $("#Tipo").val(dato.Tipo);
            $("#URL").val(dato.URL);

            // Fecha en formato yyyy-mm-dd para el input date
            if (dato.Fecha_subido) {
                const fecha = new Date(dato.Fecha_subido);
                const yyyy = fecha.getFullYear();
                const mm = String(fecha.getMonth() + 1).padStart(2, "0");
                const dd = String(fecha.getDate()).padStart(2, "0");
                $("#Fecha_subido").val(`${yyyy}-${mm}-${dd}`);
            } else {
                $("#Fecha_subido").val("");
            }

            $("#Descripcion").val(dato["Descripción"] || "");
            $("#Intercambio_Id").val(dato.Intercambio_Id || "");

            editandoMultimedia = true;
            idEditandoMultimedia = dato.Id;
        },
        error: function (xhr) {
            console.error("Error al obtener archivo multimedia:", xhr.status, xhr.responseText);
            alert("No se pudo cargar el archivo seleccionado.");
        }
    });
}

// ====================== UI =======================

function pintarTablaMultimedia(lista) {
    const tbody = $("#tablaMultimedia");
    tbody.empty();

    if (!lista || lista.length === 0) {
        tbody.append(
            `<tr><td colspan="8" class="text-center">No hay archivos registrados.</td></tr>`
        );
        return;
    }

    lista.forEach(dato => {
        const fecha = dato.Fecha_subido
            ? new Date(dato.Fecha_subido).toLocaleDateString()
            : "";

        const fila = `
            <tr>
                <td>${dato.Id}</td>
                <td>${dato.Usuario_Id}</td>
                <td>${dato.Tipo}</td>
                <td><a href="${dato.URL}" target="_blank">${dato.URL}</a></td>
                <td>${fecha}</td>
                <td>${dato["Descripción"] || ""}</td>
                <td>${dato.Intercambio_Id || ""}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="${dato.Id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="${dato.Id}">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.append(fila);
    });
}

function limpiarFormularioMultimedia() {
    $("#formMultimedia")[0].reset();
    editandoMultimedia = false;
    idEditandoMultimedia = null;
}
