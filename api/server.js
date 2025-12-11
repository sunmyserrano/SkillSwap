// Server Principal
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Rutas
const usuarioRoutes = require('./routes/UsuarioRoutes');
const FavoritosRoutes = require('./routes/FavoritosRoutes');
const HabilidadesRoutes = require('./routes/HabilidadesRoutes');
const ValoracionesRoutes = require('./routes/ValoracionesRoutes');
const Historial_conexionesRoutes = require('./routes/Historial_conexionesRoutes');
const Historial_truequeRoutes = require('./routes/Historial_truequeRoutes');
const Sesiones_AgendadasRoutes = require('./routes/Sesiones_AgendadasRoutes');
const RolesRoutes = require('./routes/RolesRoutes');
const ReportesRoutes = require('./routes/ReportesRoutes');
const NotificacionesRoutes = require('./routes/NotificacionesRoutes');
const EstadisticasRoutes = require('./routes/EstadisticasRoutes');
const ConfiguracionRoutes = require('./routes/ConfiguracionRoutes');
const MultimediaRoutes = require('./routes/MultimediaRoutes');
const Socios_AliadosRoutes = require('./routes/Socios_AliadosRoutes');
const Solicitud_IntercambioRoutes = require('./routes/Solicitud_IntercambioRoutes');

// Middlewares
app.use(cors());
app.use(express.json()); //
app.use(express.urlencoded({ extended: true })); 

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/SkillSwap_DB')
  .then(() => console.log('Mongo DB conectado'))
  .catch(err => console.log('Mongo DB error:', err));

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/favoritos', FavoritosRoutes);
app.use('/api/habilidades', HabilidadesRoutes);
app.use('/api/valoraciones', ValoracionesRoutes);
app.use('/api/historial_conexiones', Historial_conexionesRoutes);
app.use('/api/historial_trueque', Historial_truequeRoutes);
app.use('/api/Sesiones_Agendadas', Sesiones_AgendadasRoutes);
app.use('/api/Socios_Aliados', Socios_AliadosRoutes);
app.use('/api/solicitudes', Solicitud_IntercambioRoutes);
app.use('/api/Roles', RolesRoutes);
app.use('/api/Reportes', ReportesRoutes);
app.use('/api/Notificaciones', NotificacionesRoutes);
app.use('/api/estadisticas', EstadisticasRoutes);
//app.use('/api/configuracion', ConfiguracionRoutes);
app.use('/api/multimedia', MultimediaRoutes);

// Carpeta Frontend
app.use(express.static('Front'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});
