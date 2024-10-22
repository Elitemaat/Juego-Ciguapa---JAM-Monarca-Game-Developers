// Nombre del Script: claseObstaculo.js

export default class Obstaculo {
    constructor(images, index , speed, x, y, width, height) {
        this.images = images;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.currentIndex=index;
    }

    draw() {

        // var borderWidth = 5;
        // this.ctx.strokeStyle = 'red'; // Color del borde
        // this.ctx.lineWidth = borderWidth; // Ancho del borde
        // this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Dibujar el borde

        // Dibujar la imagen actual en la posición (x, y)
        this.ctx.drawImage(this.images[this.currentIndex], this.x, this.y, this.width, this.height);
    }

    update() {
        // Mover el obstáculo hacia la izquierda con la velocidad del fondo
        this.x -= this.speed;
    }

    getSpeed() {
        return this.speed;
    }

    // Método para establecer la velocidad de la ciguapa
    setSpeed(newSpeed) {
        this.speed = newSpeed;
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

    getcurrentIndex(){
        return this.currentIndex;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

}
