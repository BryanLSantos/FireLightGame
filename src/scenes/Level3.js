class Level3 extends Phaser.Scene{
    constructor(){
        super({ key: 'Level3' });
    }
    init(dato) {
        console.log('Escena Level3');
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

        this.load.image('Lava1', 'scenalevel3/lava1.png');
        this.load.image('lineBlock', 'scenalevel/lineBlock.png');
        this.load.image('BlockBlock', 'scenalevel/blockBlock.png');
        this.load.image('antorchab1', 'scenalevel/antorchab1.png');
        this.load.image('cofreestatico', 'scenalevel/cofreestatico.png');
        this.load.image('cuadro', 'scenalevel/cuadro.png');
        this.load.image('cuadrodragon', 'scenalevel/cuadrodragon.png');
        this.load.image('puertaclosed', 'scenalevel/puertaclosed.png');


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

        this.load.spritesheet('lava_idle','scenalevel3/lava_m.png',
        {
            frameWidth: 150,
            frameHeight: 100,
        })

        
        this.load.spritesheet('portal_idle','scenalevel3/portal.png',
        {
            frameWidth: 490,
            frameHeight: 400,
        })

        this.load.spritesheet('nami_death','Nami/deathgOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180,
        })

        this.load.atlas('hearts','hearts/hearts.png','hearts/hearts_atlas.json');
        this.load.animation('heartsAnim','hearts/hearts_anim.json');
        this.load.atlas('potions','potions/potions.png','potions/potions_atlas.json');
        this.load.animation('potionsAnim','potions/potions_anim.json');
        this.load.atlas('pinchos', 'pinchos/pinchos.png','pinchos/pinchos_atlas.json');
        this.load.animation('pinchosAnim','pinchos/pinchos_anim.json');
        this.load.atlas('cofreanimado','cofre/cofreanimado/cofreanimado.png','cofre/cofreanimado/cofreanimado_atlas.json');
        this.load.animation('cofreAnim', 'cofre/cofreanimado_anim/cofreanimado_anim.json');
      
    }

    create(){
       
        this.cameras.main.setBackgroundColor(0x000000)
        // tiempo en milisegundos
        .fadeIn(2000);
        this.bgs = [
            this.add.image(0, 0, "Lava1").setOrigin(0, 0).setDepth(-1),
            this.add.image(0, 0, "Lava1").setOrigin(0, 0).setDepth(-1),
        ];
        this.bgs[1].x = this.bgs[0].displayWidth;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;


        //Creacion de cofre de prueba
         this.cofre = this.physics.add.sprite(1300, 620, 'cofreestatico').setScale(0.8).setImmovable(true);
         this.cofre.body.setSize(100, 50);
         this.cofre.body.setOffset(50, 300);
         this.cofre.body.setAllowGravity(false);
        
         // this.cofre.body.setSize(1, 0.5);
         this.cofre2 = this.physics.add.sprite(2450, 620, 'cofreestatico').setScale(0.8).setImmovable(true);
         this.cofre2.body.setSize(100,50);
         this.cofre2.body.setOffset(50, 300);
         this.cofre2.body.setAllowGravity(false);
 
         this.cofre3 = this.physics.add.sprite(6600, 620, 'cofreestatico').setScale(0.8).setImmovable(true);
         this.cofre3.body.setSize(100,50);
         this.cofre3.body.setOffset(50, 300);
         this.cofre3.body.setAllowGravity(false);
 
         //FISICAS nami
         this.nami = this.physics.add.sprite(this.posicionXNamiGet, 420, 'nami').setOrigin(0.5,0.39).setScale(5);//AQUI SE AGREGA EL SPRITE
         this.fuego = this.add.sprite(this.nami.x - 750, 895, 'fuego_idle').setOrigin(0.5,0.39).setScale(.6).setDepth(7);//AQUI SE AGREGA EL SPRITEa
         this.contenedor = this.add.image(this.nami.x - 650, 830, "contenedortxt").setOrigin(0, 0).setDepth(6).setScale(.45);
         this.contenedorfuego = this.add.image(this.nami.x - 850, 830, "contenedorfuego").setOrigin(0, 0).setDepth(8).setScale(.45);
         this.contenedorfuegofondo = this.add.image(this.nami.x - 850, 830, "contenedorfuegofondo").setOrigin(0, 0).setDepth(6).setScale(.45);
 
        
        this.suelo = this.physics.add.image(300, 750, 'BlockBlock');
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

        
        //FISICAS nami
        this.nami = this.physics.add.sprite(230, 120, 'nami').setOrigin(0.5,0.39).setScale(5).setDepth(4);//AQUI SE AGREGA EL SPRITE
        this.lava = this.physics.add.sprite(0, 0, 'lava_idle').setVisible(false);//AQUI SE AGREGA EL SPRITE
        this.portal = this.physics.add.sprite(0, 0, 'portal_idle').setVisible(false).setDepth(-1);//AQUI SE AGREGA EL SPRITE

        this.grupolava = this.physics.add.group({
            key: 'lava_idle',
            repeat: 9,
            setXY: {
                x: 490,
                y: 790,
                stepX: 570
            }  
        });

        this.grupolava2 = this.physics.add.group({
            key: 'lava_idle',
            repeat: 9,
            setXY: {
                x: 6250,
                y: 790,
                stepX: 570
            }  
        });
        
        this.grupoportal = this.physics.add.group({
            key: 'portal_idle',
            repeat: 3,
            setXY: {
                x: 1790,
                y: 390,
                stepX: 2530
            }  
        });

        //this.physics.add.existing(this.nami, true); //FORMA2 true
        this.nami.body.setCollideWorldBounds(false);
        //HITBOX 38
        // this.nami.body.setSize(18, 45, true);
        // this.nami.body.setOffset(20, 70);
        this.nami.body.setSize(23, 50, true);
        this.nami.body.setOffset(85,60);

        this.physics.add.collider(this.nami, this.suelo, () => {});
        this.physics.add.collider(this.lava, this.suelo, () => {});
        this.physics.add.collider(this.nami, this.techo, () => {});
        // this.nami = this.physics.add.image(300, 720, 'nami');
        // this.nami.body.setAllowGravity(false);

        this.anims.create({
            // Nombre de la animación
            key: 'lava_idle',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('lava_idle', {
                start: 0,
                end: 3
            }),
            
            repeat: -1,
            frameRate: 8
        });

        this.anims.create({
            // Nombre de la animación
            key: 'portal_idle',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('portal_idle', {
                start: 0,
                end: 5
            }),
            
            repeat: -1,
            frameRate: 8
        });

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

        this.physics.add.collider(this.nami, this.cofre, () => {
            if(this.teclas.powX.isDown) {
                // console.log("XXX ");
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
        // this.teclas.powX.on('down', ()=>{
    
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
        // this.contadorVida = 3; 
        this.contadorVida = this.vidasGet;
        console.log("contador vida" + this.contadorVida);
        for (let index = this.contadorVida; index < 6; index++) {
            this.grupo.getChildren()[index].visible = false;
        }
        // this.grupo.getChildren()[3].visible = false;
        // this.grupo.getChildren()[4].visible = false;
        // this.grupo.getChildren()[5].visible = false;

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
            x: 1450,
            y: 100,
            stepX: 100,
            }
            });
        this.grupo2.children.iterate( (posion) => {
            posion.setScale(0.8);
            posion.body.setAllowGravity(false);
        } );
        // this.contadorPocion = 1;
        this.contadorPocion = this.posionesGet;
        for (let index = this.contadorPocion; index < 4; index++) {
            this.grupo2.getChildren()[index].visible = false;
        }
        
        this.grupo2.playAnimation('potions');

        //GRUPO LAVA
        
        this.grupolava.children.iterate( (lava) => {
            lava.body.setAllowGravity(false);
            lava.setScale(1.3);
            //FISICAS Pincho
            this.physics.add.existing(lava, true); //FORMA2 true
            lava.setImmovable(true);
            lava.body.setSize(150,110);
            lava.anims.play("lava_idle");
        } );
        
        this.daño = 0;
        //Nami colisiona con un pincho
        this.physics.add.collider(this.nami, this.grupolava, () => {    
            console.log("colision nami con lava");
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
                        escena("Gameover", this.scene, {reinicio: "true", nivel: "Level3"});
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

        this.grupolava2.children.iterate( (lava) => {
            lava.body.setAllowGravity(false);
            lava.setScale(1.3);
            //FISICAS Pincho
            this.physics.add.existing(lava, true); //FORMA2 true
            lava.setImmovable(true);
            lava.body.setSize(150,110);
            lava.anims.play("lava_idle");
        } );

        this.physics.add.collider(this.nami, this.grupolava2, () => {    
            console.log("colision nami con lava");
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
                        escena("Gameover", this.scene, {reinicio: "true", nivel: "Level3"});
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

        this.grupoportal.children.iterate( (portal) => {
            portal.body.setAllowGravity(false);
            portal.setScale(1.3);
            //FISICAS Pincho
            this.physics.add.existing(portal, true); //FORMA2 true
            portal.setImmovable(true);
            portal.body.setSize(150,110);
            portal.anims.play("portal_idle");
        } );

        function restarVida() {
            this.grupo.getChildren()[this.contadorVida].visible = false;
            this.contadorVida--;
        }
       

        this.banderacofre1 = false;
        this.banderacofre2 = false;
        this.banderacofre3 = false;
       
        //animacion de cofre
        // this.cofre.anims.play('cofreanimado');
    }
    update(time, delta) {
        // if(this.nami.x >= 10055)
        // {
        //     this.nami.x = 10055;
        // }
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
                   
                }
                for(let index = 0; index < 10; index++) {
                    
                }
                this.grupolava.children.iterate( (lava) => {
                    lava.x += 2;
                });
                this.grupolava2.children.iterate( (lava) => {
                    lava.x += 2;
                });
                this.grupoportal.children.iterate( (portal) => {
                    portal.x += 2;
                });
                this.grupoC.children.iterate( (corazon) => {
                    corazon.x += 2;
                })
                this.cofre.x += 2;
                this.cofre2.x += 2;
                this.cofre3.x += 2;
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
                    this.grupolava.children.iterate( (lava) => {
                        lava.x -= 2;
                    });
                    this.grupolava2.children.iterate( (lava) => {
                        lava.x -= 2;
                    });
                    this.grupoportal.children.iterate( (portal) => {
                        portal.x -= 2;
                    });
                    this.grupoC.children.iterate( (corazon) => {
                        corazon.x -= 2;
                    });
                    this.cofre.x -= 2;
                    this.cofre2.x -= 2;
                    this.cofre3.x -= 2;
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

        // if(this.teclas.kspc.isDown && this.nami.x >= 300+300 && this.nami.x <= 300 + 50+500)
        // {
        //     // setInterval(() => {
        //     //     console.log("esta haciendo algo");
        //     //     this.puertas[0].anims.play('puerta');
                
        //     // }, 1500);
            
        //     this.puertas[0].anims.play('puerta');
        //     // setTimeout(() => {

        //         escena("Level3",this.scene);

        //         // escena("Room4",this.scene);
                    
        //     // }, 1500);
        //         // this.scene.start("Room1", {
        //         // });
       
            
        // }
        
        if(this.nami.x >= 750 && this.nami.x <= 750 + 50)
        {
            //this.grupoC.getChildren()[0].visible = false;

            // this.grupo.getChildren()[3].visible = true;
        }
        if(this.nami.x >= 1350 && this.nami.x <= 1350 + 50) 
        {

            //     this.grupoC.getChildren()[1].visible = false;

            // this.grupo.getChildren()[4].visible = true;
        }
    }
}
function escena(params, params2, data) {
    params2.start(params, data);
}
export default Level3;