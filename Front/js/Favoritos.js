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
                        <td>${Favoritos.Favoritos.Favorito_Id}</td>
                        <td>${Favoritos.Favoritos.Tipo}</td>
                        
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarFavoritos('${Favoritos._id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarFavoritos('${Favoritos._id}')">Eliminar</button>
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
        success: function (favorito) {

            // Llenar campos del modal según schema actual
            $("#idMongo").val(favorito._id);
            $("#Usuario_Id").val(favorito.Usuario_Id);
            $("#Favoritos_Tipo").val(favorito.Favoritos?.Tipo);
            $("#Favorito_Id").val(favorito.Favoritos?.Favorito_Id);

            // Cambiar título
            $("#modalTitle").text("Editar Favorito");

            // Abrir modal con Bootstrap 5
            const modal = new bootstrap.Modal(document.getElementById("modalId"));
            modal.show();
        },
        error: function (xhr) {
            console.error(xhr);
            alert("No se pudo cargar el registro para editar.");
        }
    });
}

// ---------------------------
// Submit del formulario Favoritos
// ---------------------------
$("#FavoritosFormulario").on("submit", function (e) {
    e.preventDefault();

    // Leer valores del formulario (IDs del modal que te propuse)
    const idMongo = $("#idMongo").val(); // si viene vacío => crear; si trae valor => editar
    const Usuario_Id = $("#Usuario_Id").val()?.trim();
    const Favoritos_Tipo = $("#Favoritos_Tipo").val();
    const Favorito_Id = $("#Favorito_Id").val()?.trim();

    // Validación básica
    if (!Usuario_Id || !Favoritos_Tipo || !Favorito_Id) {
        alert("Completa todos los campos antes de guardar.");
        return;
    }

    // Construir payload según tu schema
    const datos = {
        Usuario_Id: Usuario_Id,
        Favoritos: {
            Tipo: Favoritos_Tipo,
            Favorito_Id: Favorito_Id
        }
    };

    // Función auxiliar para cerrar modal con Bootstrap 5
    function cerrarModal() {
        const modalEl = document.getElementById('modalId');
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
    }

    // Si idMongo tiene valor, es edición -> PUT /api/...
    if (idMongo) {
        $.ajax({
            type: "PUT",
            url: `${APIURL}/${idMongo}`,   // asumo que APIURL está definido en tu archivo
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Favorito actualizado");
                $("#FavoritosFormulario")[0].reset();
                $("#idMongo").val("");
                cerrarModal();
                if (typeof cargarDatos === "function") cargarDatos();
            },
            error: function (xhr) {
                console.error(xhr);
                alert("Error al actualizar favorito: " + (xhr.responseText || xhr.statusText));
            }
        });
    }
    else {
        // Si no hay idMongo -> crear (POST)
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Favorito guardado");
                $("#FavoritosFormulario")[0].reset();
                cerrarModal();
                if (typeof cargarDatos === "function") cargarDatos();
            },
            error: function (xhr) {
                console.error(xhr);
                alert("Error al guardar favorito: " + (xhr.responseText || xhr.statusText));
            }
        });
    }
});

// ======================================================
cargarDatos();
