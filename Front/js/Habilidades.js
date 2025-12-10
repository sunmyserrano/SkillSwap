const APIURL = "http://localhost:3000/api/Habilidades";


// CARGAR DATOS

function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseHabilidades) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseHabilidades.forEach(Habilidades => {
                tbody.append(`
                    <tr>
                        <td>${Habilidades.nombre}</td>
                        <td>${Habilidades.Descripcion}</td>
                        <td>${Habilidades.Categoria}</td>
                        <td>${Habilidades.Nivel}</td>
                        <td>${Habilidades.Usuario_Id}</td>

                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarHabilidades('${Habilidades.Usuario_Id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarHabilidades('${Habilidades.Usuario_Id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}



// ELIMINAR Habilidades

function eliminarHabilidades(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Habilidades eliminado");
            cargarDatos();
        }
    });
}


// EDITAR Habilidades

function editarHabilidades(id) {

    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (Habilidades) {

            $("#nombre").val(Habilidades.nombre);
            $("#Descripcion").val(Habilidades.Descripcion);
            $("#Categoria").val(Habilidades.Categoria);
            $("#Nivel").val(Habilidades.Nivel);
            $("#Usuario_IdHabilidades").val(Habilidades.Usuario_Id);

            $(".modal-title").text("Editar Habilidades");

            $("#modalId").modal("show");
        }
    });
}



// GUARDAR
$("#HabilidadesFormulario").on("submit", function (e) {
    e.preventDefault();

    let id = $("#Usuario_IdHabilidades").val();

    const datos = {
        nombre: $("#nombre").val(),
        Descripcion: $("#Descripcion").val(),
        Categoria: $("#Categoria").val(),
        Nivel: $("#Nivel").val(),
        Usuario_Id: $("#Usuario_Id").val()
    };

    if (Usuario_Id) {

        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Habilidades actualizado");
                $("#HabilidadesFormulario")[0].reset();
                $("#Usuario_IdHabilidades").val("");
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
            alert("Habilidades guardado");
            $("#HabilidadesFormulario")[0].reset();
            $("#modalId").modal("hide");
            cargarDatos();
        }
    });

});

// ======================================================
cargarDatos();
