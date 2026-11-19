const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite que tu página web se comunique con el servidor
app.use(express.json()); // Permite leer los datos JSON que envía el formulario

// ============================================================
// 1. CONEXIÓN A MONGODB ATLAS (AQUÍ VA TU ENLACE)
// ============================================================
// Reemplaza la cadena de abajo con la que copiaste de Atlas.
// Asegúrate de cambiar <password> por tu contraseña real y poner /vitanexo_db antes del signo ?
const MONGO_URI = 'mongodb+srv://franklincaseresvivas_db_user:<32522058>@cluster0.jjwtrcq.mongodb.net/vitanexo_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✔ Conectado exitosamente a MongoDB Atlas'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// ============================================================
// 2. MODELOS DE DATOS (Estructura de la base de datos)
// ============================================================
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    telefono: String,
    plan: { type: String, default: 'tranquilidad' },
    fecha_registro: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// ============================================================
// 3. RUTAS DE LA API (Lo que recibe las peticiones de sistema.js)
// ============================================================

// Ruta de prueba para verificar en el navegador que el servidor está vivo
app.get('/', (req, res) => {
    res.send('Servidor de VitaNexo funcionando en la nube 🚀');
});

// Ruta para registrar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();
        
        res.status(201).json({
            mensaje: 'Usuario creado con éxito',
            id_usuario: usuarioGuardado._id
        });
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        res.status(400).json({ error: 'No se pudo registrar el usuario. Verifica que el correo no esté repetido.' });
    }
});

// Ruta para confirmar una toma de medicamento
app.post('/api/tomas/confirmar', async (req, res) => {
    try {
        // Aquí luego conectaremos el descuento real del inventario
        res.json({ mensaje: 'Toma confirmada y registrada en la nube.' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al confirmar la toma' });
    }
});

// ============================================================
// 4. INICIAR EL SERVIDOR (Listo para Render)
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});