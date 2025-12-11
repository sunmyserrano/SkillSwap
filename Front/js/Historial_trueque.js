const APIURL = "http://localhost:3000/api/Historial_trueque";


// CARGAR DATOS

function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseHistorial_trueque) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseHistorial_trueque.forEach(Historial_trueque => {
                tbody.append(`
                    <tr>
                        <td>${Historial_trueque.Usuario_Id}</td>
                        <td>${Historial_trueque.Habilidad1}</td>
                        <td>${Historial_trueque.Habilidad2}</td>
                        <td>${new Date(Historial_trueque.fecha_inicio).toLocaleDateString()}</td>
                        <td>${new Date(Historial_trueque.fecha_fin).toLocaleDateString()}</td>
                        <td>${Historial_trueque.estado}</td>
                        <td>${Historial_trueque.Valoracion_final}</td>

                        <td>
                            <button class="btn btn-danger btn-sm" onclick="eliminarHistorial_trueque('${Historial_trueque._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}



// ELIMINAR Historial_trueque

function eliminarHistorial_trueque(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Historial_trueque eliminado");
            cargarDatos();
        }
    });
}


// EDITAR Historial_trueque

function editarHistorial_trueque(id) {

    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (Historial_trueque) {

            $("#Usuario_Id").val(id);  // <-- marcar modo edición
            $("#Habilidad1").val(Historial_trueque.Habilidad1);
            $("#Habilidad2").val(Historial_trueque.Habilidad2);
            $("#fecha_inicio").val(Historial_trueque.fecha_inicio.split("T")[0]);
            $("#fecha_fin").val(Historial_trueque.fecha_fin.split("T")[0]);
            $("#estado").val(Historial_trueque.estado);
            $("#Valoracion_final").val(Historial_trueque.Valoracion_final);

            $(".modal-title").text("Editar Historial_trueque");

            $("#modalId").modal("show");
        }
    });
}



// GUARDAR
$("#Historial_truequeFormulario").on("submit", function (e) {
    e.preventDefault();

    let id = $("#Usuario_IdHistorial_trueque").val();

    const datos = {
        Usuario_Id: $("#Usuario_Id").val(),
        Habilidad1: $("#Habilidad1").val(), 
        Habilidad2: $("#Habilidad2").val(),
        fecha_inicio: $("#fecha_inicio").val(),
        fecha_fin: $("#fecha_fin").val(),
        estado: $("#estado").val(),
        Valoracion_final: $("#Valoracion_final").val()
    };

    if (Usuario_Id) {

        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Historial_trueque actualizado");
                $("#Historial_truequeFormulario")[0].reset();
                $("#Usuario_IdHistorial_trueque").val("");
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
            alert("Historial_trueque guardado");
            $("#Historial_truequeFormulario")[0].reset();
            $("#modalId").modal("hide");
            cargarDatos();
        }
    });

});

// ======================================================
cargarDatos();
