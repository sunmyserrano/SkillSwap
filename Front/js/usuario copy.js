const APIURL = "http://localhost:4000/api/usuarios";

// Cargar la lista en la tabla 
async function cargarDatos() {

    const res = await fetch(APIURL);
    const usuarios = await res.json();

    const tbody = document.getElementById("tablaDatos");
    tbody.innerHTML = '';

    usuarios.forEach(elementUsuarios => {
        tbody.innerHTML += `
        <tr>
            <td>${elementUsuarios.rol_id}</td>
            <td>${elementUsuarios.nombre}</td>
            <td>${elementUsuarios.apellido}</td>
            <td>${elementUsuarios.correo_electronico}</td>
            <td>${elementUsuarios.contrasena}</td>
            <td>${elementUsuarios.telefono}</td>
            <td>${new Date(elementUsuarios.fecha_registro).toLocaleDateString()}</td>
            <td>${elementUsuarios.estado}</td>
            <td>${elementUsuarios.direccion}</td>
        </tr>
        `;
    });

    console.log(usuarios);
}



// Sección de guardar 
document.getElementById("usuarioFormulario").addEventListener('submit', async e => {

    e.preventDefault();

    try {

        const datos = {
            rol_id: document.getElementById("rol_id").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            correo_electronico: document.getElementById("correo_electronico").value,
            contrasena: document.getElementById("contrasena").value,
            telefono: document.getElementById("telefono").value,
            fecha_registro: document.getElementById("fecha_registro").value,
            estado: document.getElementById("estado").value,
            direccion: document.getElementById("direccion").value
        };

        await fetch(APIURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatos();

    } catch (error) {
        console.log("error: " + error);
    }

});


// Ejecutar carga inicial
cargarDatos();
