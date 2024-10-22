//Nombre de Script: claseMensaje.js

export default class Mensaje {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        // Arreglo de rutas de las imágenes
        this.imagenes = [
            '../img/juego/mensajes/mensajesPausa.png',   // Ruta de la imagen de la pantalla de pausa
            '../img/juego/mensajes/mensajesWin01.png',   // Ruta de la imagen de la pantalla de ganar 1
            '../img/juego/mensajes/mensajesWin02.png',   // Ruta de la imagen de la pantalla de ganar 2
            '../img/juego/mensajes/mensajesGameOver.png'   // Ruta de la imagen de la pantalla de perder
        ];

        // Cargar las imágenes
        this.cargarImagenes();
    }

    // Método para cargar las imágenes
    cargarImagenes() {
        this.imagenes.forEach((ruta, index) => {
            this[`imagen${index}`] = new Image();
            this[`imagen${index}`].src = ruta;
        });
    }

    // Método para mostrar la pantalla de pausa, ganar o perder según el índice proporcionado
    mostrarMensaje(indice) {
        const imagen = this[`imagen${indice}`];
        this.ctx.drawImage(imagen, 0, 0, this.canvas.width, this.canvas.height);
    }
}
