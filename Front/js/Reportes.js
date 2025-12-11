const APIURL = "http://localhost:3000/api/reportes";

function cargarReportes() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (datos) {
            const tbody = $("#tablaReportes");
            tbody.empty();

            datos.forEach(r => {
                tbody.append(`
                    <tr>
                        <td>${r.Usuario_reporte}</td>
                        <td>${r.Usuario_reportado}</td>
                        <td>${r.Intercambio_Id}</td>
                        <td>${r.Tipo_reporte}</td>
                        <td>${r.Descripcion}</td>
                        <td>${r.Estado}</td>
                        <td>${new Date(r.Fecha).toLocaleString()}</td>

                        <td>
                            <button class="btn btn-warning btn-sm"
                                onclick="editarReporte('${r._id}')">Editar</button>

                            <button class="btn btn-danger btn-sm"
                                onclick="eliminarReporte('${r._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

$("#formReporte").submit(function (e) {
    e.preventDefault();

    const nuevo = {
        Usuario_reporte: $("#Usuario_reporte").val(),
        Usuario_reportado: $("#Usuario_reportado").val(),
        Intercambio_Id: $("#Intercambio_Id").val(),
        Tipo_reporte: $("#Tipo_reporte").val(),
        Descripcion: $("#Descripcion").val(),
        Estado: $("#Estado").val()
    };

    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(nuevo),
        contentType: "application/json",
        success: function () {
            alert("Reporte creado");
            cargarReportes();
            $("#formReporte")[0].reset();
        }
    });
});

function editarReporte(id) {

    const nuevoEstado = prompt("Nuevo estado (pendiente / procesado / cancelado):");

    if (!nuevoEstado) return;

    $.ajax({
        type: "PUT",
        url: `${APIURL}/${id}`,
        data: JSON.stringify({ Estado: nuevoEstado }),
        contentType: "application/json",
        success: function () {
            alert("Reporte actualizado");
            cargarReportes();
        }
    });
}

function eliminarReporte(id) {
    if (!confirm("¿Eliminar este reporte?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Reporte eliminado");
            cargarReportes();
        }
    });
}

$(document).ready(cargarReportes);
