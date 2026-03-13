// Actualizar fecha actual
function actualizarFecha() {
    const fecha = new Date();
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
    };
    const fechaElement = document.getElementById('fecha-actual');
    if (fechaElement) {
        let texto = fecha.toLocaleDateString('es-ES', opciones);

        // Capitalizar día de la semana y mes
        texto = texto.replace(/^\w/, c => c.toUpperCase()) // Día
                     .replace(/ de (\w)/, (m, c) => ` de ${c.toUpperCase()}`); // Mes

        fechaElement.textContent = texto;
    }
}

// Actualizar toda la información litúrgica
function actualizarInfoLiturgica() {
    const cicloElement = document.getElementById('ciclo-liturgico');
    const tiempoElement = document.getElementById('tiempo-liturgico');
    const circuloElement = document.getElementById('circulo-tiempo');
    
    if (cicloElement) {
        cicloElement.textContent = determinarCicloLiturgico();
    }
    
    if (tiempoElement && circuloElement) {
        const tiempoInfo = determinarTiempoLiturgico();
        tiempoElement.textContent = tiempoInfo.tiempo;
        circuloElement.style.backgroundColor = tiempoInfo.color;
    }
}

// Smooth scroll para los enlaces del navbar
function initSmoothScroll() {
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    actualizarFecha();
    actualizarInfoLiturgica();
    initSmoothScroll();
    
    // Actualizar la fecha cada minuto (por si el usuario deja la página abierta mucho tiempo)
    setInterval(actualizarFecha, 60000);
});

// Opcional: Actualizar tiempo litúrgico cada día (si la página se deja abierta)
// En un sitio real, esto sería mejor manejarlo del lado del servidor
setInterval(actualizarInfoLiturgica, 86400000); // 24 horas