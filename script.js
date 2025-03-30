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

// ANIMACIÓN DE FLORES
function createFlowerAnimation() {
    const flowerContainer = document.querySelector('.flower-animation');
    const petalColors = [
        '#e84a5f', // rojo intenso
        '#ff5a5f', // rojo coral
        '#ff7096', // rosa intenso
        '#d81159', // rojo frambuesa
        '#e71d36', // rojo brillante
        '#c21858'  // rosa oscuro
    ];
    const numFlowers = 15; // Menos flores para mejor rendimiento (más detalladas)
    
    // Crear flores más detalladas
    for (let i = 0; i < numFlowers; i++) {
        createRealisticFlower(flowerContainer, petalColors);
    }
}

function createRealisticFlower(container, colors) {
    // Crear contenedor de la flor
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    // Determinar desde qué esquina aparecerá la flor (0-3)
    const corner = Math.floor(Math.random() * 4);
    let startX, startY;
    
    switch (corner) {
        case 0: // Esquina superior izquierda
            startX = -5;
            startY = -5;
            break;
        case 1: // Esquina superior derecha
            startX = 105;
            startY = -5;
            break;
        case 2: // Esquina inferior izquierda
            startX = -5;
            startY = 105;
            break;
        case 3: // Esquina inferior derecha
            startX = 105;
            startY = 105;
            break;
    }
    
    // Puntos finales aleatorios dentro del viewport
    const endX = 20 + Math.random() * 60; // entre 20% y 80% del ancho
    const endY = 20 + Math.random() * 60; // entre 20% y 80% del alto
    
    const flowerSize = Math.random() * 20 + 50; // entre 50px y 70px
    const animationDuration = Math.random() * 20 + 15; // entre 15 y 35 segundos
    const delay = Math.random() * 10; // retraso entre 0 y 10 segundos
    
    // Número de pétalos (entre a y 10)
    const numPetals = Math.floor(Math.random() * 3) + 8;
    
    // Color base para esta flor
    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Crear SVG para la flor
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", flowerSize);
    svg.setAttribute("height", flowerSize);
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    
    // Crear capa de pétalos externos (más grandes)
    for (let i = 0; i < numPetals; i++) {
        // Ángulo para distribuir los pétalos uniformemente
        const angle = (i / numPetals) * 2 * Math.PI;
        
        // Crear un pétalo con curvas bezier para un aspecto más natural
        const petal = document.createElementNS(svgNS, "path");
        
        // Punto de inicio (centro de la flor)
        const startPointX = 50;
        const startPointY = 50;
        
        // Punto final del pétalo
        const endPointX = 50 + 40 * Math.cos(angle);
        const endPointY = 50 + 40 * Math.sin(angle);
        
        // Puntos de control para las curvas bezier
        const ctrlPoint1X = 50 + 20 * Math.cos(angle - 0.3);
        const ctrlPoint1Y = 50 + 20 * Math.sin(angle - 0.3);
        const ctrlPoint2X = 50 + 30 * Math.cos(angle + 0.3);
        const ctrlPoint2Y = 50 + 30 * Math.sin(angle + 0.3);
        
        // Definir la ruta del pétalo con curvas bezier
        const path = `
            M ${startPointX} ${startPointY}
            C ${ctrlPoint1X} ${ctrlPoint1Y}, ${ctrlPoint2X} ${ctrlPoint2Y}, ${endPointX} ${endPointY}
            C ${ctrlPoint2X + 5} ${ctrlPoint2Y + 5}, ${ctrlPoint1X + 5} ${ctrlPoint1Y + 5}, ${startPointX} ${startPointY}
            Z
        `;
        
        petal.setAttribute("d", path);
        petal.setAttribute("fill", baseColor);
        petal.setAttribute("opacity", "0.9");
        petal.setAttribute("stroke", secondaryColor);
        petal.setAttribute("stroke-width", "0.5");
        
        svg.appendChild(petal);
    }
    
    // Crear una segunda capa de pétalos internos (más pequeños)
    for (let i = 0; i < numPetals; i++) {
        const angle = (i / numPetals) * 2 * Math.PI + (Math.PI / numPetals); // Offset para intercalar
        
        const petal = document.createElementNS(svgNS, "path");
        
        const startPointX = 50;
        const startPointY = 50;
        
        // Pétalo más pequeño
        const endPointX = 50 + 25 * Math.cos(angle);
        const endPointY = 50 + 25 * Math.sin(angle);
        
        const ctrlPoint1X = 50 + 10 * Math.cos(angle - 0.2);
        const ctrlPoint1Y = 50 + 10 * Math.sin(angle - 0.2);
        const ctrlPoint2X = 50 + 20 * Math.cos(angle + 0.2);
        const ctrlPoint2Y = 50 + 20 * Math.sin(angle + 0.2);
        
        const path = `
            M ${startPointX} ${startPointY}
            C ${ctrlPoint1X} ${ctrlPoint1Y}, ${ctrlPoint2X} ${ctrlPoint2Y}, ${endPointX} ${endPointY}
            C ${ctrlPoint2X + 3} ${ctrlPoint2Y + 3}, ${ctrlPoint1X + 3} ${ctrlPoint1Y + 3}, ${startPointX} ${startPointY}
            Z
        `;
        
        petal.setAttribute("d", path);
        petal.setAttribute("fill", secondaryColor);
        petal.setAttribute("opacity", "0.95");
        
        svg.appendChild(petal);
    }
    
    // Crear el centro de la flor
    const flowerCenter = document.createElementNS(svgNS, "circle");
    flowerCenter.setAttribute("cx", "50");
    flowerCenter.setAttribute("cy", "50");
    flowerCenter.setAttribute("r", "8");
    flowerCenter.setAttribute("fill", "#c21858"); // Centro rosa oscuro
    
    // Añadir detalles al centro para más realismo
    const centerPattern = document.createElementNS(svgNS, "circle");
    centerPattern.setAttribute("cx", "50");
    centerPattern.setAttribute("cy", "50");
    centerPattern.setAttribute("r", "6");
    centerPattern.setAttribute("fill", "#e71d36"); // Rojo brillante
    centerPattern.setAttribute("opacity", "0.7");
    
    svg.appendChild(flowerCenter);
    svg.appendChild(centerPattern);
    
    // Agregar SVG al contenedor de flor
    flower.appendChild(svg);
    
    // Aplicar estilos al contenedor
    flower.style.position = 'absolute';
    flower.style.width = `${flowerSize}px`;
    flower.style.height = `${flowerSize}px`;
    flower.style.opacity = '0';
    flower.style.zIndex = '10';
    
    // Agregar la flor al contenedor
    container.appendChild(flower);
    
    // Animación única para cada flor
    const animationName = `flower${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Definir animación desde las esquinas al centro
    const keyframes = `
    @keyframes ${animationName} {
        0% {
            left: ${startX}%;
            top: ${startY}%;
            opacity: 0;
            transform: scale(0.3) rotate(0deg);
            filter: drop-shadow(0 0 2px rgba(255,255,255,0.7));
        }
        15% {
            opacity: 0.9;
            filter: drop-shadow(0 0 3px rgba(255,255,255,0.8));
        }
        80% {
            opacity: 0.9;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.8));
        }
        100% {
            left: ${endX}%;
            top: ${endY}%;
            opacity: 0;
            transform: scale(1) rotate(${Math.random() * 180 - 90}deg);
            filter: drop-shadow(0 0 5px rgba(255,255,255,0.6));
        }
    }`;
    
    // Aplicar la animación
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
    
    flower.style.animation = `${animationName} ${animationDuration}s ease-in-out ${delay}s infinite`;
}

// Añadir estilos de las flores
function addFlowerStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    
    const styles = `
    .flower {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        filter: drop-shadow(0 0 3px rgba(255,255,255,0.5));
    }
    
    .flower-animation {
        overflow: hidden;
    }
    `;
    
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Iniciar animación cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    addFlowerStyles();
    createFlowerAnimation();
    
    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animación de entrada para elementos cuando se hacen visibles
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.event-card, .gift-card, .gallery-item');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Si el elemento está en el viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.style.animation = 'fadeIn 1s forwards';
            }
        });
    };
    
    // Ejecutar la animación al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
