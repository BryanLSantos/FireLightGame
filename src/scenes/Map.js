class Map extends Phaser.Scene {
    constructor() {
        super({ key: 'Map' });
    }

    init() {
        
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;

        this.minScale = 0.75;
        this.maxScale = 1;
        this.deckSizeDelta = 0.05;

        this.bgDelta = 2;
    }
    preload() {
        this.load.path = './assets/';
        this.load.image(['Puntero']);

        this.load.image('MapaA', 'scenamap/MapaA.png');
        this.load.image('Title', 'scenastart/Title.png');
        this.load.image('World', 'scenamap/World.png');
        this.load.image('Locked', 'scenamap/Locked.png');
    }
    create() {

        this.scene.stop('Start');
        //Puntero
        this.puntero = this.add.image(0, 0, 'Puntero').setOrigin(0.15, 0.15).setDepth(12).setScale(1.5);
        //Background con movimiento
        this.fondo = this.add.image(0, 0, "MapaA").setOrigin(0, 0).setDepth(-1).setScale(1.5),

        //Imagen de Titulo
        // this.title = this.add.image(
        //     this.width / 2,
        //     this.height / 2 - 250,
        //     "Title",
        // ).setDepth(0).setScale(1.1);
        //Circulos
        this.circle1 = this.add.image(
            this.width / 2 - 350,
            this.height - 150,
            "World",
        ).setDepth(0).setScale(0.8).setInteractive();
        this.circle2 = this.add.image(
            this.width / 2,
            this.height -120,
            "Locked",
        ).setDepth(0).setScale(0.8).setInteractive();
        this.circle3 = this.add.image(
            this.width / 2 + 350,
            this.height - 150,
            "Locked",
        ).setDepth(0).setScale(0.8).setInteractive();



        const events = Phaser.Input.Events;
        const eventos = Phaser.Input.Events;


        this.circle1.on('pointerdown',()=>{
            // cargar la esena de boot
            this.scene.start('Level3',  { vidas: 3, posiones: 1, posicionXNami: 300 });
        });
        
        //Movimiento del puntero sobre el canvas
        this.sys.canvas.style.cursor = 'none';
        this.input.on(events.POINTER_MOVE, (event) => {
            this.puntero.x = event.worldX;
            this.puntero.y = event.worldY;
        });
        //Eventos del boton start
        this.circle1.on(eventos.POINTER_OVER, function() {
            this.setScale(1);
        });
        this.circle1.on(eventos.POINTER_OUT, function() {
            this.setScale(0.8);
        });
        this.circle2.on(eventos.POINTER_OVER, function() {
            this.setScale(1);
        });
        this.circle2.on(eventos.POINTER_OUT, function() {
            this.setScale(0.8);
        });
        this.circle3.on(eventos.POINTER_OVER, function() {
            this.setScale(1);
        });
        this.circle3.on(eventos.POINTER_OUT, function() {
            this.setScale(0.8);
        });

    }
    update(time, delta) {
    
    
    }


}
export default Map;