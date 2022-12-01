import Nami from "./Nami.js"
class Level2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level2'
        });
    }

    init(dato) {
        console.log('Escena Level2');
        console.log(dato);
        this.vidasGet = dato.vidas;
        this.posionesGet = dato.posiones;
        this.posicionXNamiGet = dato.posicionXNami;
        console.log("vidas: " + this.vidasGet + " posiones: " + this.posionesGet);
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;

    }
    preload() {
        this.load.path = './assets/';
        this.load.image('mapa2','scenalevel2/mapa2.png');
        this.load.image('fondo2','scenalevel2/fondo2.png');
        this.load.image('esquina','scenalevel2/esquina.png');
        this.load.image('fondo3','scenalevel2/fondo3.png');
        this.load.tilemapTiledJSON('mapa','scenalevel2/mapa.json');
        this.load.image('buttonlevel3', 'buttonlevel/buttonlevel3.png');

        this.load.atlas('hearts', 'hearts/hearts.png', 'hearts/hearts_atlas.json');
        this.load.animation('heartsAnim', 'hearts/hearts_anim.json');

        this.load.atlas('potions', 'potions/potions.png', 'potions/potions_atlas.json');
        this.load.animation('potionsAnim', 'potions/potions_anim.json');

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
        this.load.spritesheet('nami_death','Nami/deathgOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180,
        })

        this.load.image('cofreestatico', 'scenalevel/cofreestatico.png');
        
        this.load.atlas('cofreanimado','cofre/cofreanimado/cofreanimado.png','cofre/cofreanimado/cofreanimado_atlas.json');
        this.load.animation('cofreAnim', 'cofre/cofreanimado_anim/cofreanimado_anim.json');
        

        this.load.atlas('pinchos', 'pinchos/pinchos.png', 'pinchos/pinchos_atlas.json');
        this.load.animation('pinchosAnim', 'pinchos/pinchos_anim.json');

        this.load.atlas('hearts', 'hearts/hearts.png', 'hearts/hearts_atlas.json');
        this.load.animation('heartsAnim', 'hearts/hearts_anim.json');

        this.load.atlas('potions', 'potions/potions.png', 'potions/potions_atlas.json');
        this.load.animation('potionsAnim', 'potions/potions_anim.json');

    }
    create() {

        this.cameras.main.setBackgroundColor(0x000000);

        this.map = this.make.tilemap({
            key: 'mapa'
        });
        console.log(this.map);
        this.tile = this.map.addTilesetImage('mapa', 'mapa2');
        this.fondo = this.map.addTilesetImage('fondo2', 'fondo2');
        this.esquina = this.map.addTilesetImage('esquina', 'mapa2');
        // constantes de control
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;
        console.log(this.map);

        this.layer4 = this.map.createLayer('oriderecha', [this.tile, this.fondo]);
        this.layer5 = this.map.createLayer('oriizq', [this.tile, this.fondo, this.esquina]);

        this.layer2 = this.map.createLayer('mapa3', [this.tile, this.fondo, this.esquina], 0, 0);

        this.layer2.setCollisionByProperty({ col: true });
        this.layer4.setCollisionByProperty({ col: true });
        this.layer5.setCollisionByProperty({ col: true });

        this.mover = this.physics.add.image(787, 2608, 'fondo3').setScale(1).setInteractive();
        this.mover.body.moves = false;
        this.mover.body.immovable = true;



        //*------------------personajes--------------*

        this.nami = this.physics.add.sprite(1713, 20, 'nami').setOrigin(0.5,0.39).setScale(2.2);//AQUI SE AGREGA EL SPRITE
        this.nami.setDepth(1);
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
            key: 'nami_death',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_death', {
                start: 0,
                end: 10
            }),
            repeat: 0,
            frameRate: 6
        });


        this.grupo = this.physics.add.group({
            key: 'hearts',
            repeat: 5,
            setXY: {
                x: this.nami.x - 3500,
                y: this.nami.y - 40,
            }
        });
        this.grupo.children.iterate((corazon) => {
            corazon.setScale(0.5);
            corazon.body.setAllowGravity(false);
        });
        this.grupo.playAnimation('hearts');
        // this.contadorVida = 3;
        // this.grupo.getChildren()[3].visible = false;
        // this.grupo.getChildren()[4].visible = false;
        // this.grupo.getChildren()[5].visible = false;
        this.contadorVida = this.vidasGet;
        console.log("contador vida" + this.contadorVida);
        for (let index = this.contadorVida; index < 6; index++) {
            this.grupo.getChildren()[index].visible = false;
        }

        //Grupo de pociones

        this.grupo2 = this.physics.add.group({
            key: 'potions',
            repeat: 3,
            setXY: {
                x: -3450, //450
                y: -400,
                stepX: 50,
            },

        });
        this.grupo2.children.iterate((posion) => {
            posion.setScale(0.4);
            posion.body.setAllowGravity(false);
        });
        // this.contadorPocion = 1;
        this.contadorPocion = this.posionesGet;
        for (let index = this.contadorPocion; index < 4; index++) {
            this.grupo2.getChildren()[index].visible = false;
        }
        this.grupo2.playAnimation('potions');

        // this.nami.create();

        // -------------control de camar-------------
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.startFollow(this.nami);


        ///agregar colaiders 
        this.physics.add.collider(this.nami, this.layer2);
        this.physics.add.collider(this.mover, this.nami, () => {
            this.nami.body.setVelocity(0);
            this.nami.body.setVelocityY(0);
            this.nami.body.stop();
        });

        this.botonlevel3 = this.add.image(1300, 2550, 'buttonlevel3').setScale(0.5);
        this.botonlevel3.setInteractive();
        this.botonlevel3.on('pointerdown', () => {
            console.log("presionaste el boton de nivel 3");
            escena("Level3", this.scene, {vidas:this.contadorVida, posiones: this.contadorPocion});
        } );

        //Creacion de cofre de prueba
        this.cofre = this.physics.add.sprite(94.2, 783, 'cofreestatico').setScale(0.4).setImmovable(true);
        this.cofre.body.setSize(100, 50);
        this.cofre.body.setOffset(50, 300);
        this.cofre.body.setAllowGravity(false);
    
        this.cofre2 = this.physics.add.sprite(224.31, 1355., 'cofreestatico').setScale(0.4).setImmovable(true);
        this.cofre2.body.setSize(100, 50);
        this.cofre2.body.setOffset(50, 300);
        this.cofre2.body.setAllowGravity(false);
    
        this.cofre3 = this.physics.add.sprite(1827.0416666666667, 1870, 'cofreestatico').setScale(0.4).setImmovable(true);
        this.cofre3.body.setSize(100, 50);
        this.cofre3.body.setOffset(50, 300);
        this.cofre3.body.setAllowGravity(false);
    
        this.physics.add.collider(this.nami, this.cofre, () => {
            if(this.teclas.powX.isDown) {
                if(this.contadorPocion < 4 && this.banderacofre1 == false ){
                    this.cofre.anims.play('cofreanimado');
                    this.grupo2.getChildren()[this.contadorPocion].visible = true;
                    this.contadorPocion++;
                    this.banderacofre1 = true;
                }
            }
        });

        this.physics.add.collider(this.nami, this.cofre2, () => {
            if(this.teclas.powX.isDown) {
                if(this.contadorPocion < 4 && this.banderacofre2 == false ){
                    this.cofre2.anims.play('cofreanimado');
                    this.grupo2.getChildren()[this.contadorPocion].visible = true;
                    this.contadorPocion++;
                    this.banderacofre2 = true;
                }
            }
        });

        this.physics.add.collider(this.nami, this.cofre3, () => {
            if(this.teclas.powX.isDown) {
                if(this.contadorPocion < 4 && this.banderacofre3 == false ){
                    this.cofre3.anims.play('cofreanimado');
                    this.grupo2.getChildren()[this.contadorPocion].visible = true;
                    this.contadorPocion++;
                    this.banderacofre3 = true;
                }
            }
        });

        //Grupo de pinchos
        this.grupoO4 = this.physics.add.group({
            key: 'pinchos',
            repeat: 4,
            setXY: {
                x: 730,
                y: 885,
                stepX: 150
            }  
        });
        this.grupoO4.children.iterate( (pincho) => {
            pincho.body.setAllowGravity(false);
            pincho.setScale(2);
            //FISICAS Pincho
            this.physics.add.existing(pincho, true); //FORMA2 true
            pincho.setImmovable(true);
            pincho.body.setSize(27, 15, true);
        } );
        this.daño = 0;
        //Nami colisiona con un pincho
        this.physics.add.collider(this.nami, this.grupoO4, () => {    
            console.log("colision nami con pinchos");
            this.cameras.main
            .setBackgroundColor(0x000000)
            .shake(500, 0.03);

            setTimeout(() => {
                this.nami.setVelocityX( this.nami.body.velocity.x += 50);
                this.nami.setVelocityY( this.nami.body.velocity.y -= 100);
                this.nami.anims.play('nami_takehit');
            }, 100);
            setTimeout(() => {
                this.nami.body.velocity.x = 0;
                this.nami.body.velocity.y = 0;
             }, 400); 

            this.daño++;
            if(this.daño >= 10)
            {
                if(this.contadorVida == 1)
                {
                    this.grupo.getChildren()[this.contadorVida-1].visible = false;
                    this.contadorVida--;
                    this.daño = 0;
                    console.log("muere nami :(");
                    this.teclas.kspc.enabled = false;
                    this.teclas.izq.enabled = false;
                    this.teclas.der.enabled = false;
                    this.nami.body.moves = false;
                    this.nami.body.x = this.nami.body.x;
                    this.nami.body.y = this.nami.body.y;
                    setTimeout(() => {
                        this.nami.anims.stop();
                        this.nami.anims.play("nami_death");
                    }, 1000);
                    
                    setTimeout(() => {
                        escena("Gameover", this.scene, {reinicio: "true", nivel: "Level"});
                    }, 4000);

                }
                else{
                    this.grupo.getChildren()[this.contadorVida-1].visible = false;
                    this.contadorVida--;
                    this.daño = 0;
                    console.log("hacer daño");
                    //checar si tiene 0 corazones si es el caso muere
                }
            }
        });
         //Grupo de pinchos
         this.grupoO5 = this.physics.add.group({
            key: 'pinchos',
            repeat: 2,
            setXY: {
                x: 630,
                y: 1205,
                stepX: 250
            }  
        });
        this.grupoO5.children.iterate( (pincho) => {
            pincho.body.setAllowGravity(false);
            pincho.setScale(2);
            //FISICAS Pincho
            this.physics.add.existing(pincho, true); //FORMA2 true
            pincho.setImmovable(true);
            pincho.body.setSize(27, 15, true);
        } );
        this.daño = 0;
        //Nami colisiona con un pincho
        this.physics.add.collider(this.nami, this.grupoO5, () => {    
            console.log("colision nami con pinchos");
            this.cameras.main
            .setBackgroundColor(0x000000)
            .shake(500, 0.03);

            setTimeout(() => {
                this.nami.setVelocityX( this.nami.body.velocity.x += 50);
                this.nami.setVelocityY( this.nami.body.velocity.y -= 100);
                this.nami.anims.play('nami_takehit');
            }, 100);
            setTimeout(() => {
                this.nami.body.velocity.x = 0;
                this.nami.body.velocity.y = 0;
             }, 400); 

            this.daño++;
            if(this.daño >= 10)
            {
                if(this.contadorVida == 1)
                {
                    this.grupo.getChildren()[this.contadorVida-1].visible = false;
                    this.contadorVida--;
                    this.daño = 0;
                    console.log("muere nami :(");
                    this.teclas.kspc.enabled = false;
                    this.teclas.izq.enabled = false;
                    this.teclas.der.enabled = false;
                    this.nami.body.moves = false;
                    this.nami.body.x = this.nami.body.x;
                    this.nami.body.y = this.nami.body.y;
                    setTimeout(() => {
                        this.nami.anims.stop();
                        this.nami.anims.play("nami_death");
                    }, 1000);
                    
                    setTimeout(() => {
                        escena("Gameover", this.scene, {reinicio: "true", nivel: "Level"});
                    }, 4000);

                }
                else{
                    this.grupo.getChildren()[this.contadorVida-1].visible = false;
                    this.contadorVida--;
                    this.daño = 0;
                    console.log("hacer daño");
                    //checar si tiene 0 corazones si es el caso muere
                }
            }
        });

        this.physics.add.collider(this.nami, this.layer2);

        this.physics.add.collider(this.nami, this.layer4, () => {
            this.nami.x = this.nami.x - 20;
            this.nami.body.setVelocityX(0);
            this.nami.body.setAcceleration(0);
            this.nami.body.stop();
        });
        this.physics.add.collider(this.nami, this.layer5, () => {
            this.nami.x = this.nami.x + 20;
            this.nami.body.setVelocityX(0);
            this.nami.body.setAcceleration(0);
            this.nami.body.stop();
        });
        this.grupoO4.playAnimation('pinchos');
        this.grupoO5.playAnimation('pinchos');

         //Grupo de corazones ABAJO
         this.grupoC = this.physics.add.group({
            key: 'hearts',
            repeat: 2,
            setXY: {
                x: 800,
                y: 400,
                stepX: 200
            }
        });
        this.grupoC.children.iterate((corazon) => {
            corazon.setScale(0.5);
            corazon.body.setAllowGravity(false);
        });
        this.grupoC.playAnimation('hearts');
         
        //Nami obtiene salud
        this.physics.add.collider(this.nami, this.grupoC, () => {
            this.grupoC.getChildren()[0].destroy();
            if(this.contadorVida<6){
                this.grupo.getChildren()[this.contadorVida].visible = true;
                this.contadorVida++;
            }
        });

        //Twind
        this.tweens = this.add.tween({
            targets: [this.mover],
            //ease: 'Bounce',
            y: 1754,
            repeat: -1,
            yoyo: true,
            delay: 1000,
            hold: 1000,
            repeatDelay: 1000,
            duration: 5000,
        });

        this.teclas = this.input.keyboard.addKeys({
            izq: keyCodes.A,
            der: keyCodes.D,
            powQ: keyCodes.Q,
            powR: keyCodes.R,
            kspc: keyCodes.SPACE,
            powX: keyCodes.X
        });

        this.teclas.izq.on('down', ()=>{
            this.nami.flipX = false;
            this.nami.body.x += 20;
            this.nami.flipX = true;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(10);
            this.nami.body.setVelocityX(-250);
        });
        this.teclas.izq.on('up', ()=>{
            this.nami.anims.play('nami_idle');
            this.nami.body.setAcceleration(0);
            this.nami.body.stop();
            this.nami.body.setVelocity(0);
        });

        this.teclas.der.on('down', ()=>{
            this.nami.flipX = false;
            this.nami.body.x += 20;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(10);
            this.nami.body.setVelocity(0);
            this.nami.body.setVelocityX(250);
            this.nami.flipX = false;
        });
        this.teclas.der.on('up', ()=>{
            this.nami.anims.play('nami_idle');
            this.nami.anims.stop();
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });

        this.teclas.powQ.on('down', ()=>{
            this.nami.play('nami_attack');
        });
        this.teclas.powQ.on('up', ()=>{
        });

        this.teclas.powR.on('down', ()=>{
            this.nami.play('nami_attack2');
        });
        this.teclas.powR.on('up', ()=>{
        });

        this.teclas.kspc.on('down', ()=>{
            this.nami.play('nami_jump');
            this.nami.body.setVelocityY(-800); // o 500
            this.nami.body.setSize(23, 50, true);
            this.nami.body.setVelocityX(0);
            this.nami.body.setOffset(85,60);
            this.nami.body.setSize(23, 50, true); //this.nami.body.setSize(48, 45, true);
            this.teclas.der.on('down', ()=>{
                this.nami.flipX = false;
                this.nami.body.x += 20;
                this.nami.anims.play('nami_run');
                this.nami.body.setAcceleration(0);
                this.nami.body.setVelocity(0);
                this.nami.body.setVelocityX(250);
                this.nami.flipX = false;
            });
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
            this.nami.body.stop();
           
        });

        
        // this.contadorVida; 
        this.contadorVida = this.vidasGet;
        console.log("contador vida" + this.contadorVida);
        for (let index = this.contadorVida; index < 6; index++) {
            this.grupo.getChildren()[index].visible = false;
        }

 
        this.banderacofre1 = false;
        this.banderacofre2 = false;
        this.banderacofre3 = false;
    }
    update() {    
        var x = 0;
        var y = 0;
        this.grupo.children.iterate( (corazon) => {
            corazon.y = this.nami.y - 400;
        } );
        this.grupo2.children.iterate( (pocion) => {
            pocion.y = this.nami.y - 400;
        } );
        
        if (this.teclas.izq.isDown)
        {
            this.nami.body.setSize(23, 50, true);
            this.nami.body.setOffset(70,60);
            
        }
        ///////////////////////
        if (this.teclas.der.isDown)
        {
            this.nami.body.setSize(23, 50, true); 
            this.nami.body.setOffset(85,60);
            if(!this.teclas.izq.isDown){
                this.grupo.children.iterate( (corazon) => {
                    corazon.x = (-800 + this.nami.x ) + (y*50);
                    y++;
                } );
                this.grupo2.children.iterate( (pocion) => {
                    pocion.x = (800 + this.nami.x) - (x*50);
                    x++;
                } );
                
            }
        }

        if (this.teclas.izq.isDown)
        {
            if(!this.teclas.der.isDown){
                this.grupo.children.iterate( (corazon) => {
                    corazon.x = (-800 + this.nami.x ) + (y*50);
                    y++;
                } );
                this.grupo2.children.iterate( (pocion) => {
                    pocion.x = (800 + this.nami.x) - (x*50);
                    x++;
                } );
            }
        }
    }

    //update de objetos 
    
}

function escena(params, params2, data) {
    params2.start(params, data);
}
export default Level2;


