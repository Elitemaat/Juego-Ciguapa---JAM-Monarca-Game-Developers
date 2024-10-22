//Nombre de Script: scriptJuegoCiguapa.js

import Fondo from './claseFondo.js';
import Personaje from './clasePersonaje.js';
import Ciguapa from './claseCiguapa.js';
import Mensaje from './claseMensaje.js';
import Obstaculo from './claseObstaculo.js';

let numTrajeCigupa;

// Definir las imágenes del fondo y la velocidad de desplazamiento
const fondoImages = [
    '../img/juego/fondos/fondoBosque/fondoBosque01.PNG',
    '../img/juego/fondos/fondoBosque/fondoBosque02.PNG',
    '../img/juego/fondos/fondoBosque/fondoBosque03.PNG',
    '../img/juego/fondos/fondoBosque/fondoBosque04.PNG'
];
let fondoSpeed = 1; // Cambiado a let para que pueda ser modificado

let fondo; // Instanciar el fondo
let man; // Instanciar el personaje
let ciguapa;  // Instanciar de la Ciguapa
let mensaje; //Instanciaa de los Mensajes del Juergo

let animationId;// Variable para controlar la animación

let juegoPausado = false;  // Variable para controlar si el juego está pausado
let teclaPresionada = false; // Variable para controlar si la tecla "a" o "espacio" está siendo presionada
let permitirPresionTecla = true; // Variable para controlar si se permite la detección de nuevos eventos de presión de tecla
let contadorAlcanzadoMan = 0; // contador de puntos 

// Variables para controlar la generación de obstáculos
let obstaculos = []; // Array para almacenar los obstáculos
const intervaloGeneracionObstaculos = 5000; // Intervalo de tiempo para generar obstáculos (en milisegundos)
let tiempoUltimaGeneracion = 0; // Tiempo del último obstáculo generado

 // Cargar imágenes de los obstaculos
 const obstaculoImages = [
    '../img/juego/obstaculos/obstaculo01.PNG',
    '../img/juego/obstaculos/obstaculo02.PNG',
    '../img/juego/obstaculos/obstaculo03.PNG',
    '../img/juego/obstaculos/obstaculo04.PNG',
];

// Cargar las imágenes de los obstáculos
function cargarImagenesObstaculos(imagePaths) {
    return Promise.all(imagePaths.map(src => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    })));
}

// Cargar las imágenes de los obstáculos
Promise.all(obstaculoImages.map(src => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
})))
.then(images => {
    // Una vez que se carguen todas las imágenes de los obstáculos, continuar con el juego
    iniciarGeneracionObstaculos(); // Llamar a la función para iniciar la generación de obstáculos
})
.catch(error => {
    console.error("Error cargando las imágenes de los obstáculos:", error);
});


// Función para iniciar la generación de obstáculos
function iniciarGeneracionObstaculos() {
    setInterval(() => {
        generarObstaculo();
    }, intervaloGeneracionObstaculos);
}


// Cargar las imágenes del fondo
Promise.all(fondoImages.map(src => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
})))
.then(images => {
    // Crear instancia de Fondo con las imágenes del fondo y la velocidad definida
    fondo = new Fondo(images, fondoSpeed);

    // Iniciar el juego una vez cargadas las imágenes
    iniciarJuego();
})
.catch(error => {
    console.error("Error cargando las imágenes del fondo:", error);
});

