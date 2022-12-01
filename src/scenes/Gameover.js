class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'Gameover' });
    }

    init(dato) {
        
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;

    }
    preload() {
        this.load.path = './assets/';
        this.load.image(['Puntero']);

        this.load.image('gameover', 'scenagameover/gameover.png');

        this.load.image('Start', 'scenagameover/restart.png');



        
        // this.load.audio({
        //     key: "musica",
        //     url: "canciones/cancion.mp3"
        // });

        this.load.spritesheet('star','scenastart/star.png',    
        {
            frameWidth: 64,
            frameHeight: 64,
        })


    }
    create() {


        //Estrellas animadas
        this.star = this.add.sprite(270, 850, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        this.stara = this.add.sprite(460, 450, 'star', 0).setDepth(5).setTint(0x546E7A);
        this.starb = this.add.sprite(210, 150, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        this.starc = this.add.sprite(870, 950, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        this.stard = this.add.sprite(1550, 820, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        this.stare = this.add.sprite(1620, 180, 'star', 0).setDepth(5).setTint(0x546E7A);
        this.starf = this.add.sprite(1380, 350, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        this.starg = this.add.sprite(930, 120, 'star', 0).setDepth(5).setTint(0x546E7A);
        this.starh = this.add.sprite(270, 850, 'star', 0).setDepth(5).setTint(0x546E7A);
        this.stari = this.add.sprite(270, 850, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        this.stark = this.add.sprite(270, 850, 'star', 0).setDepth(5).setTint(0x546E7A);
        this.starl = this.add.sprite(270, 850, 'star', 0).setScale(1.4).setDepth(5).setTint(0x546E7A);
        //Ajuste animado
        

        //Animacion estrellas
        this.anims.create({
            // Nombre de la animación
            key: 'star_animation',
            
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('star', {
                start: 0,
                end: 59
            }),
            repeat: -1,
            frameRate: 12
        });

        this.star.anims.play('star_animation');
        this.stara.anims.play('star_animation');
        this.starb.anims.play('star_animation');
        this.starc.anims.play('star_animation');
        this.stard.anims.play('star_animation');
        this.stare.anims.play('star_animation');
        this.starf.anims.play('star_animation');
        this.starg.anims.play('star_animation');
        this.starh.anims.play('star_animation');
        this.stari.anims.play('star_animation');
        this.stark.anims.play('star_animation');
        this.starl.anims.play('star_animation');


        //Puntero
        this.puntero = this.add.image(0, 0, 'Puntero').setOrigin(0.15, 0.15).setDepth(12).setScale(1.5);
        //Background con movimiento

        
        this.fondo = this.add.image(0, 0, "gameover").setOrigin(0, 0).setDepth(-1).setScale(1.5);

        // this.bgs = [
        //     this.add.image(0, 0, "FondoStartA").setOrigin(0, 0).setDepth(-1).setScale(2),
        //     this.add.image(0, 0, "FondoStartA").setOrigin(0, 0).setDepth(-1).setScale(2),
        // ];
        // this.bgs[1].x = - this.bgs[0].displayWidth;
        //Imagen de Titulo
       
        //Boton de Start
        this.start = this.add.image(
            this.width / 2,
            this.height / 2 + 320,
            "Start",
        ).setDepth(0).setInteractive();
        

        const events = Phaser.Input.Events;
        const eventos = Phaser.Input.Events;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;

        this.start.on('pointerdown',()=>{
            // cargar la esena de boot
            this.scene.start('Start');
        });

        
      

        //Movimiento del puntero sobre el canvas
        this.sys.canvas.style.cursor = 'none';
        this.input.on(events.POINTER_MOVE, (event) => {
            this.puntero.x = event.worldX;
            this.puntero.y = event.worldY;
        });
        //Eventos del boton start
        this.start.on(eventos.POINTER_OVER, function() {
            this.setScale(1.2);
        });
        this.start.on(eventos.POINTER_OUT, function() {
            this.setScale(1);
        });

    }
    update(time, delta) {
    

    
    }

}
export default Gameover;