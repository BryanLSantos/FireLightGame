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
        //console.log('Haz hecho', dato, 'puntos');
        }
    
    preload() {
        this.load.path = './assets/';
        this.load.image(['Puntero']);

        this.load.image('blueroom', 'scenaroom/blueroom.png');

        this.load.image('lineBlock', 'scenalevel/lineBlock.png');
        this.load.image('BlockBlock', 'scenalevel/blockBlock.png');
        this.load.image('puertaclosed', 'scenalevel/puertaclosed.png');
        this.load.image('dialogo', 'scenaroom/textbox.png');

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

            this.load.spritesheet('bola_idle','scenaroom/bola.png',
            {
                frameWidth: 400,
                frameHeight: 486,
            });
    }

    create(){

        this.scene.stop('Level');

        this.cameras.main.setBackgroundColor(0x000000)

        .fadeIn(2000);
        
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.suelo = this.physics.add.image(300, 800, 'BlockBlock');
        this.suelo.body.setAllowGravity(false);
        this.suelo.setImmovable();
        this.suelo.body.setSize(100000, 55, true);
        //visible false 
        this.suelo.setVisible(false);

        this.banderadialogo = false;
        this.banderaitem = false;
        

        this.puertas = this.add.sprite(150, 565, "puertaclosed").setDepth(0);
        this.puertas.setScale(2.1);

        this.fondo = this.add.image(0, 0, "blueroom").setOrigin(0, 0).setDepth(-1);

        this.maku = this.physics.add.sprite(1300, 300, "Puntero", 0).setDepth(0).setScale(5);
        this.maku.flipX = true;
        this.maku.anims.play("makuiddle");

        this.nami = this.physics.add.sprite(150, 500, 'nami').setOrigin(0.5,0.39).setScale(5);
        this.bola_idle = this.physics.add.sprite(1130, 480, 'bola_idle').setOrigin(0.5,0.39).setScale(.2).setVisible(false);//AQUI SE AGREGA EL SPRITE
     
        this.bola_idle.body.setAllowGravity(false);
        this.bola_idle.setImmovable();
        this.nami.body.setCollideWorldBounds(false);
        this.nami.body.setSize(48, 45, true);
        this.nami.body.setOffset(72, 70);
        this.maku.body.setSize(100, 1, true);
        this.maku.body.setOffset(50, 165);
        this.physics.add.collider(this.nami, this.suelo, () => {});
        this.physics.add.collider(this.maku, this.suelo, () => {});
        
        this.physics.add.collider(this.nami, this.bloques, () => {});
        this.physics.add.collider(this.maku, this.bloques, () => {});
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

        this.anims.create({
            // Nombre de la animación
            key: 'bola_idle',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('bola_idle', {
                start: 0,
                end: 12
            }),
            
            repeat: -1,
            frameRate: 12
        });



    
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

            }, 300);
            this.nami.body.setVelocityY(800);
           
        });


        this.texto = [];
        this.index = 0;
        this.texto[0] = "El mundo en verdad está lleno de peligros,\ny en él hay muchos lugares oscuros;\n pero todavía..."; 
        this.texto[1] = "hay muchos que son justos, y aunque en \ntodas las tierras el amor se mezcla con \nel dolor,puede que crezca más.";
        this.texto[2] = "Toma esta bola de cristal y con ella guia \ntu destino.";
        this.texto[3] = "No te apresures a dar muerte y juicio. \nIncluso los más sabios no ven todos\nlos fines... ";
        
        this.parrafo = this.add.text(1280, 865, "", {fontFamily: 'IM Fell English SC', fontSize: '20px', color: 'white'}).setDepth(10);
        
        this.parrafo.alpha = 0.0; 

         this.physics.add.collider(this.nami, this.maku, () => {    
            console.log("colision nami con maku");
            this.cameras.main

            if(this.banderadialogo==false){
                this.dialogo = this.add.image(1450,900, "dialogo").setDepth(6).setVisible(true);
                
                setInterval(() => {
                    if(this.index < this.texto.length){
                        this.parrafo.setText(this.texto[this.index]); 
                        this.index++;
                        show(this,this.parrafo);
                        setTimeout(() => {
                            hide(this,this.parrafo);
                        }, 6000);
                        if(this.banderaitem == false){
                            setTimeout(() => {
                                
                                this.bola_idle.anims.play('bola_idle');
                                this.bola_idle.setVisible(true);
                                this.banderaitem == true;
                            }, 19000);
                        }
                    }
                    else{
                        this.index = 0;
                    }
                    
                 }, 9000); 

                this.banderadialogo = true;
            }

            
        });
        
        this.physics.add.collider(this.nami, this.bola_idle, () => {    
            console.log("colision nami con bolita");

            this.bola_idle.setVisible(false);
            this.bola_idle.anims.stop();
            this.bola_idle.setImmovable(false);
        });

    }
    update(time, delta) {
        if (this.teclas.izq.isDown)
        {
            this.nami.body.setOffset(60, 70);
            if(!this.teclas.der.isDown){
                this.nami.x -= 3;
            }
        }
        if (this.teclas.der.isDown)
        {
            this.nami.body.setOffset(72, 70);
            if(!this.teclas.izq.isDown){
                this.nami.x += 3;
            }
        }
        if(this.teclas.kspc.isDown && this.nami.x >= 10 && this.nami.x <= 100 + 200)
        {
            
            this.puertas.anims.play('puerta');
                escena("Level",this.scene);

        }  
        
    }
}
function escena(params, params2) {
    params2.start(params,{
    });
}

function show(params, text) {
    params.tweens = params.add.tween({
        targets: [text],
        alpha: 1,
        duration: 1500
    });
}

function hide(params, text) {
    params.tweens = params.add.tween({
        targets: [text],
        alpha: 0,
        duration: 1500
    });
}
export default Room1;