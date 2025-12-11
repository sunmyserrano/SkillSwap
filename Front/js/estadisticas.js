const API_URL = "http://localhost:3000/api/estadisticas";

let editando = false;
let idEditando = null;

$(document).ready(function () {

    cargarEstadisticas();

    $("#EstadisticasFormulario").on("submit", function (e) {
        e.preventDefault();

        const registro = {
            Fecha: $("#Fecha").val(),
            Total_usuarios: parseInt($("#Total_usuarios").val()),
            Intercambios_completados: parseInt($("#Intercambios_completados").val()),
            Habilidades_populares: $("#Habilidades_populares").val(),
        };

        if (!editando) {
            crearEstadistica(registro);
        } else {
            actualizarEstadistica(idEditando, registro);
        }
    });

    // Delegar eventos del botón Editar/Eliminar
    $("#tablaDatos").on("click", ".btn-editar", function () {
        const id = $(this).data("id");
        cargarEnFormulario(id);
    });

    $("#tablaDatos").on("click", ".btn-eliminar", function () {
        const id = $(this).data("id");

        if (!id) {
            console.error("ERROR: id undefined en eliminar");
            alert("No se pudo identificar la estadística.");
            return;
        }

        if (confirm("¿Eliminar estadística?")) {
            eliminarEstadistica(id);
        }
    });
});

// ======================= CRUD ============================

function cargarEstadisticas() {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function (lista) {
            renderTabla(lista);
        },
        error: function (err) {
            console.error("Error al cargar estadísticas:", err);
        }
    });
}

function crearEstadistica(data) {
    $.ajax({
        url: API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            $("#EstadisticasFormulario")[0].reset();
            $("#modalEstadistica").modal("hide");
            cargarEstadisticas();
            alert("Estadística creada correctamente.");
        },
        error: function (err) {
            console.error("Error al crear:", err);
            alert("Error al crear la estadística.");
        }
    });
}

function actualizarEstadistica(id, data) {
    $.ajax({
        url: `${API_URL}/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            $("#EstadisticasFormulario")[0].reset();
            $("#modalEstadistica").modal("hide");
            editando = false;
            idEditando = null;
            cargarEstadisticas();
            alert("Estadística actualizada.");
        },
        error: function (err) {
            console.error("Error al actualizar:", err);
            alert("Error al actualizar la estadística.");
        }
    });
}

function eliminarEstadistica(id) {
    $.ajax({
        url: `${API_URL}/${id}`,
        method: "DELETE",
        success: function () {
            cargarEstadisticas();
        },
        error: function (err) {
            console.error("Error al eliminar:", err);
            alert("Error al eliminar la estadística.");
        }
    });
}

function cargarEnFormulario(id) {
    $.ajax({
        url: `${API_URL}/${id}`,
        method: "GET",
        success: function (data) {

            $("#Id").val(data.Id);
            $("#Fecha").val(data.Fecha?.substring(0, 10));
            $("#Total_usuarios").val(data.Total_usuarios);
            $("#Intercambios_completados").val(data.Intercambios_completados);
            $("#Habilidades_populares").val(data.Habilidades_populares);

            editando = true;
            idEditando = data.Id;

            $("#modalEstadistica").modal("show");
        },
        error: function (err) {
            console.error("Error al cargar registro:", err);
        }
    });
}

// ======================= TABLA ============================

function renderTabla(lista) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    if (!lista || lista.length === 0) {
        tbody.append(`<tr><td colspan="6">No hay registros</td></tr>`);
        return;
    }

    lista.forEach(item => {
        tbody.append(`
            <tr>
                <td>${item.Id}</td>
                <td>${item.Fecha?.substring(0, 10)}</td>
                <td>${item.Total_usuarios}</td>
                <td>${item.Intercambios_completados}</td>
                <td>${item.Habilidades_populares}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${item.Id}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.Id}">Eliminar</button>
                </td>
            </tr>
        `);
    });
}
