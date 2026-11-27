/**
 * Puertas Evolution - Interactividad y Enlace Directo WhatsApp
 */

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "573229590677";
  const navbar = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".pe-navbar .nav-link");
  const navbarCollapseEl = document.getElementById("navbarNav");
  const sections = document.querySelectorAll("section[id]");

  // 1. Navbar elevation on scroll & active link tracking
  const handleScroll = () => {
    if (window.scrollY > 36) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    const scrollPosition = window.scrollY + 130;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 2. Auto-collapse mobile menu when clicking an anchor link
  if (navbarCollapseEl && window.bootstrap) {
    const bsCollapse = new window.bootstrap.Collapse(navbarCollapseEl, {
      toggle: false,
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapseEl.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  // 3. Contact / Quote form -> builds structured WhatsApp request
  const quoteForm = document.getElementById("quoteForm");
  const formFeedback = document.getElementById("formFeedback");

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.checkValidity()) {
        quoteForm.classList.add("was-validated");
        return;
      }

      const clientName = document.getElementById("clientName").value.trim();
      const clientPhone = document.getElementById("clientPhone").value.trim();
      const clientZone = document.getElementById("clientZone").value.trim();
      const serviceType = document.getElementById("serviceType").value;
      const clientMessage = document.getElementById("clientMessage").value.trim();

      const composedText = [
        "Hola, me contacto desde la web de Puertas Evolution.",
        `• Nombre: ${clientName}`,
        `• Teléfono: ${clientPhone}`,
        `• Barrio / Localidad (Bogotá): ${clientZone}`,
        `• Servicio requerido: ${serviceType}`,
        clientMessage ? `• Detalles: ${clientMessage}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        composedText
      )}`;

      if (formFeedback) {
        formFeedback.classList.remove("d-none");
        formFeedback.innerHTML = `
          <i class="fa-brands fa-whatsapp me-2"></i>
          ¡Solicitud lista! Redirigiendo a nuestro WhatsApp oficial <strong>322 959 0677</strong>.
          Si no se abre automáticamente, <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="alert-link">haz clic aquí</a>.
        `;
      }

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
});
