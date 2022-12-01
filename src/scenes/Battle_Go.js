class Battle_Go extends Phaser.Scene{
    
    constructor(){
        super({ key: 'Battle_Go' });
    }

    init(datos){
        console.log('Escena Battle');
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;

        this.vida_res = datos.vidas;
        this.pocion_res = datos.posiones;
        this.namiX = datos.posicionXNami;
        // this.vida_res = 1;

        this.vida = 5;
        this.pociones = 4;
        this.vidaEnemy = 0;
        this.pocionesEnemy = 3;

        this.opc = 0;
    }

    preload(){
        this.load.path = './assets/';

        this.load.image('3', 'Battle/3.png');
        this.load.image('Button', 'Battle/Button.png');

        this.load.spritesheet('nami','Nami/idlegOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180
        });

        this.load.spritesheet('nami_attack','Nami/attack1gOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180
        });
        this.load.spritesheet('nami_attack2','Nami/attack2gOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180
        });

        this.load.spritesheet('nami_hit','Nami/Take_Hit.png',
        {
            frameWidth: 180,
            frameHeight: 180
        });

        this.load.spritesheet('shield','Nami/Shield.png',
        {
            frameWidth: 400,
            frameHeight: 600
        });

        this.load.spritesheet('health','Nami/Health.png',
        {
            frameWidth: 320,
            frameHeight: 320
        });
        
        this.load.spritesheet('nami_die','Nami/deathgOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180
        });

        this.load.spritesheet('enemy','enemigos/goblin/go_idle.png',
        {
            frameWidth: 150,
            frameHeight: 150
        });

        this.load.spritesheet('enemy_at','enemigos/goblin/go_at.png',
        {
            frameWidth: 150,
            frameHeight: 150
        });

        this.load.spritesheet('enemy_dead','enemigos/goblin/go_dead.png',
        {
            frameWidth: 150,
            frameHeight: 150
        });

        this.load.atlas('hearts','hearts/hearts.png','hearts/hearts_atlas.json');
        this.load.animation('heartsAnim','hearts/hearts_anim.json');
        this.load.atlas('potions','potions/potions.png','potions/potions_atlas.json');
        this.load.animation('potionsAnim','potions/potions_anim.json');

    }

    
    create(){
        const eventos = Phaser.Input.Events;

        this.battle = this.add.image(this.width/2, this.height/2, '3');

        this.btn1 = this.add.image(500, this.height/8, 'Button').setScale(0.2, 0.1).setDepth(10).setInteractive();
        this.btn2 = this.add.image(1420, this.height/8, 'Button').setScale(0.2, 0.1).setDepth(10).setInteractive();
        this.btn3 = this.add.image(500, this.height/3.5, 'Button').setScale(0.2, 0.1).setDepth(10).setInteractive();
        this.btn4 = this.add.image(1420, this.height/3.5, 'Button').setScale(0.2, 0.1).setDepth(10).setInteractive();

        this.txt1 = this.add.text(440, 110, "Golpe", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'black'}).setDepth(10);
        this.txt2 = this.add.text(1375, 110, "Tiro", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'black'}).setDepth(10);
        this.txt3 = this.add.text(435, 285, "Pocion", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'black'}).setDepth(10);
        this.txt4 = this.add.text(1335, 285, "Cubrirse", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'black'}).setDepth(10);

        this.txtTurn = this.add.text(this.width/2 - 95, 400, "Tu Turno", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'white'}).setDepth(10);
        this.txtWin = this.add.text(this.width/2 - 80, 400, "Ganaste", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'white'}).setDepth(10);
        this.txtLose = this.add.text(this.width/2 - 80, 400, "Perdiste", {fontFamily: 'IM Fell English SC', fontSize: '45px', color: 'white'}).setDepth(10);
        this.txtTurn.alpha = 0.0;
        this.txtWin.alpha = 0.0;
        this.txtLose.alpha = 0.0;

        this.suelo = this.physics.add.image(300, 1000, 'BlockBlock');
        this.suelo.body.setAllowGravity(false);
        this.suelo.setImmovable();
        this.suelo.body.setSize(100000, 55, true);
        this.suelo.setVisible(false);

        this.nami = this.physics.add.sprite(450, 820, 'nami').setScale(6);
        this.nami.body.setCollideWorldBounds(false);

        this.shield = this.physics.add.sprite(650, 820, 'shield').setScale(.5);
        this.shield.body.setAllowGravity(false);
        this.shield.body.setSize(100, 200);
        this.shield.setVisible(false);

        this.health = this.physics.add.sprite(430, 720, 'health').setScale(.2);
        this.health2 = this.physics.add.sprite(550, 750, 'health').setScale(.2);
        this.health3 = this.physics.add.sprite(490, 820, 'health').setScale(.2);
        this.health.body.setAllowGravity(false);
        this.health.body.setSize(100, 100);
        this.health2.body.setAllowGravity(false);
        this.health2.body.setSize(100, 100);
        this.health3.body.setAllowGravity(false);
        this.health3.body.setSize(100, 100);
        this.health.setVisible(false);
        this.health2.setVisible(false);
        this.health3.setVisible(false);

        this.nami.body.setSize(48, 45, true);
        this.nami.body.setOffset(72, 70);
        this.physics.add.collider(this.nami, this.suelo, () => {});

        this.enemy = this.physics.add.sprite(1450, 790, 'enemy').setScale(6);
        this.enemy.body.setCollideWorldBounds(false);

        this.enemy.body.setSize(20, 50, true);
        // this.enemy.body.setOffset(72, 70);
        this.physics.add.collider(this.enemy, this.suelo, () => {});
        this.enemy.flipX = true;

        this.health_enemy = this.physics.add.sprite(1380, this.enemy.y - 70, 'health').setScale(.2);
        this.health_enemy2 = this.physics.add.sprite(1500, this.enemy.y - 50, 'health').setScale(.2);
        this.health_enemy3 = this.physics.add.sprite(1440, this.enemy.y, 'health').setScale(.2);
        this.health_enemy.body.setAllowGravity(false);
        this.health_enemy.body.setSize(100, 100);
        this.health_enemy2.body.setAllowGravity(false);
        this.health_enemy2.body.setSize(100, 100);
        this.health_enemy3.body.setAllowGravity(false);
        this.health_enemy3.body.setSize(100, 100);
        this.health_enemy.setVisible(false);
        this.health_enemy2.setVisible(false);
        this.health_enemy3.setVisible(false);

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

        this.anims.create({
            // Nombre de la animación
            key: 'nami_attack',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_attack', {
                start: 0,
                end: 5
            }),
            
            repeat: 0,
            frameRate: 10
        });

        this.anims.create({
            // Nombre de la animación
            key: 'nami_hit',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_hit', {
                start: 0,
                end: 4
            }),
            
            repeat: 0,
            frameRate: 6
        });

        this.anims.create({
            // Nombre de la animación
            key: 'nami_attack2',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_attack2', {
                start: 0,
                end: 5
            }),
            
            repeat: 0,
            frameRate: 10
        });

        this.anims.create({
            // Nombre de la animación
            key: 'nami_die',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('nami_die', {
                start: 0,
                end: 10
            }),
            
            repeat: 0,
            frameRate: 10
        });

        this.anims.create({
            // Nombre de la animación
            key: 'shield',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('shield', {
                start: 0,
                end: 11
            }),
            
            repeat: 0,
            frameRate: 12
        });
        this.nami.anims.play('nami_idle');

        this.anims.create({
            // Nombre de la animación
            key: 'enemy_idle',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 3
            }),
            
            repeat: -1,
            frameRate: 9
        });

        this.anims.create({
            // Nombre de la animación
            key: 'enemy_attack',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('enemy_at', {
                start: 0,
                end: 7
            }),
            
            repeat: 0,
            frameRate: 9
        });

        this.anims.create({
            // Nombre de la animación
            key: 'enemy_dead',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('enemy_dead', {
                start: 0,
                end: 3
            }),
            
            repeat: 0,
            frameRate: 9
        });

        this.anims.create({
            // Nombre de la animación
            key: 'health',
            // Se cargan los frames por números
            // NOTA: generateFrameNames() se
            // usa cuando ya existe un Atlas
            frames: this.anims.generateFrameNumbers('health', {
                start: 0,
                end: 3
            }),
            
            repeat: -1,
            frameRate: 4
        });

        this.enemy.anims.play('enemy_idle');


        this.grupo = this.physics.add.group({
            key: 'hearts',
            repeat: this.vida,
            setXY: {
            x: 450,
            y: this.nami.y - 210,
            stepX: 35
            }
        });

        this.grupo.children.iterate( (corazon) => {
                corazon.setScale(.4);
                corazon.body.setAllowGravity(false);
        } );

        for (let index = this.vida; index >= this.vida_res; index--) {
            this.grupo.getChildren()[this.vida].visible = false;
            this.vida--; 
        }

        this.grupo.playAnimation('hearts');

        this.grupo2 = this.physics.add.group({
            key: 'potions',
            repeat: this.pociones,
            setXY: {
            x: 485,
            y: this.nami.y - 170,
            stepX: 35,
            }
        });

        this.grupo2.children.iterate( (pocion) => {
            pocion.setScale(0.2);
            pocion.body.setAllowGravity(false);
        } );

        for (let index = this.pociones; index >= this.pocion_res; index--) {
            this.grupo2.getChildren()[this.pociones].visible = false;
            this.pociones--; 
        }

        this.grupo2.playAnimation('potions');

        this.grupoEnemy = this.physics.add.group({
            key: 'hearts',
            repeat: this.vidaEnemy,
            setXY: {
            x: 1475,
            y: this.enemy.y - 160,
            stepX: -35
            }
        });

        this.grupoEnemy.children.iterate( (corazon) => {
                corazon.setScale(.4);
                corazon.body.setAllowGravity(false);
        } );

        this.grupoEnemy.playAnimation('hearts');

        this.grupoEnemy2 = this.physics.add.group({
            key: 'potions',
            repeat: this.pocionesEnemy,
            setXY: {
            x: 1440,
            y: this.enemy.y - 120,
            stepX: -35,
            }
        });

        this.grupoEnemy2.children.iterate( (pocion) => {
            pocion.setScale(0.2);
            pocion.body.setAllowGravity(false);
        } );

        show(this, this.txtTurn);

        this.grupoEnemy2.playAnimation('potions');

        this.btn1.on(eventos.POINTER_OVER, function() {
            this.setTint(0x7d7264);
        });
        this.btn1.on(eventos.POINTER_OUT, function() {
            this.clearTint();
        });

        this.btn1.on('pointerdown',()=>{
            this.nami.anims.play('nami_attack');

            this.btn1.disableInteractive();
            this.btn2.disableInteractive();
            this.btn3.disableInteractive();
            this.btn4.disableInteractive();

            this.enemy.setTint(0xff0000);
            this.grupoEnemy.getChildren()[this.vidaEnemy].visible = false;
            this.vidaEnemy--;
            setTimeout(() => {
                this.enemy.clearTint();
                setTimeout(() => {
                    this.enemy.setTint(0xff0000);
                    setTimeout(() => {
                        this.enemy.clearTint();
                        setTimeout(() => {
                            this.enemy.setTint(0xff0000);
                            setTimeout(() => {
                                this.enemy.clearTint();
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }, 200);

            setTimeout(() => {
                this.nami.anims.play('nami_idle');
            }, 1000);

            setTimeout(() => {
                // this.turn == false;
                hide(this, this.txtTurn);
            }, 2000);

            setTimeout(() => {
                if (this.vidaEnemy < 0) {
                    this.enemy.anims.play('enemy_dead');
                    show(this, this.txtWin);
                    setTimeout(() => {
                        escena("Level",this.scene, {vidas: this.vida + 1, posiones: this.pociones + 1, posicionXNami: this.namiX});
                    }, 1000);
                } else {
                    this.opc = getRandomInt(99) + 1;
                    console.log(this.opc);
                    if (this.opc % 2 == 0) {
                        this.enemy.anims.play('enemy_attack');
                        setTimeout(() => {
                            this.enemy.anims.play('enemy_idle');
                            this.nami.anims.play('nami_hit');
                            this.grupo.getChildren()[this.vida].visible = false;
                            this.vida--;
                            this.nami.setTint(0xff0000);
                            setTimeout(() => {
                                this.nami.clearTint();
                                setTimeout(() => {
                                    this.nami.setTint(0xff0000);
                                    setTimeout(() => {
                                        this.nami.clearTint();
                                        setTimeout(() => {
                                            this.nami.setTint(0xff0000);
                                            setTimeout(() => {
                                                this.nami.clearTint();
                                                this.nami.anims.play('nami_idle');
                                                setTimeout(() => {
                                                    if (this.vida < 0) {
                                                        this.nami.anims.play('nami_die');
                                                        show(this, this.txtLose);
                                                        setTimeout(() => {
                                                            this.scene.start('Gameover');
                                                        }, 2000);
                                                    } else {
                                                        show(this, this.txtTurn);
                                                        this.btn1.setInteractive();
                                                        this.btn2.setInteractive();
                                                        this.btn3.setInteractive();
                                                        this.btn4.setInteractive();
                                                    }
                                                }, 1000);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 200);
                        }, 1000);
                    } else {
                        if (this.pocionesEnemy >= 0) {
                            this.health_enemy.setVisible(true);
                            this.health_enemy2.setVisible(true);
                            this.health_enemy3.setVisible(true);
                            this.health_enemy.anims.play('health');
                            this.health_enemy2.anims.play('health');
                            this.health_enemy3.anims.play('health');
    
                            this.grupoEnemy2.getChildren()[this.pocionesEnemy].visible = false;
                            this.pocionesEnemy--;
    
                            setTimeout(() => {
                                // this.turn == false;
                                this.health_enemy.setVisible(false);
                                this.health_enemy2.setVisible(false);
                                this.health_enemy3.setVisible(false);
                                this.health_enemy.anims.stop();
                                this.health_enemy2.anims.stop();
                                this.health_enemy3.anims.stop();
                                if (this.vidaEnemy < 5) {
                                    this.vidaEnemy++;
                                    this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                    if (this.vidaEnemy < 5) {
                                        this.vidaEnemy++;
                                        this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                    }
                                }
    
                                setTimeout(() => {
                                    show(this, this.txtTurn);
                                    this.btn1.setInteractive();
                                    this.btn2.setInteractive();
                                    this.btn3.setInteractive();
                                    this.btn4.setInteractive();
                                }, 1000);
                            }, 2000);
                        } else {
                            this.enemy.anims.play('enemy_attack');
                            setTimeout(() => {
                                this.enemy.anims.play('enemy_idle');
                                this.nami.anims.play('nami_hit');
                                this.grupo.getChildren()[this.vida].visible = false;
                                this.vida--;
                                this.nami.setTint(0xff0000);
                                setTimeout(() => {
                                    this.nami.clearTint();
                                    setTimeout(() => {
                                        this.nami.setTint(0xff0000);
                                        setTimeout(() => {
                                            this.nami.clearTint();
                                            setTimeout(() => {
                                                this.nami.setTint(0xff0000);
                                                setTimeout(() => {
                                                    this.nami.clearTint();
                                                    this.nami.anims.play('nami_idle');
                                                    setTimeout(() => {
                                                        if (this.vida < 0) {
                                                            this.nami.anims.play('nami_die');
                                                            show(this, this.txtLose);
                                                            setTimeout(() => {
                                                                this.scene.start('Gameover');
                                                            }, 2000);
                                                        } else {
                                                            show(this, this.txtTurn);
                                                            this.btn1.setInteractive();
                                                            this.btn2.setInteractive();
                                                            this.btn3.setInteractive();
                                                            this.btn4.setInteractive();
                                                        }
                                                    }, 1000);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 1000);
                        }
                    }
                }
            }, 4000);
        });

        this.btn2.on(eventos.POINTER_OVER, function() {
            this.setTint(0x7d7264);
        });
        this.btn2.on(eventos.POINTER_OUT, function() {
            this.clearTint();
        });

        this.btn2.on('pointerdown',()=>{
            // console.log("boton2");
            this.nami.anims.play('nami_attack2');

            this.btn1.disableInteractive();
            this.btn2.disableInteractive();
            this.btn3.disableInteractive();
            this.btn4.disableInteractive();

            setTimeout(() => {
                this.nami.anims.play('nami_idle');
                this.enemy.setTint(0xff0000);
                this.grupoEnemy.getChildren()[this.vidaEnemy].visible = false;
                this.vidaEnemy--;
                setTimeout(() => {
                    this.enemy.clearTint();
                    setTimeout(() => {
                        this.enemy.setTint(0xff0000);
                        setTimeout(() => {
                            this.enemy.clearTint();
                            setTimeout(() => {
                                this.enemy.setTint(0xff0000);
                                setTimeout(() => {
                                    this.enemy.clearTint();
                                }, 200);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }, 1000);

            setTimeout(() => {
                // this.turn == false;
                hide(this, this.txtTurn);
            }, 2000);

            setTimeout(() => {
                if (this.vidaEnemy < 0) {
                    this.enemy.anims.play('enemy_dead');
                    show(this, this.txtWin);
                    setTimeout(() => {
                        escena("Level",this.scene, {vidas: this.vida + 1, posiones: this.pociones + 1, posicionXNami: this.namiX});
                    }, 1000);
                } else {
                    this.opc = getRandomInt(99) + 1;
                    console.log(this.opc);
                    if (this.opc % 2 == 0) {
                        this.enemy.anims.play('enemy_attack');
                        setTimeout(() => {
                            this.enemy.anims.play('enemy_idle');
                            this.nami.anims.play('nami_hit');
                            this.nami.setTint(0xff0000);
                            this.grupo.getChildren()[this.vida].visible = false;
                            this.vida--;
                            setTimeout(() => {
                                this.nami.clearTint();
                                setTimeout(() => {
                                    this.nami.setTint(0xff0000);
                                    setTimeout(() => {
                                        this.nami.clearTint();
                                        setTimeout(() => {
                                            this.nami.setTint(0xff0000);
                                            setTimeout(() => {
                                                this.nami.clearTint();
                                                this.nami.anims.play('nami_idle');
                                                setTimeout(() => {
                                                    if (this.vida < 0) {
                                                        this.nami.anims.play('nami_die');
                                                        show(this, this.txtLose);
                                                        setTimeout(() => {
                                                            this.scene.start('Gameover');
                                                        }, 2000);
                                                    } else {
                                                        show(this, this.txtTurn);
                                                        this.btn1.setInteractive();
                                                        this.btn2.setInteractive();
                                                        this.btn3.setInteractive();
                                                        this.btn4.setInteractive();
                                                    }
                                                }, 1000);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 200);
                        }, 1000);
                    } else {
                        if (this.pocionesEnemy >= 0) {
                            this.health_enemy.setVisible(true);
                            this.health_enemy2.setVisible(true);
                            this.health_enemy3.setVisible(true);
                            this.health_enemy.anims.play('health');
                            this.health_enemy2.anims.play('health');
                            this.health_enemy3.anims.play('health');
    
                            this.grupoEnemy2.getChildren()[this.pocionesEnemy].visible = false;
                            this.pocionesEnemy--;
    
                            setTimeout(() => {
                                // this.turn == false;
                                this.health_enemy.setVisible(false);
                                this.health_enemy2.setVisible(false);
                                this.health_enemy3.setVisible(false);
                                this.health_enemy.anims.stop();
                                this.health_enemy2.anims.stop();
                                this.health_enemy3.anims.stop();
                                if (this.vidaEnemy < 5) {
                                    this.vidaEnemy++;
                                    this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                    if (this.vidaEnemy < 5) {
                                        this.vidaEnemy++;
                                        this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                    }
                                }
    
                                setTimeout(() => {
                                    show(this, this.txtTurn);
                                    this.btn1.setInteractive();
                                    this.btn2.setInteractive();
                                    this.btn3.setInteractive();
                                    this.btn4.setInteractive();
                                }, 1000);
                            }, 2000);
                        } else {
                            this.enemy.anims.play('enemy_attack');
                            setTimeout(() => {
                                this.enemy.anims.play('enemy_idle');
                                this.nami.anims.play('nami_hit');
                                this.nami.setTint(0xff0000);
                                this.grupo.getChildren()[this.vida].visible = false;
                                this.vida--;
                                setTimeout(() => {
                                    this.nami.clearTint();
                                    setTimeout(() => {
                                        this.nami.setTint(0xff0000);
                                        setTimeout(() => {
                                            this.nami.clearTint();
                                            setTimeout(() => {
                                                this.nami.setTint(0xff0000);
                                                setTimeout(() => {
                                                    this.nami.clearTint();
                                                    this.nami.anims.play('nami_idle');
                                                    setTimeout(() => {
                                                        if (this.vida < 0) {
                                                            this.nami.anims.play('nami_die');
                                                            show(this, this.txtLose);
                                                            setTimeout(() => {
                                                                this.scene.start('Gameover');
                                                            }, 2000);
                                                        } else {
                                                            show(this, this.txtTurn);
                                                            this.btn1.setInteractive();
                                                            this.btn2.setInteractive();
                                                            this.btn3.setInteractive();
                                                            this.btn4.setInteractive();
                                                        }
                                                    }, 1000);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 1000);
                        }
                    }
                }
            }, 3500);
        });

        this.btn3.on(eventos.POINTER_OVER, function() {
            this.setTint(0x7d7264);
        });
        this.btn3.on(eventos.POINTER_OUT, function() {
            this.clearTint();
        });

        this.btn3.on('pointerdown',()=>{
            if (this.pociones >= 0) {
                this.health.setVisible(true);
                this.health2.setVisible(true);
                this.health3.setVisible(true);
                this.health.anims.play('health');
                this.health2.anims.play('health');
                this.health3.anims.play('health');

                this.grupo2.getChildren()[this.pociones].visible = false;
                this.pociones--;

                this.btn1.disableInteractive();
                this.btn2.disableInteractive();
                this.btn3.disableInteractive();
                this.btn4.disableInteractive();

                setTimeout(() => {
                    // this.turn == false;
                    this.health.setVisible(false);
                    this.health2.setVisible(false);
                    this.health3.setVisible(false);
                    this.health.anims.stop();
                    this.health2.anims.stop();
                    this.health3.anims.stop();
                    if (this.vida < 5) {
                        this.vida++;
                        this.grupo.getChildren()[this.vida].visible = true;
                        if (this.vida < 5) {
                            this.vida++;
                            this.grupo.getChildren()[this.vida].visible = true;
                        }
                    }
                    hide(this, this.txtTurn);
                }, 2000);

                setTimeout(() => {
                    if (this.vidaEnemy < 0) {
                        this.enemy.anims.play('enemy_dead');
                        show(this, this.txtWin);
                    setTimeout(() => {
                        escena("Level",this.scene, {vidas: this.vida + 1, posiones: this.pociones + 1, posicionXNami: this.namiX});
                    }, 1000);
                    } else {
                        this.opc = getRandomInt(99) + 1;
                        console.log(this.opc);
                        if (this.opc % 2 == 0) {
                            this.enemy.anims.play('enemy_attack');
                            setTimeout(() => {
                                this.enemy.anims.play('enemy_idle');
                                this.nami.anims.play('nami_hit');
                                this.nami.setTint(0xff0000);
                                this.grupo.getChildren()[this.vida].visible = false;
                                this.vida--;
                                setTimeout(() => {
                                    this.nami.clearTint();
                                    setTimeout(() => {
                                        this.nami.setTint(0xff0000);
                                        setTimeout(() => {
                                            this.nami.clearTint();
                                            setTimeout(() => {
                                                this.nami.setTint(0xff0000);
                                                setTimeout(() => {
                                                    this.nami.clearTint();
                                                    this.nami.anims.play('nami_idle');
                                                    setTimeout(() => {
                                                        if (this.vida < 0) {
                                                            this.nami.anims.play('nami_die');
                                                            show(this, this.txtLose);
                                                            setTimeout(() => {
                                                                this.scene.start('Gameover');
                                                            }, 2000);
                                                        } else {
                                                            show(this, this.txtTurn);
                                                            this.btn1.setInteractive();
                                                            this.btn2.setInteractive();
                                                            this.btn3.setInteractive();
                                                            this.btn4.setInteractive();
                                                        }
                                                    }, 1000);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 1000);
                        } else {
                            if (this.pocionesEnemy >= 0) {
                                this.health_enemy.setVisible(true);
                                this.health_enemy2.setVisible(true);
                                this.health_enemy3.setVisible(true);
                                this.health_enemy.anims.play('health');
                                this.health_enemy2.anims.play('health');
                                this.health_enemy3.anims.play('health');
        
                                this.grupoEnemy2.getChildren()[this.pocionesEnemy].visible = false;
                                this.pocionesEnemy--;
        
                                setTimeout(() => {
                                    // this.turn == false;
                                    this.health_enemy.setVisible(false);
                                    this.health_enemy2.setVisible(false);
                                    this.health_enemy3.setVisible(false);
                                    this.health_enemy.anims.stop();
                                    this.health_enemy2.anims.stop();
                                    this.health_enemy3.anims.stop();
                                    if (this.vidaEnemy < 5) {
                                        this.vidaEnemy++;
                                        this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                        if (this.vidaEnemy < 5) {
                                            this.vidaEnemy++;
                                            this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                        }
                                    }
        
                                    setTimeout(() => {
                                        show(this, this.txtTurn);
                                        this.btn1.setInteractive();
                                        this.btn2.setInteractive();
                                        this.btn3.setInteractive();
                                        this.btn4.setInteractive();
                                    }, 1000);
                                }, 2000);
                            } else {
                                this.enemy.anims.play('enemy_attack');
                                setTimeout(() => {
                                    this.enemy.anims.play('enemy_idle');
                                    this.nami.anims.play('nami_hit');
                                    this.nami.setTint(0xff0000);
                                    this.grupo.getChildren()[this.vida].visible = false;
                                    this.vida--;
                                    setTimeout(() => {
                                        this.nami.clearTint();
                                        setTimeout(() => {
                                            this.nami.setTint(0xff0000);
                                            setTimeout(() => {
                                                this.nami.clearTint();
                                                setTimeout(() => {
                                                    this.nami.setTint(0xff0000);
                                                    setTimeout(() => {
                                                        this.nami.clearTint();
                                                        this.nami.anims.play('nami_idle');
                                                        setTimeout(() => {
                                                            if (this.vida < 0) {
                                                                this.nami.anims.play('nami_die');
                                                                show(this, this.txtLose);
                                                                setTimeout(() => {
                                                                    this.scene.start('Gameover');
                                                                }, 2000);
                                                            } else {
                                                                show(this, this.txtTurn);
                                                                this.btn1.setInteractive();
                                                                this.btn2.setInteractive();
                                                                this.btn3.setInteractive();
                                                                this.btn4.setInteractive();
                                                            }
                                                        }, 1000);
                                                    }, 200);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 1000);
                            }
                        }
                    }
                }, 3500);
            }
            else
            {
                this.btn1.disableInteractive();
                this.btn2.disableInteractive();
                this.btn3.disableInteractive();
                this.btn4.disableInteractive();

                setTimeout(() => {
                    hide(this, this.txtTurn);
                }, 1000);

                setTimeout(() => {
                    if (this.vidaEnemy < 0) {
                        this.enemy.anims.play('enemy_dead');
                        show(this, this.txtWin);
                    setTimeout(() => {
                        escena("Level",this.scene, {vidas: this.vida + 1, posiones: this.pociones + 1, posicionXNami: this.namiX});
                    }, 1000);
                    } else {
                        this.opc = getRandomInt(99) + 1;
                        console.log(this.opc);
                        if (this.opc % 2 == 0) {
                            this.enemy.anims.play('enemy_attack');
                            setTimeout(() => {
                                this.enemy.anims.play('enemy_idle');
                                this.nami.anims.play('nami_hit');
                                this.nami.setTint(0xff0000);
                                this.grupo.getChildren()[this.vida].visible = false;
                                this.vida--;
                                setTimeout(() => {
                                    this.nami.clearTint();
                                    setTimeout(() => {
                                        this.nami.setTint(0xff0000);
                                        setTimeout(() => {
                                            this.nami.clearTint();
                                            setTimeout(() => {
                                                this.nami.setTint(0xff0000);
                                                setTimeout(() => {
                                                    this.nami.clearTint();
                                                    this.nami.anims.play('nami_idle');
                                                    setTimeout(() => {
                                                        if (this.vida < 0) {
                                                            this.nami.anims.play('nami_die');
                                                            show(this, this.txtLose);
                                                            setTimeout(() => {
                                                                this.scene.start('Gameover');
                                                            }, 2000);
                                                        } else {
                                                            show(this, this.txtTurn);
                                                            this.btn1.setInteractive();
                                                            this.btn2.setInteractive();
                                                            this.btn3.setInteractive();
                                                            this.btn4.setInteractive();
                                                        }
                                                    }, 1000);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 1000);
                        } else {
                            if (this.pocionesEnemy >= 0) {
                                this.health_enemy.setVisible(true);
                                this.health_enemy2.setVisible(true);
                                this.health_enemy3.setVisible(true);
                                this.health_enemy.anims.play('health');
                                this.health_enemy2.anims.play('health');
                                this.health_enemy3.anims.play('health');
        
                                this.grupoEnemy2.getChildren()[this.pocionesEnemy].visible = false;
                                this.pocionesEnemy--;
        
                                setTimeout(() => {
                                    // this.turn == false;
                                    this.health_enemy.setVisible(false);
                                    this.health_enemy2.setVisible(false);
                                    this.health_enemy3.setVisible(false);
                                    this.health_enemy.anims.stop();
                                    this.health_enemy2.anims.stop();
                                    this.health_enemy3.anims.stop();
                                    if (this.vidaEnemy < 5) {
                                        this.vidaEnemy++;
                                        this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                        if (this.vidaEnemy < 5) {
                                            this.vidaEnemy++;
                                            this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                        }
                                    }
        
                                    setTimeout(() => {
                                        show(this, this.txtTurn);
                                        this.btn1.setInteractive();
                                        this.btn2.setInteractive();
                                        this.btn3.setInteractive();
                                        this.btn4.setInteractive();
                                    }, 1000);
                                }, 2000);
                            } else {
                                this.enemy.anims.play('enemy_attack');
                                setTimeout(() => {
                                    this.enemy.anims.play('enemy_idle');
                                    this.nami.anims.play('nami_hit');
                                    this.nami.setTint(0xff0000);
                                    this.grupo.getChildren()[this.vida].visible = false;
                                    this.vida--;
                                    setTimeout(() => {
                                        this.nami.clearTint();
                                        setTimeout(() => {
                                            this.nami.setTint(0xff0000);
                                            setTimeout(() => {
                                                this.nami.clearTint();
                                                setTimeout(() => {
                                                    this.nami.setTint(0xff0000);
                                                    setTimeout(() => {
                                                        this.nami.clearTint();
                                                        this.nami.anims.play('nami_idle');
                                                        setTimeout(() => {
                                                            if (this.vida < 0) {
                                                                this.nami.anims.play('nami_die');
                                                                show(this, this.txtLose);
                                                                setTimeout(() => {
                                                                    this.scene.start('Gameover');
                                                                }, 2000);
                                                            } else {
                                                                show(this, this.txtTurn);
                                                                this.btn1.setInteractive();
                                                                this.btn2.setInteractive();
                                                                this.btn3.setInteractive();
                                                                this.btn4.setInteractive();
                                                            }
                                                        }, 1000);
                                                    }, 200);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 1000);
                            }
                        }
                    }
                }, 3000);
            }
        });

        this.btn4.on(eventos.POINTER_OVER, function() {
            this.setTint(0x7d7264);
        });
        this.btn4.on(eventos.POINTER_OUT, function() {
            this.clearTint();
        });

        this.btn4.on('pointerdown',()=>{
            // console.log("boton2");
            this.shield.setVisible(true);
            this.shield.anims.play('shield');

            this.btn1.disableInteractive();
            this.btn2.disableInteractive();
            this.btn3.disableInteractive();
            this.btn4.disableInteractive();

            setTimeout(() => {
                // this.turn == false;
                hide(this, this.txtTurn);
            }, 2000);

            setTimeout(() => {
                if (this.vidaEnemy < 0) {
                    this.enemy.anims.play('enemy_dead');
                    show(this, this.txtWin);
                    setTimeout(() => {
                        escena("Level",this.scene, {vidas: this.vida + 1, posiones: this.pociones + 1, posicionXNami: this.namiX});
                    }, 1000);
                } else {
                    this.opc = getRandomInt(99) + 1;
                    console.log(this.opc);
                    if (this.opc % 2 == 0) {
                        this.enemy.anims.play('enemy_attack');
                        setTimeout(() => {
                            this.enemy.anims.play('enemy_idle');
                            // this.nami.setTint(0xff0000);
                            setTimeout(() => {
                                this.shield.setVisible(false);
                                // this.nami.clearTint();
                                setTimeout(() => {
                                    // this.nami.setTint(0xff0000);
                                    setTimeout(() => {
                                        // this.nami.clearTint();
                                        setTimeout(() => {
                                            // this.nami.setTint(0xff0000);
                                            setTimeout(() => {
                                                this.nami.clearTint();
                                                // this.nami.anims.play('nami_idle');
                                                setTimeout(() => {
                                                    show(this, this.txtTurn);
                                                    this.btn1.setInteractive();
                                                    this.btn2.setInteractive();
                                                    this.btn3.setInteractive();
                                                    this.btn4.setInteractive();
                                                }, 1000);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 200);
                        }, 1000);
                    } else {
                        if (this.pocionesEnemy >= 0) {
                            this.health_enemy.setVisible(true);
                            this.health_enemy2.setVisible(true);
                            this.health_enemy3.setVisible(true);
                            this.health_enemy.anims.play('health');
                            this.health_enemy2.anims.play('health');
                            this.health_enemy3.anims.play('health');
    
                            this.grupoEnemy2.getChildren()[this.pocionesEnemy].visible = false;
                            this.pocionesEnemy--;
    
                            setTimeout(() => {
                                // this.turn == false;
                                this.health_enemy.setVisible(false);
                                this.health_enemy2.setVisible(false);
                                this.health_enemy3.setVisible(false);
                                this.health_enemy.anims.stop();
                                this.health_enemy2.anims.stop();
                                this.health_enemy3.anims.stop();
                                this.shield.setVisible(false);
                                if (this.vidaEnemy < 5) {
                                    this.vidaEnemy++;
                                    this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                    if (this.vidaEnemy < 5) {
                                        this.vidaEnemy++;
                                        this.grupoEnemy.getChildren()[this.vidaEnemy].visible = true;
                                    }
                                }
    
                                setTimeout(() => {
                                    show(this, this.txtTurn);
                                    this.btn1.setInteractive();
                                    this.btn2.setInteractive();
                                    this.btn3.setInteractive();
                                    this.btn4.setInteractive();
                                }, 1000);
                            }, 2000);
                        } else {
                            this.enemy.anims.play('enemy_attack');
                            setTimeout(() => {
                                this.enemy.anims.play('enemy_idle');
                                // this.nami.setTint(0xff0000);
                                setTimeout(() => {
                                    this.shield.setVisible(false);
                                    // this.nami.clearTint();
                                    setTimeout(() => {
                                        // this.nami.setTint(0xff0000);
                                        setTimeout(() => {
                                            // this.nami.clearTint();
                                            setTimeout(() => {
                                                // this.nami.setTint(0xff0000);
                                                setTimeout(() => {
                                                    this.nami.clearTint();
                                                    // this.nami.anims.play('nami_idle');
                                                    setTimeout(() => {
                                                        show(this, this.txtTurn);
                                                        this.btn1.setInteractive();
                                                        this.btn2.setInteractive();
                                                        this.btn3.setInteractive();
                                                        this.btn4.setInteractive();
                                                    }, 1000);
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 1000);
                        }
                    }
                }
            }, 3500);
        });

    }

    update(time, delta){

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default Battle_Go;