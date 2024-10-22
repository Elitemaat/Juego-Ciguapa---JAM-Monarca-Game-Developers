//Nombre de Script: claseFondo.js

export default class Fondo {
    
    constructor(images, speed) {
        
        this.canvas = document.getElementById('JuegoCiguapa');
        this.ctx = this.canvas.getContext('2d');
        this.images = images;
        this.speed = speed;
        this.x = 0;
        this.juegoPausado = false;

        // Crear instancia 
        this.man = null; // Inicialmente nulo, se establecerá después de cargar las imágenes
        this.ciguapa = null;
        this.mensaje = null; // Agregar una propiedad para la instancia de Mensaje
        this.obstaculo = null;
    }

    draw() {
        
        // Dibujar el fondo
        for (let i = 0; i < this.images.length; i++) {
            this.ctx.drawImage(this.images[i], this.x, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.images[i], this.x + this.canvas.width, 0, this.canvas.width, this.canvas.height);
        }

        // Dibujar al personaje
        if (this.man) {
            this.man.draw();
        }
        
        // Dibujar al ciguapa
        if(this.ciguapa){
            this.ciguapa.draw();
        }

        if(this.obstaculo){
            this.obstaculo.draw();
        }

        // Dibujar el mensaje de pausa si el juego está pausado
        if (this.mensaje && juegoPausado) {
            this.mensaje.mostrarMensaje(0); // Mostrar pantalla de pausa
        }
    }

    update() {
        // Actualizar el fondo
        this.x -= this.speed;
        if (this.x <= -this.canvas.width) {
            this.x = 0;
        }
        
        // Actualizar al personaje
        if (this.man) {
            this.man.update();
        }
        
        // Actualizar al ciguapa
        if (this.ciguapa) {
            this.ciguapa.update();
        }

        // Actualizar al ciguapa
        if (this.obstaculo) {
            this.obstaculo.update();
        }
    }

    setMan(man) {
        this.man = man;
        this.man.setContext(this.ctx); // Pasar el contexto de dibujo al personaje
    }

    setCiguapa(ciguapa) { // Agregar método para establecer la ciguapa
        this.ciguapa = ciguapa;
        this.ciguapa.setContext(this.ctx); // Pasar el contexto de dibujo a la ciguapa
    }

    setMensaje(mensaje) { // Agregar método para establecer el Mensaje
        this.mensaje = mensaje;
        this.mensaje.setContext(this.ctx); // Pasar el contexto de dibujo del Mensaje
    }

    setObstaculo(obstaculo) { // Agregar método para establecer el Mensaje
        this.obstaculo = obstaculo;
        this.obstaculo.setContext(this.ctx); // Pasar el contexto de dibujo el obstaculo
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

    getSpeed() {
        return this.speed;
    }

    setJuegoPausado(newPause){
        this.juegoPausado= newPause;
    }

    getJuegoPausado(){
        return this.getjuegoPausado;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    getContext(){
        return this.ctx;
    }
    
}

