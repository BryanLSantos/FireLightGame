class Level extends Phaser.Scene{
    constructor(){
        super({ key: 'Level' });
    }

    init(dato) {
        console.log('Escena Level');
        console.log(dato);
        this.vidasGet = dato.vidas;
        this.posionesGet = dato.posiones;
        this.posicionXNamiGet = dato.posicionXNami;
        console.log("vidas: " + this.vidasGet + " posiones: " + this.posionesGet);
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;
        this.maximo=690;
        this.minimo=0;
        this.direc=true;
    }
    
    preload() {
        this.load.path = './assets/';
        this.load.image(['Puntero']);

        this.load.image('Map2', 'scenalevel/mapa2.png');
        this.load.image('lineBlock', 'scenalevel/lineBlock.png');
        this.load.image('BlockBlock', 'scenalevel/blockBlock.png');
        this.load.image('antorchab1', 'scenalevel/antorchab1.png');
        this.load.image('cofreestatico', 'scenalevel/cofreestatico.png');
        this.load.image('cuadro', 'scenalevel/cuadro.png');
        this.load.image('cuadrodragon', 'scenalevel/cuadrodragon.png');
        this.load.image('puertaclosed', 'scenalevel/puertaclosed.png');
        this.load.image('contenedortxt', 'scenalevel/contenedor.png');
        this.load.image('contenedorfuego', 'scenalevel/marco.png');
        this.load.image('contenedorfuegofondo', 'scenalevel/marcofondo.png');
        this.load.image('buttonlevel2', 'buttonlevel/buttonlevel2.png');

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
        this.load.spritesheet('nami_death','Nami/deathgOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180,
        })

        this.load.spritesheet('fuego_idle','scenalevel/fireball.png',
        {
            frameWidth: 288,
            frameHeight: 288,
        })

        this.load.atlas('hearts','hearts/hearts.png','hearts/hearts_atlas.json');
        this.load.animation('heartsAnim','hearts/hearts_anim.json');
        this.load.atlas('potions','potions/potions.png','potions/potions_atlas.json');
        this.load.animation('potionsAnim','potions/potions_anim.json');
        this.load.atlas('pinchos', 'pinchos/pinchos.png','pinchos/pinchos_atlas.json');
        this.load.animation('pinchosAnim','pinchos/pinchos_anim.json');
        this.load.atlas('antorchab','antorchab/antorchab/antorchab.png','antorchab/antorchab/antorchab_atlas.json');
        this.load.animation('antorchabAnim', 'antorchab/antorchab_anim/antorchab_anim.json');
        this.load.atlas('cofreanimado','cofre/cofreanimado/cofreanimado.png','cofre/cofreanimado/cofreanimado_atlas.json');
        this.load.animation('cofreAnim', 'cofre/cofreanimado_anim/cofreanimado_anim.json');
        this.load.atlas('puerta','puerta/puerta/puerta.png','puerta/puerta/puerta_atlas.json');
        this.load.animation('puertaAnim', 'puerta/puerta_anim/puerta_anim.json');
    }

    create(){

        console.log(this.posicionXNamiGet);
        this.cameras.main.setBackgroundColor(0x000000)
        // tiempo en milisegundos
        .fadeIn(2000);
        this.bgs = [
            this.add.image(0, 0, "Map2").setOrigin(0, 0).setDepth(-1),
            this.add.image(0, 0, "Map2").setOrigin(0, 0).setDepth(-1),
        ];
        this.bgs[1].x = this.bgs[0].displayWidth;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

       //Creacion Antorchas
        this.antorchas = [];
        for(let index = 0; index < 10; index++) {
            this.antorchas[index] = this.add.sprite((index*1100 )+200, 300, 'antorchab');
            this.antorchas[index].setScale(4);
        }
        //Creacion cuadros
        this.cuadros = [];
        for(let index = 0; index < 10; index++) {
                this.cuadros[index] = this.add.image((index*1100)+220, 580, "cuadro").setDepth(0);
                this.cuadros[index].setScale(0.25);
        }

        //Creacion Puertas
        this.puertas = [];
        for(let index = 0; index < 10; index++) {
                this.puertas[index] = this.physics.add.sprite((index*1100)+650, 530, "puertaclosed").setDepth(0);
                this.puertas[index].setScale(2.4);
                this.puertas[index].body.setImmovable(true);
                this.puertas[index].body.setAllowGravity(false);
        }

        //CREACION TEXTO
        this.texto = [];
        this.index = 0;
        this.texto[0] = "La mejor parte de una aventura no es llegar \nal destino, sino todas las cosas maravillosas \nque suceden en el camino."; 
        this.texto[1] = "Inicia la aventura con Nami... \n[A] Avanzar Izquierda  [D] Avanzar Derecha\n[SPACE] Saltar";
        this.texto[2] = "Para obtener pociones extra posicionate \nfrente a los cofres y oprime [X]";
        this.texto[3] = "Las puertas conllevan aventuras sorpresa \nasi que comienza a explorar... ";
        this.texto[4] = "No todos los que deambulan están perdidos,\nalgunos están en busca de aventuras que \nnutran su existencia.";
        this.texto[5] = "Posicionate frente a las puertas y oprime [X], \nla mejor aventura es la que aún no ha llegado...";
        this.texto[6] = "Cubre la tierra antes de que \nla tierra te cubra a ti...";
        
        this.parrafo = this.add.text(300, 880, "", {fontFamily: 'IM Fell English SC', fontSize: '30px', color: 'white'}).setDepth(10);
        
        this.parrafo.alpha = 0.0; 

        this.textos = setInterval(() => {
            if(this.index < this.texto.length){
                this.parrafo.setText(this.texto[this.index]); 
                this.index++;
                show(this,this.parrafo);
                setTimeout(() => {
                    hide(this,this.parrafo);
                }, 6000);
            }
            else{
                this.index = 0;
            }
            
         }, 12000); 

        
        this.botonlevel2 = this.add.image(11000, 950, 'buttonlevel2').setScale(0.5);
        this.botonlevel2.setInteractive();
        this.botonlevel2.on('pointerdown', () => {
            console.log("presionaste el boton de nivel 2");
            escena("Level2", this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion});
        } );
        
        this.pared = this.physics.add.image(10000, 100, 'puerta').setScale(6).setImmovable(true);
        this.pared.setVisible(false);
        this.pared.body.setAllowGravity(false);

        this.suelo = this.physics.add.image(300, 800, 'BlockBlock');
        this.suelo.body.setAllowGravity(false);
        this.suelo.setImmovable();
        this.suelo.body.setSize(100000, 55, true);
        //visible false 
        this.suelo.setVisible(false);

        this.techo = this.physics.add.image(300, 100, 'BlockBlock');
        this.techo.body.setAllowGravity(false);
        this.techo.setImmovable();
        this.techo.body.setSize(100000, 55, true);
        //visible false 
        this.techo.setVisible(false);
        this.suelo.setVisible(false);

        //Creacion de cofre de prueba
        this.cofre = this.physics.add.sprite(1000, 680, 'cofreestatico').setScale(0.8).setImmovable(true);
        this.cofre.body.setSize(100, 50);
        this.cofre.body.setOffset(50, 300);
        this.cofre.body.setAllowGravity(false);
       
        // this.cofre.body.setSize(1, 0.5);
        this.cofre2 = this.physics.add.sprite(2450, 680, 'cofreestatico').setScale(0.8).setImmovable(true);
        this.cofre2.body.setSize(100,50);
        this.cofre2.body.setOffset(50, 300);
        this.cofre2.body.setAllowGravity(false);

        this.cofre3 = this.physics.add.sprite(3400, 680, 'cofreestatico').setScale(0.8).setImmovable(true);
        this.cofre3.body.setSize(100,50);
        this.cofre3.body.setOffset(50, 300);
        this.cofre3.body.setAllowGravity(false);

        //Creacion de cofre de prueba
        this.cofre4 = this.physics.add.sprite(3700, 680, 'cofreestatico').setScale(0.8).setImmovable(true);
        this.cofre4.body.setSize(100, 50);
        this.cofre4.body.setOffset(50, 300);
        this.cofre4.body.setAllowGravity(false);
    
        // this.cofre.body.setSize(1, 0.5);
        this.cofre5 = this.physics.add.sprite(5400, 680, 'cofreestatico').setScale(0.8).setImmovable(true);
        this.cofre5.body.setSize(100,50);
        this.cofre5.body.setOffset(50, 300);
        this.cofre5.body.setAllowGravity(false);
 
        this.cofre6 = this.physics.add.sprite(6800, 680, 'cofreestatico').setScale(0.8).setImmovable(true);
        this.cofre6.body.setSize(100,50);
        this.cofre6.body.setOffset(50, 300);
        this.cofre6.body.setAllowGravity(false);

        //FISICAS nami
        this.nami = this.physics.add.sprite(this.posicionXNamiGet, 420, 'nami').setOrigin(0.5,0.39).setScale(5);//AQUI SE AGREGA EL SPRITE
        this.fuego = this.add.sprite(this.nami.x - 750, 895, 'fuego_idle').setOrigin(0.5,0.39).setScale(.6).setDepth(7);//AQUI SE AGREGA EL SPRITEa
        this.contenedor = this.add.image(this.nami.x - 650, 830, "contenedortxt").setOrigin(0, 0).setDepth(6).setScale(.45);
        this.contenedorfuego = this.add.image(this.nami.x - 850, 830, "contenedorfuego").setOrigin(0, 0).setDepth(8).setScale(.45);
        this.contenedorfuegofondo = this.add.image(this.nami.x - 850, 830, "contenedorfuegofondo").setOrigin(0, 0).setDepth(6).setScale(.45);

        this.nami.body.setSize(23, 50, true);
        this.nami.body.setOffset(85,60);

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
                // console.log("XXX ");
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

        this.physics.add.collider(this.nami, this.puertas[0], () => {
            if(this.teclas.powX.isDown) {
                this.puertas[0].anims.play('puerta');
                clearInterval(this.textos);
                escena("Room1",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: 650});
            }
        });

        this.physics.add.collider(this.nami, this.puertas[1], () => {
            if(this.teclas.powX.isDown) {
                this.puertas[1].anims.play('puerta');
                clearInterval(this.textos);
                escena("Battle_Esq",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: this.nami.x});
            }
        });
        
        this.physics.add.collider(this.nami, this.puertas[2], () => {
            if(this.teclas.powX.isDown) {
                this.scene.stop('Battle_Esq');
                this.puertas[2].anims.play('puerta');
                clearInterval(this.textos);
                escena("Battle_Go",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: this.nami.x});
            }
        });


        this.physics.add.collider(this.nami, this.puertas[3], () => {
            if(this.teclas.powX.isDown) {
                this.puertas[3].anims.play('puerta');
                clearInterval(this.textos);
                escena("Room2",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: 3700});
            }
        });

        this.physics.add.collider(this.nami, this.puertas[4], () => {
            if(this.teclas.powX.isDown) {
                this.scene.stop('Battle_Esq');
                this.puertas[4].anims.play('puerta');
                clearInterval(this.textos);
                escena("Battle_King",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: this.nami.x});
            }
        });

        this.physics.add.collider(this.nami, this.puertas[5], () => {
            if(this.teclas.powX.isDown) {
                this.puertas[5].anims.play('puerta');
                clearInterval(this.textos);
                escena("Room3",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: 6100});
            }
        });

        this.physics.add.collider(this.nami, this.puertas[6], () => {
            if(this.teclas.powX.isDown) {
                this.puertas[6].anims.play('puerta');
                clearInterval(this.textos);
                escena("Room4",this.scene, {vidas: this.contadorVida, posiones: this.contadorPocion, posicionXNami: 7200});
            }
        });

        this.physics.add.collider(this.nami, this.suelo, () => {});
        this.physics.add.collider(this.nami, this.techo, () => {});

        this.parrafo.x = this.nami.x - 620;  
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
            key: 'fuego_idle',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('fuego_idle', {
                start: 0,
                end: 11
            }),
            
            repeat: -1,
            frameRate: 12
        });

        this.fuego.anims.play('fuego_idle');

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
            this.nami.flipX = true;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });
        this.teclas.izq.on('up', ()=>{
            this.nami.anims.play('nami_idle');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });

        this.teclas.der.on('down', ()=>{
            this.nami.flipX = false;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(0);
            this.nami.body.setVelocity(0);
        });
        this.teclas.der.on('up', ()=>{
            this.nami.anims.play('nami_idle');
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
            this.nami.body.setVelocityY(-800);
            this.nami.body.setSize(23, 50, true);
            this.nami.body.setOffset(85,60);
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

        //Grupo de corazones ARRIBA
        this.grupo = this.physics.add.group({
            key: 'hearts',
            repeat: 5,
            setXY: {
            x: this.nami.x - 800,
            y: 100,
            stepX: 100
            }
            });
            this.grupo.children.iterate( (corazon) => {
                corazon.setScale(1);
                corazon.body.setAllowGravity(false);
            } );
        this.grupo.playAnimation('hearts');
        // this.contadorVida; 
        this.contadorVida = this.vidasGet;
        console.log("contador vida" + this.contadorVida);
        for (let index = this.contadorVida; index < 6; index++) {
            this.grupo.getChildren()[index].visible = false;
        }

        //Grupo de corazones ABAJO
        this.grupoC = this.physics.add.group({
            key: 'hearts',
            repeat: 2,
            setXY: {
                x: 1000,
                y: 700,
                stepX: 800
            }
        });
        this.grupoC.children.iterate((corazon) => {
            corazon.setScale(1);
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
            
        //Grupo de pociones
        
        this.grupo2 = this.physics.add.group({
            key: 'potions',
            repeat: 3,
            setXY: {
            x: this.nami.x + 800,
            y: 100,
            stepX: -100,
            }
            });
        this.grupo2.children.iterate( (pocion) => {
            pocion.setScale(0.8);
            pocion.body.setAllowGravity(false);
        } );

        // this.contadorPocion = 1;
        this.contadorPocion = this.posionesGet;
        for (let index = this.contadorPocion; index < 4; index++) {
            this.grupo2.getChildren()[index].visible = false;
        }

        this.grupo2.playAnimation('potions');
   
        //Grupo de pinchos
        this.grupoO4 = this.physics.add.group({
            key: 'pinchos',
            repeat: 10,
            setXY: {
                x: 1200,
                y: 750,
                stepX: 900
            }  
        });
        
        this.grupoO4.children.iterate( (pincho) => {
            pincho.body.setAllowGravity(false);
            pincho.setScale(4);
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
        function restarVida() {
            this.grupo.getChildren()[this.contadorVida].visible = false;
            this.contadorVida--;
        } 
       
        this.grupoO4.playAnimation('pinchos');

        for (let index = 0; index < 10; index++) {
            this.antorchas[index].anims.play('antorchab'); 
        }
        
        this.banderacofre1 = false;
        this.banderacofre2 = false;
        this.banderacofre3 = false;
    }
    update(time, delta) {
        console.log(this.nami.x);

        var x = 0;
        var y = 0;
       
        if (this.teclas.izq.isDown)
        {
            // this.nami.body.setOffset(60, 70);
            this.nami.body.setSize(23, 50, true);
            this.nami.body.setOffset(70,60);
            if (this.nami.x <= 100) {
                this.nami.x = 100;
            }

            if (this.bgs[0].x <= 0) {
                this.bgs[0].x += 2;
                this.bgs[1].x += 2;
                for(let index = 0; index < 10; index++) {
                    this.puertas[index].x += 2;
                }
                for(let index = 0; index < 10; index++) {
                    this.antorchas[index].x += 2;
                }
                //evitar movimiento al teclear d
                this.cofre.x += 2;
                this.cofre2.x += 2;
                this.cofre3.x += 2;
                this.cofre4.x += 2;
                this.cofre5.x += 2;
                this.cofre6.x += 2;
                for (let index = 0; index < 10; index++) {
                    this.cuadros[index].x += 2;
                }
                this.grupoO4.children.iterate( (pincho) => {
                    pincho.x += 2;
                });
                this.grupoC.children.iterate( (corazon) => {
                    corazon.x += 2;
                });
                this.botonlevel2.x += 2;
                this.pared.x += 2;
                //evitar movimiento al teclear d
            }
        }
        ///////////////////////
        if (this.teclas.der.isDown)
        {
            this.nami.body.setSize(23, 50, true); 
            this.nami.body.setOffset(85,60);
            if (this.nami.x >= 8000) {
                this.nami.x = 8000;
            }
            // this.pared.x -= 2;
            if(!this.teclas.izq.isDown){
                this.nami.x += 6;
                this.fuego.x = this.nami.x - 750;
                this.contenedorfuego.x = this.nami.x - 850; 
                this.contenedorfuegofondo.x = this.nami.x - 850;
                this.contenedor.x = this.nami.x - 650; 
                this.parrafo.x = this.nami.x - 620;  
                this.grupo.children.iterate( (corazon) => {
                    corazon.x = (-800 + this.nami.x ) + (y*100);
                    y++;
                } );
                this.grupo2.children.iterate( (pocion) => {
                    pocion.x = (800 + this.nami.x) - (x*100);
                    x++;
                } );
                if (this.bgs[0].x <= 0) {
                    this.bgs[0].x -= 2;
                    this.bgs[1].x -= 2;
                    for(let index = 0; index < 10; index++) {
                        this.puertas[index].x -= 2;
                    }
                    for(let index = 0; index < 10; index++) {
                        this.antorchas[index].x -= 2;
                    }
                    this.cofre.x -= 2;
                    this.cofre2.x -= 2;
                    this.cofre3.x -= 2;
                    this.cofre4.x -= 2;
                    this.cofre5.x -= 2;
                    this.cofre6.x -= 2;
                    for (let index = 0; index < 10; index++) {
                        this.cuadros[index].x -= 2;
                    }
                    this.grupoO4.children.iterate( (pincho) => {
                        pincho.x -= 2;
                    });
                    this.grupoC.children.iterate( (corazon) => {
                        corazon.x -= 2;
                    });
                    this.botonlevel2.x -= 2;
                    this.pared.x -= 2;
                }
            }

            if (this.bgs[1].x >= - this.bgs[1].displayWidth + 1920) {
            }
        }

        if (this.teclas.izq.isDown)
        {
            if(!this.teclas.der.isDown){
                this.nami.x -= 6;
                this.fuego.x = this.nami.x - 750;
                this.contenedorfuego.x = this.nami.x - 850;
                this.contenedorfuegofondo.x = this.nami.x - 850;
                this.contenedor.x = this.nami.x - 650;
                this.parrafo.x = this.nami.x - 620; 
                
                this.grupo.children.iterate( (corazon) => {
                    corazon.x = (-800 + this.nami.x) + (y*100);
                    y++;
                } );
                this.grupo2.children.iterate( (pocion) => {
                    pocion.x = (800 + this.nami.x) - (x*100);
                    x++;
                } );   
            }

            if (this.bgs[0].x <= 0) {
                
            }
        }

        if (this.teclas.powQ.isDown)
        {}

        if (this.teclas.powR.isDown)
        {}
    }
}

function escena(params, params2, data) {
    params2.start(params, data);
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


export default Level;