// Función para iniciar el juego
function iniciarJuego() {

    // Cargar imágenes del personaje "Man"
    const manImages = [
        '../img/juego/hombres/hombreA/correr/MenRun01.PNG',
        '../img/juego/hombres/hombreA/correr/MenRun02.PNG',
        '../img/juego/hombres/hombreA/correr/MenRun03.PNG',
    ];

    // Cargar imágenes de la Ciguapa
    const ciguapaImages = [
        '../img/juego/ciguapa/correr/ciguapaRun01.PNG',
        '../img/juego/ciguapa/correr/ciguapaRun02.PNG',
        '../img/juego/ciguapa/correr/ciguapaRun03.PNG',
        '../img/juego/ciguapa/quieta/ciguapaQuieta01.PNG',
        '../img/juego/ciguapa/salto/ciguapaSalto01.PNG',
    ];

    
    // Cargar imágenes del personaje y de la Ciguapa
    Promise.all([
        cargarImagenes(manImages),
        cargarImagenes(ciguapaImages),
    ])
    .then(([manImages, ciguapaImages]) => {
        // Crear instancia del personaje "Man" con las imágenes cargadas, velocidad y posición definidas
        man = new Personaje(manImages, fondoSpeed, 700, 295, 130, 130);
        // Crear instancia de la Ciguapa con las imágenes cargadas, velocidad y posición definidas
        ciguapa = new Ciguapa(ciguapaImages, 350, 300, 130, 130);

        // Crear una instancia de Mensaje
        mensaje = new Mensaje(fondo.canvas, fondo.ctx);

        // Establecer el personaje y la Ciguapa en el fondo
        fondo.setMan(man);
        fondo.setCiguapa(ciguapa);

        // Comenzar la animación del juego
        animate();

        // Iniciar el temporizador para aumentar la velocidad del fondo cada 20 segundos
        setInterval(() => {
            // Incrementar la velocidad del fondo
            fondoSpeed++;
            // Establecer la nueva velocidad del fondo
            fondo.setSpeed(fondoSpeed);
            // Establecer la nueva velocidad del personaje
            man.setSpeed(fondoSpeed);

            ciguapa.setSpeedFondo(fondoSpeed);

        }, 10000); // 20 segundos

        // Iniciar la generación de obstáculos
        iniciarGeneracionObstaculos();
    })
    .catch(error => {
        console.error("Error cargando las imágenes:", error);
    });
}

// Función para cargar imágenes
function cargarImagenes(imagePaths) {
    return Promise.all(imagePaths.map(src => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    })));
}

// Función para animar el juego
function animate() {
    // Limpiar el lienzo antes de dibujar
    fondo.ctx.clearRect(0, 0, fondo.canvas.width, fondo.canvas.height);
    // Actualizar la posición y la animación del fondo y de los personajes
    fondo.update();
    // Actualizar la velocidad del personaje para que coincida con la velocidad del fondo
    man.setSpeed(fondo.getSpeed());
    
    ciguapa.setSpeedFondo(fondo.getSpeed());
    // Dibujar el fondo y los personajes en el lienzo
    fondo.draw();

    // Actualizar y dibujar los obstáculos
    obstaculos.forEach(obstaculo => {
        obstaculo.update();
    });
        
    
    // Verificar colisión entre la ciguapa y el hombre
    if (detectarColision(ciguapa, man)) {
        // Mostrar el mensaje de "win"
        const winRandom = Math.floor(Math.random() * 2) + 1;
        mensaje.mostrarMensaje(winRandom); // Índice 1 corresponde al mensaje de "win"
        // Reiniciar el juego
        
        contadorAlcanzadoMan++;
        document.addEventListener('keydown', reiniciarConTecla);
        
        return;
    }

    // si la Ciguapa se queda atras
    if (ciguapa.getX() + ciguapa.width < 0) {
        mensaje.mostrarMensaje(3); // Índice 3 corresponde al mensaje de Game Over
        // Detener la animación
        cancelAnimationFrame(animationId);
        // Finalizar el juego
        return;
    }

    // Si el juego no está pausado y la tecla está presionada, mover la Ciguapa hacia la derecha
    if (!juegoPausado && teclaPresionada) {
        ciguapa.moveRight();
    }

    // Si el juego no está pausado, seguir animando
    if (!juegoPausado) {
        animationId = requestAnimationFrame(animate);
    }
}


// Función para generar un obstáculo y agregarlo al arreglo
function generarObstaculo() {
    const speed = fondoSpeed; // Velocidad del obstáculo igual a la del fondo
    const x = fondo.canvas.width + 130; // Posición inicial fuera del lienzo (130 es el ancho del obstáculo)
    const y = 300; // Posición vertical del obstáculo (ajustar según necesidades)
    const index = Math.floor(Math.random() * obstaculoImages.length); // Índice aleatorio para la imagen del obstáculo
    console.log(obstaculoImages[index]);
    // Crear una nueva instancia de Obstaculo con los parámetros definidos
    const obstaculo = new Obstaculo(obstaculoImages, index, speed, x, y, 130, 130);

    // Agregar el obstáculo al arreglo de obstáculos
    obstaculos.push(obstaculo);
}

