document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Nav scroll effect (only on pages where nav starts transparent)
    const nav = document.getElementById('nav');
    if (nav && !nav.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    // Close mobile menu on link click
    const hamCheck = document.getElementById('ham');
    if (hamCheck) {
        document.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
            link.addEventListener('click', () => {
                hamCheck.checked = false;
            });
        });
    }

    // Contact form (EmailJS)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const formStatus = document.getElementById('form-status');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            formStatus.innerHTML = '';
            formStatus.className = 'form-status';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_axmo3vt', 'template_egu0b2t', {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'hola@terminatech.com'
            })
            .then(function() {
                formStatus.innerHTML = '<div class="success-message">¡Mensaje enviado exitosamente! Nos pondremos en contacto con usted pronto.</div>';
                formStatus.className = 'form-status success';
                contactForm.reset();
            })
            .catch(function() {
                formStatus.innerHTML = '<div class="error-message">Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo o contáctenos directamente por teléfono.</div>';
                formStatus.className = 'form-status error';
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            });
        });
    }
});
