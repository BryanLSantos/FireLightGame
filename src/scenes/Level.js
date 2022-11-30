class Level extends Phaser.Scene{
    constructor(){
        super({ key: 'Level' });
    }

    init() {
        console.log('Escena Level');
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
        this.load.image('buttonlevel2', 'buttonlevel2/buttonlevel2.png');

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
        // this.load.spritesheet('nami_q','Medieval nami/Sprites/Attack1.png',
        // {
        //     frameWidth: 160,
        //     frameHeight: 111
        // })

        // this.load.spritesheet('nami_e','Medieval nami/Sprites/Attack2.png',
        // {
        //     frameWidth: 160,
        //     frameHeight: 111
        // })
        //ENEMIGOS
        
        this.load.atlas('slime', '/enemigos/limo/slime.png','/enemigos/limo/slime_atlas.json');
        this.load.animation('limo', '/enemigos/limo/slime_anim.json');
        
        //king
        /*
        this.load.spritesheet('king_dead','/enemigos/king2/king_dead.png',
        {
            frameWidth: 125,
            frameHeight: 98,
            margin: 1,
        });
        this.load.spritesheet('king_at','/enemigos/king2/king_at.png',
        {
            frameWidth: 100,
            frameHeight: 100,
            margin: 4,
            spacing: 1,
        });
*/
        //amadura 
        /*
        this.load.spritesheet('armo','/enemigos/amaduraNe/armo_.png',
        {
            frameWidth: 512,
            frameHeight: 512,
            margin: 1
        });
        this.load.spritesheet('armo_atk','/enemigos/amaduraNe/armo_atk.png',
        {
            frameWidth: 68,
            frameHeight: 68,
            margin: 3,
            spacing: 3,
        });
        this.load.spritesheet('armo_walk','/enemigos/amaduraNe/armo_walk.png',
        {
            frameWidth: 68,
            frameHeight:62,
            margin: 1,
            spacing: 2
        });
        */
        //esqueleto
        
        this.load.spritesheet('esq_idle','/enemigos/esqueleto/esq_idle.png',
        {
            frameWidth: 143,
            frameHeight: 109,
            margin: 1,
            spacing:1,
        });
        this.load.spritesheet('esq_atk','/enemigos/esqueleto/esq_atk.png',
        {
            frameWidth: 143,
            frameHeight: 109,
            margin: 1,
            spacing:2,
        });
        this.load.spritesheet('esq_dead','/enemigos/esqueleto/esq_dead.png',
        {
            frameWidth: 143,
            frameHeight: 109,
            margin: 1,
            spacing:2,
        });
        this.load.spritesheet('esq_walk','/enemigos/esqueleto/esq_walk.png',
        {
            frameWidth: 162,
            frameHeight: 103,
            margin: 2,
            spacing:3,
        });

        //esqf
        /*
        this.load.spritesheet('esqF_atk','/enemigos/esqueletofuerte/esqF_atk.png',
        {
            frameWidth: 105,
            frameHeight: 97,
            margin: 2
        });
        this.load.spritesheet('esqF_dead','/enemigos/esqueletofuerte/esqF_dead.png',
        {
            frameWidth: 99,
            frameHeight: 97,
            margin: 2
        });
        this.load.spritesheet('esqF_idle','/enemigos/esqueletofuerte/esqF_idle.png',
        {
            frameWidth: 99,
            frameHeight: 97,
            margin: 2
        });*/
        //goblin
        /*
        this.load.spritesheet('go_walk','/enemigos/goblin/go_walk.png',
        {
            frameWidth: 143,
            frameHeight: 109,
            margin: 2
        });
        this.load.spritesheet('go_idle','/enemigos/goblin/go_idle.png',
        {
            frameWidth: 143,
            frameHeight: 109,
            margin: 2
        }); 
        this.load.spritesheet('go_atk','/enemigos/goblin/go_atk.png',
        {
            frameWidth: 143,
            frameHeight: 109,
            margin: 2
        });  
        this.load.spritesheet('go_dead','/enemigos/goblin/go_dead.png',
        {
            frameWidth: 140,
            frameHeight: 140,
            margin: 2
        });  
        */
        // golem
        /*
        this.load.spritesheet('golem_atk','/enemigos/golem/golem_atk.png',
        {
            frameWidth: 99,
            frameHeight: 85,
            margin: 2,
            spacing: 3,
        });      
        this.load.spritesheet('golem_dead','/enemigos/golem/golem_dead.png',
        {
            frameWidth: 99,
            frameHeight: 85,
            margin: 2,
            spacing: 3,
        });     
        this.load.spritesheet('golem_idle','/enemigos/golem/golem_idle.png',
        {
            frameWidth: 99,
            frameHeight: 85,
            margin: 2,
            spacing: 3,
        }); 
        */

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
            // this.antorchas[index] = this.add.image(index*230, 420, "antorchab1").setOrigin(1, 1).setDepth(0);
            this.antorchas[index].setScale(4);
        }
        //Creacion cuadros
        //this.cuadro = this.add.image(1200, 400, 'cuadro').setScale(0.15).setDepth(0);
        this.cuadros = [];
        for(let index = 0; index < 10; index++) {
            // if(index%2==0){
                this.cuadros[index] = this.add.image((index*1100)+220, 580, "cuadro").setDepth(0);
                this.cuadros[index].setScale(0.25);
            // }
        }

        //Creacion Puertas
        this.puertas = [];
        for(let index = 0; index < 10; index++) {
            // this.puertas[index] = this.add.image(index*1000, 770, "puertaCerrada").setOrigin(1, 1).setDepth(0);
            //this.puertas[index].setScale(0.6);
            // if(index%2==0){
                this.puertas[index] = this.add.sprite((index*1100)+650, 530, "puertaclosed").setDepth(0);
                this.puertas[index].setScale(2.4);
            // }
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

        
        this.botonlevel2 = this.add.image(4000, 800, 'buttonlevel2');
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
        this.cofre = this.add.sprite(1000, 680, 'cofreestatico', 0).setScale(0.8);
        this.cofre2 = this.add.sprite(2450, 680, 'cofreestatico', 0).setScale(0.8);
        this.cofre3 = this.add.sprite(3400, 680, 'cofreestatico', 0).setScale(0.8);

        //FISICAS nami
        this.nami = this.physics.add.sprite(1000, 120, 'nami').setOrigin(0.5,0.39).setScale(5);//AQUI SE AGREGA EL SPRITE
        this.fuego = this.add.sprite(this.nami.x - 750, 895, 'fuego_idle').setOrigin(0.5,0.39).setScale(.6).setDepth(7);//AQUI SE AGREGA EL SPRITEa
        this.contenedor = this.add.image(this.nami.x - 650, 830, "contenedortxt").setOrigin(0, 0).setDepth(6).setScale(.45);
        this.contenedorfuego = this.add.image(this.nami.x - 850, 830, "contenedorfuego").setOrigin(0, 0).setDepth(8).setScale(.45);
        this.contenedorfuegofondo = this.add.image(this.nami.x - 850, 830, "contenedorfuegofondo").setOrigin(0, 0).setDepth(6).setScale(.45);
     
        //this.physics.add.existing(this.nami, true); //FORMA2 true
        // this.nami.body.setCollideWorldBounds(false);
        // this.nami.body.setSize(48, 45, true);
        // this.nami.body.setOffset(72, 70);
        this.nami.body.setSize(23, 50, true);
        this.nami.body.setOffset(85,60);
       
        this.physics.add.collider(this.nami, this.suelo, () => {});
        this.physics.add.collider(this.nami, this.techo, () => {});
        // this.physics.add.collider(this.fuego, this.suelo, () => {});
        // this.nami = this.physics.add.image(300, 720, 'nami');
        // this.nami.body.setAllowGravity(false);
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
            this.nami.body.setSize(23, 50, true); //this.nami.body.setSize(48, 45, true);
            this.nami.body.setOffset(85,60); //this.nami.body.setOffset(72, 70);
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

        // this.teclas.powX.on('down', ()=>{
            
        //     this.cameras.main
        //     .fadeOut(1000);
        //     setTimeout(() => {
        //         this.scene.start("Room4", {
        //         });
        //     }, 1300);
        //             // this.scene.start("Room4", {
        //             // });

        //                     // if(this.teclas.kspc.isDown && this.nami.x >= 300 && this.nami.x <= 300 + 50)
        // // {
        // //     this.puertas[0].anims.play('puerta');
        // //     this.cameras.main
        // //     .fadeOut(1000);
        // //     setTimeout(() => {
        // //         this.scene.start('Room4',500);
        // //     }, 1300);
            
        // // }
                
            
        // });
        //Grupo de corazones ARRIBA
        this.grupo = this.physics.add.group({
            key: 'hearts',
            repeat: 5,
            setXY: {
            x: 350,
            y: 100,
            stepX: 100
            }
            });
            this.grupo.children.iterate( (corazon) => {
                corazon.setScale(1);
                corazon.body.setAllowGravity(false);
            } );
        this.grupo.playAnimation('hearts');
        this.contadorVida = 3; 
        this.grupo.getChildren()[3].visible = false;
        this.grupo.getChildren()[4].visible = false;
        this.grupo.getChildren()[5].visible = false;

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
            this.grupo.getChildren()[this.contadorVida].visible = true;
            this.contadorVida++;
        });
   
            
        //Grupo de pociones
        
        this.grupo2 = this.physics.add.group({
            key: 'potions',
            repeat: 3,
            setXY: {
            x: 1450,
            y: 100,
            stepX: 100,
            }
            });
        this.grupo2.children.iterate( (posion) => {
            posion.setScale(0.8);
            posion.body.setAllowGravity(false);
        } );
        this.contadorPocion = 1;
        this.grupo2.getChildren()[1].visible = false;
        this.grupo2.getChildren()[2].visible = false;
        this.grupo2.getChildren()[3].visible = false;
        this.grupo2.playAnimation('potions');

        //Grupo linea de bloques
        // this.grupoO = this.physics.add.group({
        //     key: 'lineBlock',
        //     repeat: 3,
        //     setXY: {
        //         x: 1000,
        //         y: 300,
        //         stepX: 900
        //     }
        // });
        // this.grupoO.children.iterate( (block) => {
        //     block.body.setAllowGravity(false);
        //     this.physics.add.existing(block, true); //FORMA2 true
        //     block.setImmovable();
        // } );
        // this.physics.add.collider(this.nami, this.grupoO, () => {
        //     // this.nami.setVelocity(0);
        //     // this.nami.setAcceleration(0);
        //     console.log("colision rey con bloque largo");
        // });
        // //2d0 grupo de linea de bloques
        // this.grupoO2 = this.physics.add.group({
        //     key: 'lineBlock',
        //     repeat: 4,
        //     setXY: {
        //         x: 1193,
        //         y: 300,
        //         stepX: 900
        //     }
        // });
        // this.grupoO2.children.iterate( (block) => {
        //     block.body.setAllowGravity(false);
        //     this.physics.add.existing(block, true); //FORMA2 true
        //     block.setImmovable();
        // } );
        // this.physics.add.collider(this.nami, this.grupoO2, () => {
        //     // this.nami.setVelocity(0);
        //     // this.nami.setAcceleration(0);
        //     console.log("colision rey con bloque largo");
        // });
        // //3er grupo de linea de bloques
        // this.grupoO3 = this.physics.add.group({
        //     key: 'BlockBlock',
        //     repeat: 2,
        //     setXY: {
        //         x: 800,
        //         y: 466,
        //         stepX: 900
        //     }
        // });
        // this.grupoO3.children.iterate( (block) => {
        //     block.body.setAllowGravity(false);
        //     this.physics.add.existing(block, true); //FORMA2 true
        //     block.setImmovable();
        // } );
        // this.physics.add.collider(this.nami, this.grupoO3, () => {
        //     // this.nami.setVelocity(0);
        //     // this.nami.setAcceleration(0);
        //     console.log("colision rey con bloque");
        // });
   
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
            //pincho.body.setOffset(62, 50);
            pincho.body.setSize(27, 15, true);
            //pincho.body.setOffset(72, 70);
        } );
        this.daño = 0;
        //Nami colisiona con un pincho
        this.physics.add.collider(this.nami, this.grupoO4, () => {    
            console.log("colision nami con pinchos");
            this.cameras.main
            .setBackgroundColor(0x000000)
            //.fadeOut(500);
            // tiempo en milisegundos, intensidad en [0,1]
            .shake(500, 0.03);
            //this.cameras.main.fadeIn(500);
            //setVelocity(200);
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
                    // this.nami.anims.play("nami_death");
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
                        escena("Level",this.scene);
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
            // this.nami.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            //     this.grupo.getChildren()[this.contadorVida].visible = false;
            //     this.contadorVida--;
            // });
           
             // restarVida();
            //this.events.off('restarVida');
            //this.events.once('addImage', this.handler, this);
            // this.nami.setVelocityX(this.nami.body.velocity.x -=20);
            // this.nami.setVelocityY(0);
            // this.nami.setVelocityX( this.nami.body.velocity.x -= 100);
            // this.nami.setVelocityY( this.nami.body.velocity.y += 500);  
            // this.timeline = this.tweens.createTimeline({
            //     targets: this.nami, 
            //     ease: 'Linear',
            //     duration: 3000,
            //     // tweens: [{
            //     //     // x: 600
            //     // },
            //     // {
            //     //     // y: 500,
            //     //     // offset: '-=500'
            //     // },
            //     // {
            //     //     // x: 100,
            //     //     // offset: '-=500'
            //     // },
            //     // {
            //     //     // y: 100,
            //     //     // offset: '-=500'
            //     // }],
            //     onComplete: function() {
            //         // this.grupo.getChildren()[3].visible = false;
            //         // this.grupo.getChildren()[this.contadorVida].visible = false;
            //         this.contadorVida--;
            //         console.log("se colisiono ahora en tween");
            //     }
            // }); 
            // this.timeline.play();
            
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
       
        //animacion de cofre
        // this.cofre.anims.play('cofreanimado');
    }
    update(time, delta) {
        if(this.nami.x >= 8150)
        {
            this.nami.x = 8150;
        }
        // if(this.colisionPinchos==true){
        //     setInterval(() => {
        //         this.grupo.getChildren()[this.contadorVida].visible = false;
        //         this.contadorVida--;
        //         this.colisionPinchos = false;
        //     }, 1000);
        // }
        var x = 0;
        var y = 0;
        //////////////////////
        // if (this.bgs[1].x >= - this.bgs[1].displayWidth + 1920) {
        //     this.bgs[0].x -= 2;
        //     this.bgs[1].x -= 2;
        // }
       
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
            }
        }
        ///////////////////////77
        if (this.teclas.der.isDown)
        {
            // this.nami.body.setOffset(72, 70);
            this.nami.body.setSize(23, 50, true); 
            this.nami.body.setOffset(85,60);
            
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

                }
            }
            // this.grupo2[0].x += 2;
            // this.grupo2[1].x += 2;
            // this.grupo2[2].x += 2;
            // this.grupo2[3].x += 2;
            // this.grupo2[4].x += 2;
            // this.grupo2[5].x += 2;
            // if (this.nami.x >= 1820) {
            //     this.nami.x = 1820;
            // }
