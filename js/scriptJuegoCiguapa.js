//Nombre de Script: scriptJuegoCiguapa.js

import Fondo from './claseFondo.js';
import Personaje from './clasePersonaje.js';
import Ciguapa from './claseCiguapa.js';
import Mensaje from './claseMensaje.js';
import Obstaculo from './claseObstaculo.js';

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
let numTrajeCigupa;

// Variables para controlar la generación de obstáculos
let obstaculos = []; // Array para almacenar los obstáculos
let intervaloGeneracionObstaculos = 5000; // Intervalo de tiempo para generar obstáculos (en milisegundos)
let tiempoUltimaGeneracion = 0; // Tiempo del último obstáculo 

let juegoTerminado = false; // Establecer el estado del juego 

function iniciarJuego() {
    // Función para cargar una imagen
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // Función para cargar todas las imágenes de un array de rutas
    function loadImages(imagePaths) {
        return Promise.all(imagePaths.map(path => loadImage(path)));
    }

    // Array de rutas de imágenes para el fondo
    const fondoImagePaths = [
        '../img/juego/fondos/fondoBosque/fondoBosque01.PNG',
        '../img/juego/fondos/fondoBosque/fondoBosque02.PNG',
        '../img/juego/fondos/fondoBosque/fondoBosque03.PNG',
        '../img/juego/fondos/fondoBosque/fondoBosque04.PNG'
    ];

    // Array de rutas de imágenes para los obstáculos
    const obstaculoImagePaths = [
        '../img/juego/obstaculos/obstaculo01.PNG',
        '../img/juego/obstaculos/obstaculo02.PNG',
        '../img/juego/obstaculos/obstaculo03.PNG',
        '../img/juego/obstaculos/obstaculo04.PNG',
    ];

    // Array de rutas de imágenes para el personaje (hombre)
    const manImagePaths = [
        '../img/juego/hombres/hombreA/correr/MenRun01.PNG',
        '../img/juego/hombres/hombreA/correr/MenRun02.PNG',
        '../img/juego/hombres/hombreA/correr/MenRun03.PNG',
    ];

    // Array de rutas de imágenes para la ciguapa
    const ciguapaImagePaths = [
        '../img/juego/ciguapa/correr/ciguapaRun01.PNG',
        '../img/juego/ciguapa/correr/ciguapaRun02.PNG',
        '../img/juego/ciguapa/correr/ciguapaRun03.PNG',
        '../img/juego/ciguapa/quieta/ciguapaQuieta01.PNG',
        '../img/juego/ciguapa/salto/ciguapaSalto01.PNG',
    ];

    // Cargar todas las imágenes necesarias
    Promise.all([
        loadImages(fondoImagePaths),
        loadImages(obstaculoImagePaths),
        loadImages(manImagePaths),
        loadImages(ciguapaImagePaths)
    ]).then(([fondoImages, obstaculoImages, manImages, ciguapaImages]) => {
        // Crear instancias de las clases y continuar con el juego

        
        fondo = new Fondo(fondoImages, fondoSpeed); // Ejemplo de velocidad 2, ajusta según necesites
        man = new Personaje(manImages, fondoSpeed, 700, 295, 130, 130);
        ciguapa = new Ciguapa(ciguapaImages, 350, 300, 130, 130);

        // Crear una instancia de Mensaje
        mensaje = new Mensaje(fondo.canvas, fondo.getContext());
        
        // Establecer el contexto para las clases que lo necesiten
        man.setContext(fondo.getContext());
        ciguapa.setContext(fondo.getContext());
    
        // Establecer el personaje y la ciguapa en el fondo
        fondo.setMan(man);
        fondo.setCiguapa(ciguapa);

        // Función principal de actualización del juego
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

            obstaculos.forEach(obstaculo => {
                obstaculo.setSpeed(fondoSpeed);

            }); 

            // Ajustar dinámicamente el intervalo de generación de obstáculos
            intervaloGeneracionObstaculos = Math.max(2000, 5000 / fondoSpeed); // Ajusta los valores según sea necesario
        }, 20000); // 20 segundos

        // Generar obstáculos de forma continua
        setInterval(() => {
            // Crear un obstáculo con una imagen aleatoria
            const randomImageIndex = Math.floor(Math.random() * obstaculoImages.length);
            const randomObstacle = new Obstaculo(obstaculoImages, randomImageIndex, fondoSpeed, fondo.canvas.width, 320, 130, 130);
            randomObstacle.setContext(fondo.getContext());

            // Agregar el obstáculo a la lista de obstáculos
            obstaculos.push(randomObstacle);
        }, intervaloGeneracionObstaculos);


    }).catch(error => {
        console.error('Error al cargar las imágenes:', error);
    });
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

    // Agregar el texto con el valor de contadorAlcanzadoMan en la parte superior izquierda del canvas
    fondo.ctx.fillStyle = 'white'; // Color del texto
    fondo.ctx.font = '20px Arial'; // Fuente y tamaño del texto
    fondo.ctx.fillText('Víctimas: ' + contadorAlcanzadoMan, 10, 30); // Texto y posición
    

    // Actualizar la posición de los obstáculos y dibujarlos
    obstaculos.forEach(obstaculo => {
        // Actualizar la posición del obstáculo en función de la velocidad del fondo
        obstaculo.update(fondoSpeed);
        // Dibujar el obstáculo
        obstaculo.draw();

        // Verificar si el obstáculo ha salido completamente del lado izquierdo de la escena
        if (obstaculo.getX() + obstaculo.width < 0) {
            // Si ha salido de la escena, eliminarlo del array de obstáculos
            const index = obstaculos.indexOf(obstaculo);
            if (index !== -1) {
                obstaculos.splice(index, 1);
            }
        }

        // Verificar colisión entre la ciguapa y el obstáculo
        const index= obstaculo.getcurrentIndex()
        verificarColisionObstaculo(index, obstaculo);

    });


    // Verificar colisión entre la ciguapa y el hombre
    if (detectarColision(ciguapa, man)) {
        // Mostrar el mensaje de "win"
        const winRandom = Math.floor(Math.random() * 2) + 1;
        mensaje.mostrarMensaje(winRandom); // Índice 1 corresponde al mensaje de "win"
        // Reiniciar el juego
        const gameWin = document.getElementById('gameWinSound');
        gameWin.play();
        contadorAlcanzadoMan++;
        document.addEventListener('keydown', reiniciarConTecla);
        
        return;
    }

    // si la Ciguapa se queda atras
    if (ciguapa.getX() + ciguapa.width < 0) {
        mensaje.mostrarMensaje(3); // Índice 3 corresponde al mensaje de Game Over
        // Detener la animación
        const gameOverSound = document.getElementById('gameOverSound');
        gameOverSound.play();
        cancelAnimationFrame(animationId);
        // Eliminar todos los objetos del arreglo de obstáculos
        
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
    
     // Si el juego está en estado de "Game Over", no continuar con la animación
     if (juegoTerminado) {
        setTimeout(cancelAnimationFrame(animationId), 1000); // 10000 milisegundos = 10
        return;
    }
    
    
}

