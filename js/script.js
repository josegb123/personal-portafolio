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

    // 2. Verificamos que el formulario exista en la página actual antes de añadir el listener.
    if (contactForm) {
        // 3. Añadimos un 'escuchador de eventos' para el evento 'submit'.
        contactForm.addEventListener('submit', function(event) {
            // 4. `checkValidity()` es un método nativo de los formularios HTML5.
            //    Devuelve `false` si algún campo con `required`, `type="email"`, etc., no cumple las reglas.
            if (!contactForm.checkValidity()) {
                // Si el formulario no es válido:
                // a. Prevenimos el envío del formulario.
                event.preventDefault();
                // b. Detenemos la propagación del evento para no interferir con otros posibles scripts.
                event.stopPropagation();
            }

            // 5. Añadimos la clase 'was-validated' al formulario.
            //    Bootstrap usa esta clase para mostrar los estilos de validación (bordes verdes/rojos y mensajes de error).
            //    Esto se hace tanto si el formulario es válido como si no, para dar feedback visual inmediato al usuario.
            contactForm.classList.add('was-validated');
        }, false);
    }

    // =================================================
    // INTERRUPTOR DE MODO OSCURO/CLARO
    // =================================================

    // 1. Seleccionamos los elementos necesarios del DOM.
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const body = document.body;

    // 2. Función para aplicar el tema (claro u oscuro).
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleIcon.classList.remove('bi-moon-stars-fill');
            themeToggleIcon.classList.add('bi-sun-fill');
        } else {
            body.classList.remove('dark-mode');
            themeToggleIcon.classList.remove('bi-sun-fill');
            themeToggleIcon.classList.add('bi-moon-stars-fill');
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