/////////////////////
            
///////////////////

            if (this.bgs[1].x >= - this.bgs[1].displayWidth + 1920) {
                // this.bgs[0].x -= 2;
                // this.bgs[1].x -= 2;

                // this.grupoC.children.iterate((corazon) => {
                //     corazon.x -= 2;
                // });
                // this.grupoO.children.iterate((corazon) => {
                //     corazon.x -= 2;
                // });
                // this.grupoO2.children.iterate((corazon) => {
                //     corazon.x -= 2;
                // });
                // this.grupoO3.children.iterate((corazon) => {
                //     corazon.x -= 2;
                // });
                // this.grupoO4.children.iterate((corazon) => {
                //     corazon.x -= 2;
                // });
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
            // if (this.nami.x <= 100) {
            //     this.nami.x = 100;
            // }

            if (this.bgs[0].x <= 0) {
                // this.bgs[0].x += 2;
                // this.bgs[1].x += 2;

                // this.grupoC.children.iterate((corazon) => {
                //     corazon.x += 2;
                // });
                // this.grupoO.children.iterate((corazon) => {
                //     corazon.x += 2;
                // });
                // this.grupoO2.children.iterate((corazon) => {
                //     corazon.x += 2;
                // });
                // this.grupoO3.children.iterate((corazon) => {
                //     corazon.x += 2;
                // });
                // this.grupoO4.children.iterate((corazon) => {
                //     corazon.x += 2;
                // });
            }
        }

        if (this.teclas.powQ.isDown)
        {}

        if (this.teclas.powR.isDown)
        {}

        if(this.teclas.powX.isDown && this.nami.x >= 300+300 && this.nami.x <= 300 + 50+500)
        {
            // setInterval(() => {
            //     console.log("esta haciendo algo");
            //     this.puertas[0].anims.play('puerta');
                
            // }, 1500);
            
            this.puertas[0].anims.play('puerta');
            // setTimeout(() => {
                clearInterval(this.textos);
                escena("Room1",this.scene);



                // escena("Room4",this.scene);
                    
            // }, 1500);       
        }
        if(this.teclas.powX.isDown && this.nami.x >= 3420+300 && this.nami.x <= 3460 + 50+500) //this.nami.x >= 1250+300 && this.nami.x <= 1350 + 50+500
        { //4ta puerta this.nami.x >= 3420+300 && this.nami.x <= 3460 + 50+500
            this.puertas[1].anims.play('puerta');
            escena("Room2",this.scene);
        }
        if(this.teclas.powX.isDown && this.nami.x >= 5520+300 && this.nami.x <= 5760 + 50+500) //this.nami.x >= 2120+300 && this.nami.x <= 2360 + 50+500
        {   //5ta puerta this.nami.x >= 4520+300 && this.nami.x <= 4560 + 50+500
            this.puertas[2].anims.play('puerta');
            escena("Room3",this.scene);
        }
        if(this.teclas.powX.isDown && this.nami.x >= 6720+300 && this.nami.x <= 6860 + 50+500)
        {//6tapuerta this.nami.x >= 5520+300 && this.nami.x <= 5760 + 50+500
            this.puertas[3].anims.play('puerta');
            escena("Room4",this.scene);
        }
        if(this.teclas.powX.isDown && this.nami.x >= 950 && this.nami.x <= 50+950 && this.banderacofre1==false)
        {
            this.cofre.anims.play('cofreanimado');
            this.banderacofre1 = true;
            this.grupo2.getChildren()[this.contadorPocion].visible = true;
            this.contadorPocion++;
        }
        if(this.teclas.powX.isDown && this.nami.x >= 2350 && this.nami.x <= 50+2450 && this.banderacofre2==false)
        {
            this.cofre2.anims.play('cofreanimado');
            this.banderacofre2 = true;
            this.grupo2.getChildren()[this.contadorPocion].visible = true;
            this.contadorPocion++;
        }
        if(this.teclas.powX.isDown && this.nami.x >= 3350 && this.nami.x <= 50+3450 && this.banderacofre3==false)
        {
            this.cofre3.anims.play('cofreanimado');
            this.banderacofre3 = true;
            this.grupo2.getChildren()[this.contadorPocion].visible = true;
            this.contadorPocion++;
        }

        //console.log(this.nami.x);
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
export default Level;