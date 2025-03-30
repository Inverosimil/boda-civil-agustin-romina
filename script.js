// Fecha de la boda (YYYY, MM-1, DD, HH, MM, SS)
const weddingDate = new Date(2025, 3, 30, 19, 0, 0);

// Actualiza el contador regresivo
function updateCountdown() {
    const currentDate = new Date();
    const difference = weddingDate - currentDate;
    
    // Calcula días, horas, minutos y segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Actualiza el HTML
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

// Actualiza el contador cada segundo
setInterval(updateCountdown, 1000);

// Ejecuta inmediatamente para evitar un retraso visible
updateCountdown();

// FORMULARIO RSVP
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí normalmente enviarías los datos a un servidor
        // Como es una página estática, sólo mostramos un mensaje
        
        alert('¡Gracias por confirmar tu asistencia!');
        rsvpForm.reset();
    });
}

// ANIMACIÓN DE PÉTALOS
let petals = [];
let petalContainers = [];

function inicializarAnimacionPetalos() {
    // Configurar el contenedor principal para los pétalos
    const mainContainer = document.querySelector('.flower-animation');
    mainContainer.innerHTML = ''; // Limpiar contenedor
    
    // Asegurarse de que el contenedor principal esté en segundo plano
    mainContainer.style.zIndex = '-1';
    
    // Iniciar generación periódica de pétalos
    generarPetalosAleatoriamente();
    
    // Generar pétalos iniciales (menos cantidad para no saturar)
    for (let i = 0; i < 15; i++) {
        generarNuevoPetalo();
    }
}

function generarPetalosAleatoriamente() {
    // Generar pétalos cada cierto tiempo
    setInterval(() => {
        // Generar entre 1 y 3 pétalos cada vez
        const cantidadPetalos = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < cantidadPetalos; i++) {
            generarNuevoPetalo();
        }
        
        // Limpiar pétalos antiguos que ya no se ven
        // para evitar saturar la memoria
        limpiarPetalosAntiguos();
    }, 2000); // Cada 2 segundos
}

function generarNuevoPetalo() {
    const container = document.querySelector('.flower-animation');
    const petalColors = [
        '#e84a5f', // rojo intenso
        '#ff5a5f', // rojo coral
        '#ff7096', // rosa intenso
        '#d81159', // rojo frambuesa
        '#e71d36', // rojo brillante
        '#c21858'  // rosa oscuro
    ];
    
    // Crear el pétalo
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Propiedades físicas del pétalo
    const size = Math.random() * 30 + 15; // Entre 15px y 45px
    const rotationInicial = Math.random() * 360;
    const opacity = Math.random() * 0.4 + 0.3; // Entre 0.3 y 0.7
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];
    
    // Crear SVG para el pétalo
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 100 100");
    
    // Crear un pétalo con forma de lágrima
    const petalPath = document.createElementNS(svgNS, "path");
    
    // Forma de pétalo más orgánica
    const path = `
        M 50 20
        C 70 30, 90 50, 50 90
        C 10 50, 30 30, 50 20
        Z
    `;
    
    petalPath.setAttribute("d", path);
    petalPath.setAttribute("fill", color);
    petalPath.setAttribute("opacity", opacity.toString());
    
    svg.appendChild(petalPath);
    petal.appendChild(svg);
    
    // Posición inicial - siempre desde arriba pero con posición X aleatoria
    const startX = Math.random() * 110 - 5; // Entre -5% y 105% del ancho
    const startY = -20; // Empezar arriba del viewport
    
    // Propiedades para movimiento aleatorio
    const velocidadBase = Math.random() * 0.8 + 0.3; // Entre 0.3 y 1.1
    
    // Añadir variabilidad en la dirección de caída
    const desviacionX = Math.random() * 4 - 2; // Entre -2 y 2
    
    // Tiempo de vida (entre 10 y 15 segundos)
    const tiempoVida = Math.random() * 5000 + 10000;
    
    // Estilos iniciales
    petal.style.position = "absolute";
    petal.style.left = `${startX}%`;
    petal.style.top = `${startY}%`;
    petal.style.transform = `rotate(${rotationInicial}deg)`;
    
    // Momento de creación para controlar tiempo de vida
    const createdAt = Date.now();
    
    // Objeto para mantener el estado y propiedades del pétalo
    const petalObj = {
        element: petal,
        posX: startX,
        posY: startY,
        rotation: rotationInicial,
        velocidad: velocidadBase,
        desviacionHorizontal: desviacionX,
        createdAt: createdAt,
        tiempoVida: tiempoVida,
        isActive: true,
        // Variables para movimiento errático
        lastUpdateTime: Date.now(),
        oscillationOffset: Math.random() * 100,
        waveMagnitude: Math.random() * 2.5 + 0.5, // Magnitud de oscilación entre 0.5 y 3
        waveFrequency: Math.random() * 0.02 + 0.005 // Frecuencia entre 0.005 y 0.025
    };
    
    petals.push(petalObj);
    container.appendChild(petal);
}

function actualizarPetalos() {
    const now = Date.now();
    
    petals.forEach(petal => {
        if (!petal.isActive) return;
        
        const elapsed = now - petal.lastUpdateTime;
        petal.lastUpdateTime = now;
        
        // Tiempo transcurrido en segundos para cálculos de física
        const deltaTime = elapsed / 1000;
        
        // Calcular cambio en posición vertical (caída)
        petal.posY += petal.velocidad * deltaTime * 30; // Velocidad de caída
        
        // Movimiento errático horizontal usando tiempo y oscilación sinusoidal
        const oscillation = Math.sin((now / 1000 + petal.oscillationOffset) * petal.waveFrequency) * petal.waveMagnitude;
        petal.posX += oscillation * deltaTime * 15;
        
        // Rotación gradual aleatoria
        petal.rotation += (Math.random() - 0.5) * 2 * deltaTime * 50;
        
        // Aplicar transformaciones
        if (petal.element) {
            petal.element.style.top = `${petal.posY}%`;
            petal.element.style.left = `${petal.posX}%`;
            petal.element.style.transform = `rotate(${petal.rotation}deg)`;
        }
        
        // Verificar tiempo de vida
        if (now - petal.createdAt > petal.tiempoVida || petal.posY > 120) {
            // Marcar para eliminación si está fuera de la pantalla o expiró
            petal.isActive = false;
        }
    });
    
    // Solicitar siguiente frame de animación
    requestAnimationFrame(actualizarPetalos);
}

function limpiarPetalosAntiguos() {
    // Eliminar pétalos inactivos del DOM y de la colección
    for (let i = petals.length - 1; i >= 0; i--) {
        if (!petals[i].isActive) {
            if (petals[i].element && petals[i].element.parentNode) {
                petals[i].element.parentNode.removeChild(petals[i].element);
            }
            petals.splice(i, 1);
        }
    }
}

// Añadir estilos de los pétalos
function addPetalStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .petal {
            pointer-events: none;
            filter: drop-shadow(0 0 2px rgba(0,0,0,0.1));
            transform-origin: center;
            will-change: transform, top, left;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Iniciar animación cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    addPetalStyles();
    inicializarAnimacionPetalos();
    actualizarPetalos();
    
    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animación de entrada para elementos
    const animatedElements = document.querySelectorAll('.header-content, section h2, .event-card, .gallery-item, .rule-card, .gift-card');
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Animación de entrada para elementos cuando se hacen visibles
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Ejecutar la animación al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
