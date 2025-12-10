const APIURL = "http://localhost:3000/api/historial_trueque";

// CARGAR DATOS
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseHistorial) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseHistorial.forEach(item => {
                tbody.append(`
                    <tr>
                        <td>${item.Historial_Id}</td>
                        <td>${item.Habilidad1}</td>
                        <td>${item.Habilidad2}</td>
                        <td>${new Date(item.fecha_inicio).toLocaleDateString()}</td>
                        <td>${new Date(item.fecha_fin).toLocaleDateString()}</td>
                        <td>${item.estado}</td>
                        <td>${item.Valoracion_final}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarHistorial('${item._id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarHistorial('${item._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

// ELIMINAR
function eliminarHistorial(id) {
    if (!confirm("¿Seguro de eliminar este registro?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Registro eliminado");
            cargarDatos();
        }
    });
}

// EDITAR
function editarHistorial(id) {
    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (item) {
            $("#Historial_Id").val(item.Historial_Id);  // <-- usar Historial_Id
            $("#Habilidad1").val(item.Habilidad1);
            $("#Habilidad2").val(item.Habilidad2);
            $("#fecha_inicio").val(item.fecha_inicio.split("T")[0]);
            $("#fecha_fin").val(item.fecha_fin.split("T")[0]);
            $("#estado").val(item.estado);
            $("#Valoracion_final").val(item.Valoracion_final);
            $("#historialFormulario").data('idMongo', item._id); // guardamos _id de Mongo para PUT
        }
    });
}

// GUARDAR / ACTUALIZAR
$("#historialFormulario").on("submit", function (e) {
    e.preventDefault();

    // Tomamos el _id de Mongo si estamos editando
    let idMongo = $(this).data('idMongo');

    const datos = {
        Historial_Id: Number($("#Historial_Id").val()),
        Habilidad1: $("#Habilidad1").val(),
        Habilidad2: $("#Habilidad2").val(),
        fecha_inicio: $("#fecha_inicio").val(),
        fecha_fin: $("#fecha_fin").val(),
        estado: $("#estado").val(),
        Valoracion_final: Number($("#Valoracion_final").val())
    };

    if (idMongo) {
        // Actualizar
        $.ajax({
            type: "PUT",
            url: `${APIURL}/${idMongo}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Registro actualizado");
                $("#historialFormulario")[0].reset();
                $("#historialFormulario").removeData('idMongo');
                cargarDatos();
            }
        });
        return;
    }

    // Crear
    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function () {
            alert("Registro guardado");
            $("#historialFormulario")[0].reset();
            cargarDatos();
        }
    });
});

// Cargar al inicio
cargarDatos();
