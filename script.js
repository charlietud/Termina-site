document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // EmailJS form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const formStatus = document.getElementById('form-status');
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            formStatus.innerHTML = '';
            formStatus.className = 'form-status';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send email using EmailJS
            emailjs.send('service_axmo3vt', 'template_egu0b2t', {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                time: formData.time,
                to_email: 'hola@terminatech.com'
            })
            .then(function(response) {
                // Success
                formStatus.innerHTML = '<div class="success-message">¡Mensaje enviado exitosamente! Nos pondremos en contacto con usted pronto.</div>';
                formStatus.className = 'form-status success';
                contactForm.reset();
            })
            .catch(function(error) {
                // Error
                formStatus.innerHTML = '<div class="error-message">Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo o contáctenos directamente por teléfono.</div>';
                formStatus.className = 'form-status error';
            })
            .finally(function() {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            });
        });
    }

    // Health Check form handling
    const healthCheckForm = document.getElementById('health-check-form');
    if (healthCheckForm) {
        healthCheckForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-health-check');
            const originalText = submitBtn.textContent;
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Get form data
            const formData = {
                company_name: document.getElementById('company-name').value,
                contact_name: document.getElementById('contact-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company_size: document.getElementById('company-size').value,
                current_issues: document.getElementById('current-issues').value
            };

            // Send email using EmailJS
            emailjs.send('service_axmo3vt', 'template_health_check', {
                company_name: formData.company_name,
                contact_name: formData.contact_name,
                from_email: formData.email,
                phone: formData.phone,
                company_size: formData.company_size,
                current_issues: formData.current_issues,
                to_email: 'hola@terminatech.com'
            })
            .then(function(response) {
                // Success - show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-feedback form-feedback-success';
                successMessage.innerHTML = `
                    <strong>¡Solicitud enviada exitosamente!</strong><br>
                    Nos pondremos en contacto con usted en las próximas 24 horas para programar su evaluación gratuita de TI.
                `;
                healthCheckForm.appendChild(successMessage);
                healthCheckForm.reset();
            })
            .catch(function(error) {
                // Error - show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-feedback form-feedback-error';
                errorMessage.innerHTML = `
                    <strong>Hubo un error al enviar la solicitud.</strong><br>
                    Por favor, inténtelo de nuevo o contáctenos directamente por teléfono.
                `;
                healthCheckForm.appendChild(errorMessage);
            })
            .finally(function() {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }
});