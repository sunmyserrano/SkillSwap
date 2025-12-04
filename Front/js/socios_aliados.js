const APIURL = "http://localhost:3000/api/Socios_Aliados"; 

// CARGAR DATOS
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseSocios) {
            const tbody = $("#tablaDatos");
            tbody.empty();

            responseSocios.forEach(socio => {
                tbody.append(`
                    <tr>
                        <td>${socio.Nombre}</td>
                        <td>${socio.Tipo}</td>
                        <td>${socio.Contacto}</td>
                        <td>${socio.Descripcion}</td>
                        <td><a href="${socio.URL_sitio}" target="_blank">${socio.URL_sitio}</a></td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarSocio('${socio._id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarSocio('${socio._id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

// ELIMINAR SOCIO
function eliminarSocio(id) {
    if (!confirm("¿Seguro de eliminar?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Socio eliminado");
            cargarDatos();
        }
    });
}

// EDITAR SOCIO
function editarSocio(id) {
    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (socio) {
            $("#idSocio").val(id);  
            $("#Nombre").val(socio.Nombre);
            $("#Tipo").val(socio.Tipo);
            $("#Contacto").val(socio.Contacto);
            $("#Descripcion").val(socio.Descripcion);
            $("#URL_sitio").val(socio.URL_sitio);

            $(".modal-title").text("Editar Socio Aliado");
        }
    });
}

// GUARDAR SOCIO
$("#sociosFormulario").on("submit", function (e) {
    e.preventDefault();

    let id = $("#idSocio").val();

    const datos = {
        Nombre: $("#Nombre").val(),
        Tipo: $("#Tipo").val(),
        Contacto: $("#Contacto").val(),
        Descripcion: $("#Descripcion").val(),
        URL_sitio: $("#URL_sitio").val()
    };

    if (id) {
        // ACTUALIZAR
        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Socio actualizado");
                $("#sociosFormulario")[0].reset();
                $("#idSocio").val("");
                cargarDatos();
            }
        });
        return;
    }

    // CREAR NUEVO
    $.ajax({
        type: "POST",
        url: APIURL,
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function () {
            alert("Socio guardado");
            $("#sociosFormulario")[0].reset();
            cargarDatos();
        }
    });
});

// CARGAR DATOS AL INICIO
cargarDatos();
