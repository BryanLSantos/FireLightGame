class Room1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Room1' });
    }

    init() {

        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;

        this.minScale = 0.75;
        this.maxScale = 1;
        this.deckSizeDelta = 0.05;

        this.bgDelta = 2;

    }
    init(dato) {
        console.log('Escena ScenaA');
        console.log('Haz hecho', dato, 'puntos');
        }
    
    preload() {
        this.load.path = './assets/';
        this.load.image(['Puntero']);

        this.load.image('blueroom', 'scenaroom/blueroom.png');

        this.load.image('lineBlock', 'scenalevel/lineBlock.png');
        this.load.image('BlockBlock', 'scenalevel/blockBlock.png');
        this.load.image('puertaclosed', 'scenalevel/puertaclosed.png');

        this.load.atlas('makuiddle','Maku/MakuIddle/original/makuiddle.png','Maku/MakuIddle/original/makuiddle_atlas.json');
        this.load.animation('makuAnim','Maku/makuiddle_anim/makuiddle_anim.json');
        this.load.atlas('omiiddle','Omi/omiiddle/omiiddle.png','Omi/omiiddle/omiiddle_atlas.json');
        this.load.animation('omiiAnim','Omi/omiiddle_anim/omiiddle_anim.json');
        this.load.atlas('kemi','Kemi/kemi/kemi.png','Kemi/kemi/kemi_atlas.json');
        this.load.animation('kemiAnim','Kemi/kemi_anim/kemi_anim.json');
        this.load.atlas('puerta','puerta/puerta/puerta.png','puerta/puerta/puerta_atlas.json');
        this.load.animation('puertaAnim', 'puerta/puerta_anim/puerta_anim.json');
      
           //AQUI SE CREA EL SPRITESHEET
           this.load.spritesheet('nami','Nami/idlegOOD.png',
           {
               frameWidth: 180,
               frameHeight: 180,
           });
   
           this.load.spritesheet('nami_run','Nami/RungOOD.png',
           {
               frameWidth: 180,
               frameHeight: 180,
           })
   
           this.load.spritesheet('nami_takehit','Nami/Take_Hit.png',
           {
               frameWidth: 180,
               frameHeight: 180,
           })
   
           this.load.spritesheet('nami_jump','Nami/jumpgOOD.png',
           {
               frameWidth: 180,
               frameHeight: 180,
           })
           this.load.spritesheet('nami_fall','Nami/fallgOOD.png',
           {
               frameWidth: 180,
               frameHeight: 180,
           })
    }

    create(){
        this.cameras.main.setBackgroundColor(0x000000)
        // tiempo en milisegundos
        .fadeIn(2000);
        // this.scene.stop('Level');
        // // this.cameras.main.setBackgroundColor(0x0000ff)
        // // // tiempo en milisegundos
        // // .fadeIn(2000);

        
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.suelo = this.physics.add.image(300, 800, 'BlockBlock');
        this.suelo.body.setAllowGravity(false);
        this.suelo.setImmovable();
        this.suelo.body.setSize(100000, 55, true);
        //visible false 
        this.suelo.setVisible(false);


        // this.bloques = [];
        // this.bloques[0] = this.physics.add.image(35, 550, 'BlockBlock');
        // this.bloques[0].setScale(1);
        // this.bloques[0].body.setAllowGravity(false);
        // this.bloques[0].setImmovable();
        // this.bloques[0].setVisible(false);
        // this.bloques[1] = this.physics.add.image(99, 550, 'BlockBlock');
        // this.bloques[1].setScale(1);
        // this.bloques[1].body.setAllowGravity(false);
        // this.bloques[1].setImmovable();
        // this.bloques[1].setVisible(false);
        // this.bloques[2] = this.physics.add.image(163, 610, 'BlockBlock');
        // this.bloques[2].setScale(1);
        // this.bloques[2].body.setAllowGravity(false);
        // this.bloques[2].setImmovable();
        // this.bloques[2].setVisible(false);
        // this.bloques[3] = this.physics.add.image(227, 675, 'BlockBlock');
        // this.bloques[3].setScale(1);
        // this.bloques[3].body.setAllowGravity(false);
        // this.bloques[3].setImmovable();
        // this.bloques[3].setVisible(false);
        // this.bloques[4] = this.physics.add.image(291, 740, 'BlockBlock');
        // this.bloques[4].setScale(1);
        // this.bloques[4].body.setAllowGravity(false);
        // this.bloques[4].setImmovable();
        // this.bloques[4].setVisible(false);
        

        this.puertas = this.add.sprite(150, 565, "puertaclosed").setDepth(0);
        this.puertas.setScale(2.1);

        this.fondo = this.add.image(0, 0, "blueroom").setOrigin(0, 0).setDepth(-1);
        // this.maku = this.add.sprite(1300, 550, "Puntero", 0).setDepth(0).setScale(15);
        this.kemi = this.add.sprite(1200, 627, "Puntero", 0).setDepth(0).setScale(7.6);
        this.kemi.flipX = true;
        this.kemi.anims.play("kemi");

        this.nami = this.physics.add.sprite(150, 500, 'nami').setOrigin(0.5,0.39).setScale(5);//AQUI SE AGREGA EL SPRITE
        //this.physics.add.existing(this.nami, true); //FORMA2 true
        this.nami.body.setCollideWorldBounds(false);
        this.nami.body.setSize(48, 45, true);
        this.nami.body.setOffset(72, 70);
        this.physics.add.collider(this.nami, this.suelo, () => {});
        this.physics.add.collider(this.nami, this.bloques, () => {});
        this.nami.body.setCollideWorldBounds(true);
        // const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        // // const eventos = Phaser.Input.Events;

        
         //Animaciones del personaje nami
         this.anims.create({
            // Nombre de la animación
            key: 'nami_idle',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami', {
                start: 0,
                end: 10
            }),
            
            repeat: -1,
            frameRate: 10
        });

        this.nami.anims.play('nami_idle');

        this.anims.create({
            // Nombre de la animación
            key: 'nami_run',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_run', {
                start: 0,
                end: 7
            }),
            repeat: -1,
            frameRate: 6
        });

        this.anims.create({
            // Nombre de la animación
            key: 'nami_takehit',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_takehit', {
                start: 0,
                end: 3
            }),
            repeat: 1,
            frameRate: 6
        });

        this.anims.create({
            // Nombre de la animación
            key: 'nami_jump',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_jump', {
                start: 0,
                end: 2
            }),
            repeat: 1,
            frameRate: 11
        });

        this.anims.create({
            // Nombre de la animación
            key: 'nami_fall',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_fall', {
                start: 0,
                end: 2
            }),
            repeat: 1,
            frameRate: 11
        });

        // this.anims.create({
        //     // Nombre de la animación
        //     key: 'nami_attack',
        //     // Se cargan los frames por números
        //     // NOTA: generateFrameNames() se
        //     // usa cuando ya existe un Atlas
        //     frames: this.anims.generateFrameNumbers('nami_q', {
        //         start: 0,
        //         end: 3
        //     }),
        //     repeat: 0,
        //     frameRate: 2
        // });

        // this.anims.create({
        //     // Nombre de la animación
        //     key: 'nami_attack2',
        //     // Se cargan los frames por números
        //     // NOTA: generateFrameNames() se
        //     // usa cuando ya existe un Atlas
        //     frames: this.anims.generateFrameNumbers('nami_e', {
        //         start: 0,
        //         end: 3
        //     }),
        //     repeat: 0,
        //     frameRate: 2
        // });
        this.cameras.main.setSize(1920,1080);
        this.cameras.main.startFollow(this.nami);
        
        //Mapeo de teclas
        this.teclas = this.input.keyboard.addKeys({
            izq: keyCodes.A,
            der: keyCodes.D,
            powQ: keyCodes.Q,
            powR: keyCodes.R,
            kspc: keyCodes.SPACE,
            powX: keyCodes.X
        });

        this.teclas.izq.on('down', ()=>{
            // this.nami.anims.stop();
            this.nami.flipX = true;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });
        this.teclas.izq.on('up', ()=>{
            //this.nami.anims.stop();
            this.nami.anims.play('nami_idle');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });

        this.teclas.der.on('down', ()=>{
            // this.nami.anims.stop();
            this.nami.flipX = false;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });
        this.teclas.der.on('up', ()=>{
            //this.nami.anims.stop();
            this.nami.anims.play('nami_idle');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });

        this.teclas.powQ.on('down', ()=>{
            this.nami.play('nami_attack');
        });
        this.teclas.powQ.on('up', ()=>{
            //this.nami.anims.stop();
            //this.nami.play('nami_idle');
        });

        this.teclas.powR.on('down', ()=>{
            this.nami.play('nami_attack2');
        });
        this.teclas.powR.on('up', ()=>{
            //this.nami.anims.stop();
            //this.nami.play('nami_idle');
        });

        this.teclas.kspc.on('down', ()=>{
            this.nami.play('nami_jump');
            this.nami.body.setVelocityY(-800);
            // this.nami.body.setSize(23, 50, true); //this.nami.body.setSize(48, 45, true);
            // this.nami.body.setOffset(88,60); //this.nami.body.setOffset(72, 70);
        });
        this.teclas.kspc.on('up', ()=>{
            //this.nami.anims.stop();
            this.nami.anims.play('nami_fall');
            this.teclas.kspc.enabled = false;
            setTimeout(() => {
                this.nami.play('nami_idle');
                this.teclas.kspc.enabled = true;
                // this.nami.body.setSize(48, 45, true); //this.nami.body.setSize(48, 45, true);
                // this.nami.body.setOffset(72,70); //this.nami.body.setOffset(72, 70);
            }, 300);
            this.nami.body.setVelocityY(800);
           
        });

    }
    update(time, delta) {
        if (this.teclas.izq.isDown)
        {
            this.nami.body.setOffset(60, 70);
            if(!this.teclas.der.isDown){
                this.nami.x -= 3;
                // this.grupo.children.iterate( (corazon) => {
                //     corazon.x = (-800 + this.nami.x) + (y*100);
                //     y++;
                // } );
            }
        }
        if (this.teclas.der.isDown)
        {
            this.nami.body.setOffset(72, 70);
            if(!this.teclas.izq.isDown){
                this.nami.x += 3;
                // this.grupo.children.iterate( (corazon) => {
                //     corazon.x = (-800 + this.nami.x ) + (y*100);
                //     y++;
                // } );
            }
        }
        if(this.teclas.kspc.isDown && this.nami.x >= 10 && this.nami.x <= 100 + 200)
        {
            // setInterval(() => {
            //     console.log("esta haciendo algo");
            //     this.puertas[0].anims.play('puerta');
                
            // }, 1500);
            
            this.puertas.anims.play('puerta');
            // setTimeout(() => {

                escena("Level",this.scene);

                // escena("Room4",this.scene);
                    
            // }, 1500);
                // this.scene.start("Room1", {
                // });
       
            
        }
        
    }
}
function escena(params, params2) {
    params2.start(params,{
    });
}
export default Room1;