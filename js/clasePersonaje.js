//Nombre de Script: clasePersonaje.js

export default class Personaje {

    constructor(images, speed, x, y, width, height) {
        this.images = images;  // Array de imágenes que forman la animación del personaje
        this.speed = speed;  // Velocidad de movimiento del personaje
        this.x = x;  // Posición en el eje x del personaje
        this.y = y;  // Posición en el eje y del personaje
        this.width = width;    // Ancho del personaje
        this.height = height;  // Altura del personaje
        this.frameIndex = 0;   // Índice del frame actual de la animación del personaje
        this.tickCount = 0; // Contador para controlar la velocidad de la animación
        this.ticksPerFrame = 10; // Velocidad de la animación (menos es más rápido)

        // Actualiza ticksPerFrame basado en la velocidad inicial
        this.updateTicksPerFrame();
    }

    // Método para calcular y ajustar la velocidad de la animación
    updateTicksPerFrame() {
        // La velocidad de la animación depende de la velocidad del personaje.
        // Cuanto más rápido sea el personaje, más rápido debería ser la animación,
        // por lo tanto, reducimos ticksPerFrame con una relación inversa.
        this.ticksPerFrame = Math.max(1, Math.floor(20 / this.speed)); // Mayor velocidad -> menor ticksPerFrame
    }

    update() {
        this.tickCount++; // Incrementa el contador en cada ciclo de animación

        // Controla el cambio de frame cuando el contador alcanza el límite
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0; // Reinicia el contador
            // Actualiza el índice del frame para la animación
            this.frameIndex = (this.frameIndex + 1) % this.images.length;
        }

        // Genera un número aleatorio entre -2 y 2 para incrementar, disminuir o mantener la posición en x
        const randomX = Math.floor(Math.random() * 5) - 2;
        // Añade el valor aleatorio a la posición actual en x del personaje
        this.x += randomX;

        // Ajusta la velocidad del personaje según el valor de randomX
        if (randomX > 0) {
            // Incrementa la velocidad cuando randomX sea positivo
            this.speed += 1; // Velocidad aumentada
        } else if (randomX < 0) {
            // Disminuye la velocidad cuando randomX sea negativo
            this.speed -= 1; // Velocidad disminuida
        } else {
            // Mantén la velocidad normal cuando randomX sea igual a 0
             // Velocidad normal
        } 

        // Asegúrate de que la posición en x del personaje permanezca dentro del rango [550, 750]
        if (this.x < 550) {
            this.x = 550;
        } else if (this.x > 750) {
            this.x = 750;
        }
    }

    draw() {

        // var borderWidth = 5;
        // this.ctx.strokeStyle = 'blue'; // Color del borde
        // this.ctx.lineWidth = borderWidth; // Ancho del borde
        // this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Dibujar el bordes

        //console.log(this.frameIndex);
        this.ctx.drawImage(this.images[this.frameIndex], this.x, this.y, this.width, this.height);
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
        this.updateTicksPerFrame(); // Actualiza la velocidad de la animación basada en la nueva velocidad del personaje
    }

    getSpeed() {
        return this.speed;
    }

    // Método para obtener la posición en el eje x del Personaje
    getX() {
        return this.x;
    }

    // Método para establecer la posición en el eje x del Personaje
    setX(newX) {
        this.x = newX;
    }

    // Método para obtener la posición en el eje y del Personaje
    getY() {
        return this.y;
    }

    // Método para establecer la posición en el eje y del Personaje
    setY(newY) {
        this.y = newY;
    }

}