// Llamar a la función para iniciar el juego
iniciarJuego();


//------------------------Funciones del Juego------------------------

//verifica las Coliciones de cad Obsatculo
function verificarColisionObstaculo(indice,obstaculo) {
    let offsetX = -100;
    let offsetY = 100;

    // Establecer offsetX y offsetY dependiendo del índice
    // Definir los valores de offsetX y offsetY según el índice
    switch (indice) {
        case 0:
            offsetX = -85;
            offsetY = -69;
            break;
        case 1:
            offsetX = -90;
            offsetY = -72;
            break;
        case 2:
            offsetX = -100;
            offsetY = -50;
            break;
        case 3:
            offsetX = -90;
            offsetY = -100;
            break;
        default:
            // Configurar valores predeterminados para otros obstáculos
            offsetX = -100;
            offsetY = -100;
            break;
    }

    // Verificar colisión entre la ciguapa y el obstáculo con los valores adecuados de offsetX y offsetY
    if (detectarColision(ciguapa, obstaculo, offsetX, offsetY)) {
        // Mostrar el mensaje de Game Over
        mensaje.mostrarMensaje(3); // Índice 3 corresponde al mensaje de Game Over
        // Establecer el estado del juego como "terminado"     
        juegoTerminado = true;
        // Detener la animación
        const gameOverSound = document.getElementById('gameOverSound');
        gameOverSound.play();
        cancelAnimationFrame(animationId);
        // Eliminar todos los objetos del arreglo de obstáculos
        obstaculos.splice(0, obstaculos.length);
        // Retornar para salir de la función
        return;
    }
}


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
    setTimeout(reiniciarJuego, 2500); // 10000 milisegundos = 10 segundos
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
    console.log('El número recibido es: ' + numTrajeCigupa);
});

document.addEventListener('keydown', event => {
    // Si se presiona la tecla 'd'
    if (event.key === 'D' || event.key === 'd') {
        // Llamar a la función para que la ciguapa salte
        ciguapa.jump();
    }
});

