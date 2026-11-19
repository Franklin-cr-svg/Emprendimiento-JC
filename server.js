const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors()); 
app.use(express.json()); // leer datos JSON

// Conexión para render
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('Falta MONGO_URI. Configúrala en Render > Environment.');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB:', err.message));


// MODELOS DE DATOS

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    telefono: String,
    plan: { type: String, default: 'tranquilidad' },
    fecha_registro: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);


// 3. RUTAS DE LA API



// Ruta para registrar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario({
            ...req.body,
            password_hash: await bcrypt.hash(req.body.password_hash, 10)
        });
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
        // descuento real del medicamento
        res.json({ mensaje: 'Toma confirmada y registrada en la nube.' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al confirmar la toma' });
    }
});

// Publicar frontend en el mismo servidor
app.use(express.static(path.join(__dirname)));


// INICIAR EL SERVIDOR 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});
