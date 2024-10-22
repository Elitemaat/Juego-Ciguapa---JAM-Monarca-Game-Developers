//Nombre de Script: scriptPrendas.js
let numeroSeleccionado = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos <a> dentro de la lista de menú
    var enlaces = document.querySelectorAll('.menu li a');
    
    // Agregar un event listener a cada enlace
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(event) {
            // Prevenir el comportamiento predeterminado del enlace para evitar redireccionamiento
            //event.preventDefault();
            
            // Obtener el número seleccionado del atributo data-number del enlace
             numeroSeleccionado = this.getAttribute('data-number');
            console.log(numeroSeleccionado)
                      
        });
    });

    // Agregar event listener al botón
    document.getElementById('boton').addEventListener('click', function() {
        // Llamar a la función para enviar el número
        enviarNumero(numeroSeleccionado);
    });

    // Función para enviar el número a la siguiente página
    function enviarNumero(numeroSeleccionado) {
        // Redireccionar a la página siguiente pasando el número como parámetro de URL
        window.location.href = '../view/juegoCiguapa.html?numero=' + numeroSeleccionado;
    }
});