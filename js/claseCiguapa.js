//Nombre de Script: claseCiguapa.js

export default class Ciguapa {
    
    constructor(imagCiguapa, x, y, width, height) {
        this.imagCiguapa = imagCiguapa; // Array de imágenes para la animación de correr
        this.speed = 0;  // Velocidad de movimiento de la ciguapa
        this.SpeedFondo = 0;
        this.x = x;  // Posición en el eje x de la ciguapa
        this.y = y;  // Posición en el eje y de la ciguapa
        this.width = width;    // Ancho de la ciguapa
        this.height = height;  // Altura de la ciguapa
        this.frameIndex = 0;   // Índice del frame actual de la animación
        this.tickCount = 0; // Contador para controlar la velocidad de la animación
        this.ticksPerFrame = 10; // Velocidad de la animación (menos es más rápido)

        this.gravity = 0.5; // Valor de la gravedad (ajústalo según la fuerza de gravedad deseada)
        this.groundY = 300; // Posición vertical del suelo (ajústalo según la posición del suelo en tu juego)
        this.verticalSpeed = 0; // Velocidad vertical inicial de la ciguapa
        this.isJumping = false; // Indica si la ciguapa está en medio de un salto

        // Actualiza ticksPerFrame basado en el número de imágenes en imagCiguapa
        this.updateTicksPerFrame();
    }

    // Método para calcular y ajustar la velocidad de la animación
    updateTicksPerFrame() {
        // El número de imágenes en imagCiguapa determina la cantidad de frames
        this.ticksPerFrame = Math.max(1, Math.floor(20 / this.speed)); // Mayor velocidad -> menor ticksPerFrame
    }

    update() {
        this.tickCount++; // Incrementa el contador en cada ciclo de animación
    
        // Controla el cambio de frame cuando el contador alcanza el límite
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0; // Reinicia el contador
            // Incrementa el índice del frame
            this.frameIndex = (this.frameIndex + 1) % (3);
        }
        
        this.x-=this.getSpeedFondo();
        this.slowDown(); 
        
        // Actualiza la posición vertical de la ciguapa basada en la velocidad Y
        // Si la ciguapa está en medio de un salto
        if (this.isJumping) {
            // Aplica la velocidad vertical para el salto
            this.y += this.verticalSpeed;
            this.x += 2;

            // Reduce la velocidad vertical para simular la gravedad
            this.verticalSpeed += this.gravity;

            // Si la ciguapa alcanza el suelo, detiene el salto
            if (this.y >= this.groundY) {
                this.y = this.groundY; // Ajusta la posición para asegurar que la ciguapa esté en el suelo
                this.isJumping = false; // Marca que el salto ha terminado
                this.verticalSpeed = 0; // Reinicia la velocidad vertical
            }
        }
    }

    draw() {

        // var borderWidth = 5;
        // this.ctx.strokeStyle = 'red'; // Color del borde
        // this.ctx.lineWidth = borderWidth; // Ancho del borde
        // this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Dibujar el borde

        // Verificar si la ciguapa está saltando
        if (this.isJumping) {
            // Si está saltando, dibuja la imagen de salto (imagCiguapa[4])
            this.ctx.drawImage(this.imagCiguapa[4], this.x, this.y, this.width, this.height);
        } else {
            // Si no está saltando, aplica la lógica original
            if(this.getSpeed() <= 0){
                // Si la cigupa está parada
                this.ctx.drawImage(this.imagCiguapa[3], this.x, this.y, this.width, this.height);
            }
            else{
                // Si la cigupa está corriendo
                this.ctx.drawImage(this.imagCiguapa[this.frameIndex], this.x, this.y, this.width, this.height);
            }
        }
    }

    // Método para obtener la velocidad de la ciguapa
    getSpeed() {
        return this.speed;
    }

    // Método para establecer la velocidad de la ciguapa
    setSpeed(newSpeed) {
        this.speed = newSpeed;
        this.updateTicksPerFrame(); // Actualizar ticksPerFrame cuando cambie la velocidad
    }

    getSpeedFondo() {
        return this.SpeedFondo;
    }

    // Método para establecer la velocidad de la ciguapa
    setSpeedFondo(newSpeedFondo) {
        this.SpeedFondo = newSpeedFondo;
    }

    // Método para obtener la posición en el eje x de la ciguapa
    getX() {
        return this.x;
    }

    // Método para establecer la posición en el eje x de la ciguapa
    setX(newX) {
        this.x = newX;
    }

    // Método para obtener la posición en el eje y de la ciguapa
    getY() {
        return this.y;
    }

    // Método para establecer la posición en el eje y de la ciguapa
    setY(newY) {
        this.y = newY;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    // Método para mover la ciguapa hacia la derecha
    moveRight() {
        
        // Mover la ciguapa hacia la derecha
        const newX =this.getSpeedFondo();
        this.setX(this.getX() + newX+ 1); // Ajusta el valor 10 según tu necesidad de velocidad
        if (this.getSpeed() < 20){
            this.setSpeed(this.getSpeed() + 2);
        }
        
    }

    // Método para detener el movimiento de la ciguapa
    slowDown() {
        if(this.getSpeed() > 0){
            this.setX(this.getX() - 1); // Ajusta el valor 10 según la necesidad de velocidad
            this.setSpeed(this.getSpeed()-1); 
        }  
    }

    jump() {
        // Solo permite que la ciguapa salte si no está en medio de otro salto
        if (!this.isJumping) {
            this.isJumping = true; // Marca que la ciguapa está en medio de un salto
    
            // Aplica una velocidad inicial hacia arriba para simular el salto
            this.verticalSpeed = -10; // Puedes ajustar este valor según la altura y la velocidad deseada del salto
        }
    }
}

