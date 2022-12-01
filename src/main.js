import Start from "./scenes/Start.js"
import Map from "./scenes/Map.js"
import Level from "./scenes/Level.js"
import Room1 from "./scenes/Room1.js"
import Room2 from "./scenes/Room2.js"
import Room3 from "./scenes/Room3.js"
import Room4 from "./scenes/Room4.js";
import Battle from "./scenes/Battle.js";
import Level3 from "./scenes/Level3.js"



const config = {
    //zoom: 1.5,
    title: "Curso Phaser",		    //Nombre del juego (opcional)
    url: "http://google.es",	    //Dirección de la página del juego (opcional)
    version: "0.0.1",		        //Versión alfanumérica (opcional)
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1920,
        height: 1080,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },		        //Tipo de renderizado (WEBGL, CANVAS, AUTO)
                                    // AUTO: busca primero WEBGL y si no está disponible eligirá CANVAS
    //width: 640,			            //Ancho de pantalla del juego
    //height: 360, 			        //Alto de pantalla del juego
    //parent: "contenedor",		    //Nombre del id del elemento <div> en el index.html
                                    // se refiere a dónde se pondrá el canvas o lienzo
    pixelArt: true,		            //Diseño con pixeles definidos (no borrosos)
    backgroundColor: "#000000", 	//Color de fondo del canvas ()
    scene: [
        Room3,
        Start,
        Level, 
        Map,
        Room1,
        Room2,
        Room4,
        Room2,
        
        Level3], 
    // scene: [Battle],    //Aquí irá la lista de scenas del juego
    banner:{
        hidePhaser: true,
        text: "#fff00f",
        background: [
                "#16a085",
                "#2ecc71",
                "#e74c3c", 
                "#000000"]
    },
    physics: {
        default: 'arcade',
        'arcade': {
            'gravity': {
                y: 800
            },
            'debug': true
        }
    }
};

const game = new Phaser.Game(config);