const APIURL = "http://localhost:3000/api/valoraciones";

document.addEventListener("DOMContentLoaded", () => {
    cargarValoraciones();
    activarSeleccionEstrellas();
});


function activarSeleccionEstrellas() {
    document.querySelectorAll(".star-rating span").forEach(star => {
        star.addEventListener("click", function () {
            const valor = this.getAttribute("data-value");
            document.getElementById("puntuacion").value = valor;

            document.querySelectorAll(".star-rating span").forEach(s => s.classList.remove("selected"));
            this.classList.add("selected");

            let siguiente = this.nextElementSibling;
            while (siguiente) {
                siguiente.classList.add("selected");
                siguiente = siguiente.nextElementSibling;
            }
        });
    });
}


function generarEstrellas(num) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        html += i <= num
            ? `<i class="fa-solid fa-star text-warning"></i>`
            : `<i class="fa-regular fa-star text-warning"></i>`;
    }
    return html;
}


function cargarValoraciones() {
    fetch(APIURL)
        .then(res => res.json())
        .then(data => {
            const tabla = document.getElementById("listaValoraciones");
            tabla.innerHTML = "";

            data.forEach(v => {
                tabla.innerHTML += `
                    <tr>
                        <td>${generarEstrellas(v.Puntuacion)}</td>
                        <td>${v.Comentario ?? ""}</td>
                        <td>${v.Fecha ?? ""}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarValoracion('${v._id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarValoracion('${v._id}')">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Error al cargar valoraciones:", err));
}

// Eliminar valoración
function eliminarValoracion(id) {
    if (!confirm("¿Seguro de eliminar la valoración?")) return;

    $.ajax({
        type: "DELETE",
        url: `${APIURL}/${id}`,
        success: function () {
            alert("Valoración eliminada");
            cargarValoraciones();
        },
        error: function (xhr) {
            alert("Error al eliminar: " + xhr.responseText);
        }
    });
}

function editarValoracion(id) {
    $.ajax({
        type: "GET",
        url: `${APIURL}/${id}`,
        success: function (v) {

            $("#idValoracion").val(v._id); 

            $("#intercambioID").val(v.Intercambio_Id);
            $("#puntuacion").val(v.Puntuacion);
            $("#comentario").val(v.Comentario);
            $("#fecha").val(v.Fecha.split("T")[0]);

            
            document.querySelectorAll(".star-rating span").forEach(s => s.classList.remove("selected"));
            let puntuacion = v.Puntuacion;
            document.querySelectorAll(".star-rating span").forEach(s => {
                if (s.getAttribute("data-value") <= puntuacion) {
                    s.classList.add("selected");
                }
            });

            $("#btnGuardar").text("Actualizar");
        },
        error: function (xhr) {
            alert("Error al obtener valoración: " + xhr.responseText);
        }
    });
}


$("#valoracionFormulario").on("submit", function (e) {
    e.preventDefault();

    const id = $("#idValoracion").val();

    const datos = {
        Intercambio_Id: Number($("#intercambioID").val()),
        Puntuacion: Number($("#puntuacion").val()),
        Comentario: $("#comentario").val(),
        Fecha: $("#fecha").val()
    };

    if (id) {
       
        $.ajax({
            type: "PUT",
            url: `${APIURL}/${id}`,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Valoración actualizada");
                limpiarFormulario();
                cargarValoraciones();
            },
            error: function (xhr) {
                alert("Error al actualizar: " + xhr.responseText);
            }
        });
    } else {
        
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Valoración guardada");
                limpiarFormulario();
                cargarValoraciones();
            },
            error: function (xhr) {
                alert("Error al guardar: " + xhr.responseText);
            }
        });
    }
});

function limpiarFormulario() {
    $("#valoracionFormulario")[0].reset();
    $("#idValoracion").val("");
    document.querySelectorAll(".star-rating span").forEach(s => s.classList.remove("selected"));

    $("#btnGuardar").text("Guardar");
}
