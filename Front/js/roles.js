$(document).ready(function () {
    const API_URL = "http://localhost:3000/api/Roles";

    
    // Función para cargar roles
    
    function cargarRoles() {
        $.ajax({
            url: API_URL,
            type: "GET",
            success: function (data) {
                let filas = '';
                data.forEach(rol => {
                    filas += `
                        <tr>
                            <td>${rol.Nombre}</td>
                            <td>${rol.Descripcion}</td>
                            <td>${rol.Permisos.join(', ')}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${rol._id}">Editar</button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${rol._id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $("#tablaDatos").html(filas);
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar roles:", status, error);
            }
        });
    }

    cargarRoles();

    
    // Crear o actualizar un rol
  
    $("#rolFormulario").submit(function (e) {
        e.preventDefault();

        const id = $("#idRol").val();
        const rolData = {
            Nombre: $("#nombre").val(),
            Descripcion: $("#descripcion").val(),
            Permisos: $("#permisos").val().split(',').map(p => p.trim())
        };

        const ajaxOptions = {
            url: id ? `${API_URL}/${id}` : API_URL,
            type: id ? "PUT" : "POST",
            contentType: "application/json",
            data: JSON.stringify(rolData),
            success: function () {
                $("#modalId").modal('hide');
                $("#rolFormulario")[0].reset();
                cargarRoles();
            },
            error: function (xhr, status, error) {
                console.error(id ? "Error al actualizar rol:" : "Error al crear rol:", status, error);
                console.log("Respuesta del servidor:", xhr.responseText);
            }
        };

        $.ajax(ajaxOptions);
    });

    
    // Editar un rol

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        if (!id) {
            console.warn("ID del rol no definido");
            return;
        }

        $.ajax({
            url: `${API_URL}/${id}`,
            type: "GET",
            success: function (rol) {
                if (!rol) {
                    alert("Rol no encontrado");
                    return;
                }
                $("#idRol").val(rol._id);
                $("#nombre").val(rol.Nombre);
                $("#descripcion").val(rol.Descripcion);
                $("#permisos").val(rol.Permisos.join(', '));
                $("#modalId").modal('show');
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener rol:", status, error);
                console.log("Respuesta del servidor:", xhr.responseText);
                alert("No se pudo obtener el rol. Revisa la consola.");
            }
        });
    });

   
    // Eliminar un rol
   
    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!id) {
            console.warn("ID del rol no definido");
            return;
        }

        if (confirm("¿Desea eliminar este rol?")) {
            $.ajax({
                url: `${API_URL}/${id}`,
                type: "DELETE",
                success: function () {
                    cargarRoles();
                },
                error: function (xhr, status, error) {
                    console.error("Error al eliminar rol:", status, error);
                    console.log("Respuesta del servidor:", xhr.responseText);
                    alert("No se pudo eliminar el rol. Revisa la consola.");
                }
            });
        }
    });
});
