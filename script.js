// Esperamos a que todo el contenido del DOM se cargue
document.addEventListener('DOMContentLoaded', () => {
    
    // Funcionalidad para el formulario de captura de prospectos (Leads)
    const form = document.getElementById('leadForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitamos que la página se recargue
        
        // Obtenemos los valores introducidos
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;

        // Aquí iría la conexión con tu base de datos o CRM en el futuro.
        // Por ahora, mostraremos un mensaje de éxito simulando el proceso.
        
        if(nombre !== "" && telefono !== "") {
            alert(`¡Gracias ${nombre}! Hemos registrado tu solicitud. Un farmacéutico de VitaNexo se comunicará al ${telefono} muy pronto para darte tranquilidad.`);
            form.reset(); // Limpia el formulario
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

   // Desplazamiento suave (Smooth Scroll) para los enlaces de navegación
    const links = document.querySelectorAll('nav a, header a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // SOLO aplicamos el efecto si el enlace empieza con "#"
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Bloquea el salto brusco
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // -70 para compensar el header fijo
                        behavior: 'smooth'
                    });
                }
            }

        });
    });
} 