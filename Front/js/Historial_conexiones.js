const APIURL = "http://localhost:3000/api/Historial_conexiones";


// CARGAR DATOS

function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseHistorial_conexiones) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseHistorial_conexiones.forEach(Historial_conexiones => {
                tbody.append(`
                    <tr>
                        <td>${Historial_conexiones.Usuario_Id}</td>
                        <td>${new Date(Historial_conexiones.fechaHora_inicio).toLocaleDateString()}</td>
                        <td>${new Date(Historial_conexiones.fechaHora_fin).toLocaleDateString()}</td>
                        <td>${Historial_conexiones.Dispositivo}</td>

                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarHistorial_conexiones('${Historial_conexiones.Usuario_Id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarHistorial_conexiones('${Historial_conexiones.Usuario_Id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}



// ELIMINAR Historial_conexiones

function eliminarHistorial_conexiones(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Historial_conexiones eliminado");
            cargarDatos();
        }
    });
}


// EDITAR Historial_conexiones

function editarHistorial_conexiones(id) {

    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (Historial_conexiones) {

            $("#Usuario_Id").val(id);  // <-- marcar modo edición
            $("#fechaHora_inicio").val(Historial_conexiones.fechaHora_inicio);
            $("#fechaHora_fin").val(Historial_conexiones.fechaHora_fin.split("T")[0]);
            $("#fecha_fin").val(Historial_conexiones.fecha_fin.split("T")[0]);
            $("#Dispositivo").val(Historial_conexiones.Dispositivo);

            $(".modal-title").text("Editar Historial_conexiones");

            $("#modalId").modal("show");
        }
    });
}



// GUARDAR
$("#Historial_conexionesFormulario").on("submit", function (e) {
    e.preventDefault();

    let id = $("#Usuario_IdHistorial_conexiones").val();

    const datos = {
        Usuario_Id: $("#Usuario_Id").val(),
        fechaHora_inicio: $("#fechaHora_inicio").val(),
        fechaHora_fin: $("#fechaHora_fin").val(),
        Dispositivo: $("#Dispositivo").val(),
    };

    if (Usuario_Id) {

        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Historial_conexiones actualizado");
                $("#Historial_conexionesFormulario")[0].reset();
                $("#Usuario_IdHistorial_conexiones").val("");
                $("#modalId").modal("hide");
                cargarDatos();
            }
        });

        return;
    }

  
    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function () {
            alert("Historial_conexiones guardado");
            $("#Historial_conexionesFormulario")[0].reset();
            $("#modalId").modal("hide");
            cargarDatos();
        }
    });

});

// ======================================================
cargarDatos();
