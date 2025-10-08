// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script.
// Esto es una buena práctica para asegurar que todos los elementos HTML existen
// antes de intentar manipularlos con JavaScript.
document.addEventListener('DOMContentLoaded', function() {

    // Implementación de Smooth Scroll (Desplazamiento Suave)
    // Aunque CSS con `scroll-behavior: smooth;` funciona en la mayoría de los casos,
    // este script ofrece mayor compatibilidad y control.

    // 1. Seleccionamos todos los enlaces (<a>) que tienen un href que empieza con '#'.
    // Estos son los enlaces que apuntan a secciones dentro de la misma página.
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // 2. Recorremos cada uno de los enlaces encontrados.
    navLinks.forEach(link => {
        // 3. Añadimos un 'escuchador de eventos' para el clic en cada enlace.
        link.addEventListener('click', function(e) {
            // 4. Prevenimos el comportamiento por defecto del enlace (que es saltar directamente a la sección).
            e.preventDefault();
            // 5. Obtenemos el destino (ej. '#proyectos') y buscamos el elemento con ese ID.
            let target = document.querySelector(this.getAttribute('href'));
            // 6. Usamos el método `scrollIntoView` para desplazarnos suavemente hasta ese elemento.
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // =================================================
    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // =================================================
    
    // Este código utiliza las capacidades de validación de formularios de Bootstrap 5.
    // 1. Seleccionamos el formulario por su ID.
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // Expresión Regular para un Correo Válido:
        // Fuerza el formato [texto]@[texto].[dos o más caracteres]
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailInput = document.getElementById('email'); // ID del campo es 'email'

        contactForm.addEventListener('submit', function(event) {
            
            let isEmailValid = true; // Variable para controlar la validez del email

            // 1. Validar el Email con Regex (si el campo existe)
            if (emailInput) {
                if (!emailRegex.test(emailInput.value)) {
                    // Si el correo NO cumple el regex:
                    isEmailValid = false;
                    // Marca el campo como inválido (útil para estilos personalizados si checkValidity no lo hace)
                    emailInput.setCustomValidity("El formato del correo debe incluir un dominio válido (ej. nombre@dominio.com)");
                } else {
                    // Si el correo CUMPLE el regex, restablece la validez para que Bootstrap pueda marcarlo como OK
                    emailInput.setCustomValidity("");
                }
            }
            
            // 2. Ejecutar la validación general de HTML5
            // La validación general fallará si algún campo 'required' falla O si el email falló la regex.
            if (!contactForm.checkValidity() || !isEmailValid) {
                // Si el formulario NO es válido (por HTML5 o por la nueva regex):
                event.preventDefault();
                event.stopPropagation();
            }

            // 3. Añadir la clase 'was-validated' para mostrar estilos de Bootstrap
            contactForm.classList.add('was-validated');

        }, false);
    }

    // =================================================
    // INTERRUPTOR DE MODO OSCURO/CLARO
    // =================================================

    // 1. Seleccionamos los elementos necesarios del DOM.
    const themeToggle = document.getElementById('theme-toggle');    
    const body = document.body;

    // 2. Función para aplicar el tema (claro u oscuro).
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.classList.remove('btn-outline-light');
            themeToggle.classList.add('btn-light');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.classList.remove('btn-light');
            themeToggle.classList.add('btn-outline-light');
        }
    };

    // 3. Al cargar la página, comprobamos si hay una preferencia guardada en localStorage.
    const savedTheme = localStorage.getItem('theme') || 'light'; // 'light' es el valor por defecto.
    applyTheme(savedTheme);

    // 4. Añadimos el 'escuchador de eventos' para el clic en el botón.
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // a. Comprobamos si el body ya tiene la clase 'dark-mode'.
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            // b. Aplicamos el nuevo tema.
            applyTheme(newTheme);
            // c. Guardamos la preferencia del usuario en localStorage para futuras visitas.
            localStorage.setItem('theme', newTheme);
        });
    }
});