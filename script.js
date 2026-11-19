document.addEventListener('DOMContentLoaded', () => {
    
    
    const form = document.getElementById('leadForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;

        
        if(nombre !== "" && telefono !== "") {
            alert(`¡Gracias ${nombre}! Hemos registrado tu solicitud. Un farmacéutico de VitaNexo se comunicará al ${telefono} muy pronto para darte tranquilidad.`);
            form.reset(); // Limpia el formulario
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

   // Desplazamiento suave
    const links = document.querySelectorAll('nav a, header a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // SOLO si el enlace empieza con #
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Bloquea el salto brusco
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, 
                        behavior: 'smooth'
                    });
                }
            }

        });
    });
} 