//------------------------Funciones del Juego------------------------

// Función para detectar colisión entre dos objetos rectangulares
function detectarColision(objeto1, objeto2, offsetX = -100, offsetY = 100) {
    // Obtener las coordenadas de los centros de los objetos
    const objeto1X = objeto1.x + objeto1.width / 2;
    const objeto1Y = objeto1.y + objeto1.height / 2;
    const objeto2X = objeto2.x + objeto2.width / 2;
    const objeto2Y = objeto2.y + objeto2.height / 2;

    // Calcular las distancias entre los centros de los objetos en ambos ejes
    const distanciaX = Math.abs(objeto1X - objeto2X) - offsetX; // Restar el offset en el eje X
    const distanciaY = Math.abs(objeto1Y - objeto2Y) - offsetY; // Restar el offset en el eje Y

    // Calcular la distancia mínima permitida para considerar una colisión
    const distanciaMinX = objeto1.width / 2 + objeto2.width / 2;
    const distanciaMinY = objeto1.height / 2 + objeto2.height / 2;

    // Verificar si la distancia entre los centros es menor que la distancia mínima permitida en ambos ejes
    return distanciaX < distanciaMinX && distanciaY < distanciaMinY;
}

// Función para reiniciar el juego al presionar cualquier tecla
function reiniciarConTecla(event) {
    // Reiniciar el juego al presionar cualquier tecla
    // Esperar a que se presione cualquier tecla para reiniciar
    setTimeout(reiniciarJuego, 2000); // 10000 milisegundos = 10 segundos
    // Quitar el evento de escucha para evitar múltiples reinicios
    document.removeEventListener('keydown', reiniciarConTecla);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciar la posición de la ciguapa
    ciguapa.x = 350;
    ciguapa.y = 300;
    // Reiniciar la velocidad del fondo y del personaje
    fondoSpeed = 1;
    fondo.setSpeed(fondoSpeed);
    man.setSpeed(fondoSpeed);
    ciguapa.setSpeedFondo(fondoSpeed);
    
    // Reiniciar la animación
    animate();
}

//--------------------------Controles Cigupa--------------------------

// Manejador de eventos de teclado para presionar y soltar teclas
document.addEventListener('keydown', event => {
    // Si se presiona la tecla 'a' o 'Espacio'
    if (event.key === 'A' || event.key === 'a' || event.key === ' ') {
        // Indicar que la tecla está presionada
        teclaPresionada = true;
        // Llamar a la función para mover la Ciguapa
        ciguapa.moveRight();
    }
});

document.addEventListener('keyup', event => {
    // Si se suelta la tecla 'a' o 'Espacio'
    if (event.key === 'A' || event.key === 'a' || event.key === ' ') {
        // Indicar que la tecla ya no está presionada
        teclaPresionada = false;
    }
});

//--------------------------Controles Juego--------------------------

// Manejador de eventos de teclado para pausar el juego
document.addEventListener('keydown', event => {
    // Si se presiona la tecla 'r'
    if (event.key === 'R' || event.key === 'r') {
        // Cambiar el estado de pausa del juego
        juegoPausado = !juegoPausado;

        // Si el juego está pausado, detener la animación
        if (juegoPausado) {
            cancelAnimationFrame(animationId);
            // Mostrar la pantalla de pausa usando la instancia de Mensaje
            mensaje.mostrarMensaje(0); // El índice 0 corresponde a la pantalla de pausa en el arreglo de imágenes
        } else {
            // Si el juego se reanuda, volver a iniciar la animación
            animate();
        }
    }
});

//Traje a usar por la siguapa

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtener el valor del parámetro "numero"
    numTrajeCigupa = urlParams.get('numero');
    
    // Hacer lo que necesites con el valor obtenido
    // console.log('El número recibido es: ' + numTrajeCigupa);
});

document.addEventListener('keydown', event => {
    // Si se presiona la tecla 'd'
    if (event.key === 'D' || event.key === 'd') {
        // Llamar a la función para que la ciguapa salte
        ciguapa.jump();
    }
});