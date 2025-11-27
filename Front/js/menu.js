 const menu = `
            <ul class="nav justify-content-center bg-info p-3">

                <li class="nav-item">
                    <a class="nav-link text-white" href="index.html">Inicio</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-white" href="usuarios.html">Usuarios</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Valoraciones</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Habilidades</a>
                </li>

                <!-- Administración -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                        Administración
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Sesiones Agendadas</a></li>
                        <li><a class="dropdown-item" href="#">Roles</a></li>
                        <li><a class="dropdown-item" href="#">Reportes</a></li>
                        <li><a class="dropdown-item" href="#">Socios Aliados</a></li>
                        <li><a class="dropdown-item" href="#">Solicitud de Intercambio</a></li>
                        <li><a class="dropdown-item" href="#">Archivos Multimedia</a></li>
                    </ul>
                </li>

                <!-- Solicitudes -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                        Solicitudes
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Historial de Trueques</a></li>
                        <li><a class="dropdown-item" href="#">Historial de Conexiones</a></li>
                        <li><a class="dropdown-item" href="#">Solicitud de Intercambio</a></li>
                        <li><a class="dropdown-item" href="#">Estadísticas</a></li>
                    </ul>
                </li>

                <!-- Perfil -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                        Perfil
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="usuarios.html">Usuarios</a></li>
                        <li><a class="dropdown-item" href="#">Favoritos</a></li>
                        <li><a class="dropdown-item" href="#">Configuración</a></li>
                    </ul>
                </li>

            </ul>
        `
        ;

        // Insertamos el menú usando jQuery
        $("#seccionMenu").append(menu);
