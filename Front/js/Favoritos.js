const APIURL = "http://localhost:3000/api/Favoritos";


// CARGAR DATOS

function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseFavoritos) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseFavoritos.forEach(Favoritos => {
                tbody.append(`
                    <tr>
                        <td>${Favoritos.Usuario_Id}</td>
                        <td>${Favoritos.Favoritos}</td>

                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarFavoritos('${Favoritos.Usuario_Id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarFavoritos('${Favoritos.Usuario_Id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}



// ELIMINAR Favoritos

function eliminarFavoritos(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Favoritos eliminado");
            cargarDatos();
        }
    });
}


// EDITAR Favoritos

function editarFavoritos(id) {

    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (Favoritos) {

            $("#Usuario_IdFavoritos").val(Favoritos.Usuario_Id);
            $("#Favoritos").val(Favoritos.Favoritos);

            $(".modal-title").text("Editar Favoritos");

            $("#modalId").modal("show");
        }
    });
}



// GUARDAR
$("#FavoritosFormulario").on("submit", function (e) {
    e.preventDefault();

    let id = $("#Usuario_IdFavoritos").val();

    const datos = {
        Usuario_Id: $("#Usuario_IdFavoritos").val(),
        Favoritos: $("#Favoritos").val()
    };

    if (Usuario_Id) {

        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Favoritos actualizado");
                $("#FavoritosFormulario")[0].reset();
                $("#Usuario_IdFavoritos").val("");
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
            alert("Favoritos guardado");
            $("#FavoritosFormulario")[0].reset();
            $("#modalId").modal("hide");
            cargarDatos();
        }
    });

});

// ======================================================
cargarDatos();
