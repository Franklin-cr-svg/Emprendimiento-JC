document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. REGISTRO DE USUARIO CONECTADO AL BACKEND
    // ============================================================
    const registroForm = document.getElementById('registroForm');
    
    if (registroForm) {
        registroForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            // Capturamos los datos del Familiar
            const nombreTutor = document.getElementById('nombreTutor').value;
            const emailTutor = document.getElementById('emailTutor').value;
            const passTutor = document.getElementById('passTutor').value;
            const telefonoTutor = document.getElementById('telefonoTutor').value;
            
            // Capturamos los datos del Paciente
            const nombrePaciente = document.getElementById('nombrePaciente').value;
            const enfermedadPaciente = document.getElementById('enfermedadPaciente').value;

            try {
                const respuesta = await fetch('http://localhost:3000/api/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: nombreTutor,
                        email: emailTutor,
                        password_hash: passTutor,
                        telefono: telefonoTutor,
                        plan: 'tranquilidad'
                    })
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                    alert('¡Registro guardado exitosamente en MongoDB!');
                    
                    // Guardamos la sesión y los datos del paciente en el navegador
                    localStorage.setItem('idUsuario', data.id_usuario);
                    localStorage.setItem('nombreFamiliar', nombreTutor);
                    localStorage.setItem('nombrePaciente', nombrePaciente);
                    localStorage.setItem('enfermedadPaciente', enfermedadPaciente);
                    
                    // Redirigimos al Dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Error en el registro: ' + (data.error || 'Verifica los datos'));
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                alert('No se pudo conectar con el servidor.');
            }
        });
    }

    // ============================================================
    // 2. PANEL DE CONTROL (DASHBOARD)
    // ============================================================
    const userNameDisplay = document.getElementById('userNameDisplay');
    const pacienteDisplay = document.getElementById('pacienteDisplay'); // El nuevo ID del HTML
    const btnLogout = document.getElementById('btnLogout');

    // Mostrar el nombre del Familiar en el menú superior
    if (userNameDisplay) {
        const nombreGuardado = localStorage.getItem('nombreFamiliar');
        if (nombreGuardado) {
            userNameDisplay.textContent = `Hola, ${nombreGuardado}`;
        }
    }

    // Mostrar el nombre y enfermedad del Paciente en el título principal
    if (pacienteDisplay) {
        const nombrePac = localStorage.getItem('nombrePaciente') || 'Paciente';
        const enfermedadPac = localStorage.getItem('enfermedadPaciente') || 'Sin condición registrada';
        
        // Aquí inyectamos los datos reales en lugar de "Roberto"
        pacienteDisplay.textContent = `${nombrePac} (${enfermedadPac})`;
    }

    // Botón de Cerrar Sesión
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('¿Deseas salir del sistema?')) {
                localStorage.clear(); // Borra todos los datos guardados
                window.location.href = 'index.html';
            }
        });
    }
});

// ============================================================
// 3. CONFIRMACIÓN DE TOMA (Lógica independiente)
// ============================================================
async function confirmarToma(idMedicamento = 'ID_DEL_MEDICAMENTO_AQUI', cantidadTomada = 1) {
    try {
        const respuesta = await fetch('http://localhost:3000/api/tomas/confirmar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_medicamento: idMedicamento, cantidad_tomada: cantidadTomada })
        });

        const data = await respuesta.json();
        if (respuesta.ok) {
            alert('✔ ' + data.mensaje);
        } else {
            alert('Error: ' + (data.error || 'No se pudo confirmar la toma'));
        }
    } catch (error) {
        console.error('Error al conectar con la API:', error);
        alert('Error de conexión con el servidor backend.');
    }
}