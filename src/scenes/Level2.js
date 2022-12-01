import Nami from "./Nami.js"
class Level2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level2'
        });
    }

    init() {
        console.log('Se inicia la esena de nivel 2');


    }
    preload() {
        this.load.path = './assets/';
        this.load.image('mapa2','scenalevel2/mapa2.png');
        this.load.image('fondo2','scenalevel2/fondo2.png');
        this.load.image('esquina','scenalevel2/esquina.png');
        this.load.image('fondo3','scenalevel2/fondo3.png');
        this.load.tilemapTiledJSON('mapa','scenalevel2/mapa.json');


        this.load.atlas('hearts', 'hearts/hearts.png', 'hearts/hearts_atlas.json');
        this.load.animation('heartsAnim', 'hearts/hearts_anim.json');

        this.load.atlas('potions', 'potions/potions.png', 'potions/potions_atlas.json');
        this.load.animation('potionsAnim', 'potions/potions_anim.json');

        this.load.spritesheet('nami', 'Nami/idlegOOD.png', {
            frameWidth: 180,
            frameHeight: 180,
        });

        this.load.spritesheet('nami_run', 'Nami/RungOOD.png', {
            frameWidth: 180,
            frameHeight: 180,
        });

        this.load.spritesheet('nami_jump', 'Nami/jumpgOOD.png', {
            frameWidth: 180,
            frameHeight: 180,
        });
        this.load.spritesheet('nami_fall', 'Nami/fallgOOD.png', {
            frameWidth: 180,
            frameHeight: 180,
        });

        this.load.atlas('cofreanimado', 'cofre/cofreanimado/cofreanimado.png', 'cofre/cofreanimado/cofreanimado_atlas.json');
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

        this.layer2 = this.map.createLayer('mapa3', [this.tile, this.fondo, this.esquina], 0, 0);
        this.layer2.setCollisionByProperty({ col: true });

        this.mover = this.physics.add.image(787, 2608, 'fondo3').setScale(1).setInteractive();
        this.mover.body.moves = false;
        this.mover.body.immovable = true;



        //*------------------personajes--------------*
        this.witch = this.add.sprite(779, 289, 'witch_idle').setScale(2);
        this.physics.add.existing(this.witch, false);
        this.witch.body.setSize(40, 60);



        //Grupo de corazones ABAJO
        // this.grupoC = this.physics.add.group({
        //     key: 'hearts',
        //     repeat: 2,
        //     setXY: {
        //         x: 1000,
        //         y: 700,
        //         stepX: 800
        //     }
        // });



        this.nami = new Nami({
            scene: this,
            x: 1713,
            y: 40,
        });



        this.grupo = this.physics.add.group({
            key: 'hearts',
            repeat: 5,
            setXY: {
                x: this.nami.x - 300,
                y: this.nami.y - 40,
            }
        });
        this.grupo.children.iterate((corazon) => {
            corazon.setScale(1);
            corazon.body.setAllowGravity(false);
        });
        this.grupo.playAnimation('hearts');
        this.contadorVida = 3;
        this.grupo.getChildren()[3].visible = false;
        this.grupo.getChildren()[4].visible = false;
        this.grupo.getChildren()[5].visible = false;
        this.grupo2 = this.physics.add.group({
            key: 'potions',
            repeat: 3,
            setXY: {
                x: 1450,
                y: 100,
                stepX: 100,
            },

        });
        this.grupo2.children.iterate((posion) => {
            posion.setScale(0.8);
            posion.body.setAllowGravity(false);
        });
        this.contadorPocion = 1;
        this.grupo2.getChildren()[1].visible = false;
        this.grupo2.getChildren()[2].visible = false;
        this.grupo2.getChildren()[3].visible = false;
        this.grupo2.playAnimation('potions');

        this.nami.create();

        // -------------control de camar-------------
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.startFollow(this.nami);


        ///agregar colaiders 
        //     this.physics.add.collider(this.nami, this.layer2);
        this.physics.add.collider(this.nami, this.layer2);
        this.physics.add.collider(this.nami, this.witch);
        this.physics.add.collider(this.layer2, this.witch);
        this.physics.add.collider(this.mover, this.nami, () => {
            this.nami.body.setVelocity(0);
            this.nami.body.setVelocityY(0);
            this.nami.body.stop();
        });



        this.grupoF = this.physics.add.group({
            repeat: 3,
            immovable: true,
            allowGravity: false,
        });
        this.cofre = [];
        this.cofreani = [];
        //Creacion de cofre de prueba
        for (let index = 0; index < 4; index++) {
            if (index == 1) {
                this.cofre = this.add.sprite(94.2000, 792, 'cofreestatico').setScale(0.4);
                this.cofreani[index] = this.add.sprite(94.2000, 792, 'cofreanimado', 0).setScale(0.4).setVisible(false);
                this.grupoF.add(this.cofre);
            }
            if (index == 2) {
                this.cofre = this.add.sprite(224.31, 1365., 'cofreestatico').setScale(0.4);
                this.cofreani[index] = this.add.sprite(224.31, 1365.7, 'cofreanimado', 0).setScale(0.4).setVisible(false);
                this.grupoF.add(this.cofre);
            }
            if (index == 3) {
                this.cofre = this.add.sprite(1827.0416666666667, 1878, 'cofreestatico').setScale(0.4);
                this.cofreani[index] = this.add.sprite(1827.0416666666667, 1878, 'cofreanimado', 0).setScale(0.4).setVisible(false);
                this.grupoF.add(this.cofre);
            }
        }
        this.physics.add.collider(this.grupoF, this.layer2);
        this.physics.add.collider(this.nami, this.grupoF, () => {
            console.log('has tocado el cofre');
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


        this.teclas.izq.on('down', () => {
            this.nami.flipX = true;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(30);
            this.nami.body.setVelocityX(-220);
        });
        this.teclas.izq.on('up', () => {
            //this.nami.anims.stop();
            this.nami.anims.play('nami_idle');
            this.nami.body.setAcceleration(0);
            this.nami.body.stop();
            this.nami.body.setVelocity(0);
        });

        this.teclas.der.on('down', () => {
            this.nami.flipX = false;
            this.nami.anims.play('nami_run');
            this.nami.body.setAcceleration(30);
            this.nami.body.setVelocityX(220);
        });
        this.teclas.der.on('up', () => {
            this.nami.anims.stop();
            this.nami.body.setAcceleration(0);
            this.nami.body.stop();
            this.nami.body.setVelocity(0);
            this.nami.anims.play('nami_idle');

        });

        this.teclas.powQ.on('down', () => {
            this.nami.play('nami_attack');
        });
        this.teclas.powQ.on('up', () => {
            this.nami.anims.stop();
            this.nami.play('nami_idle');
        });

        this.teclas.powR.on('down', () => {
            this.nami.play('nami_attack2');
        });
        this.teclas.powR.on('up', () => {
            //this.nami.anims.stop();
            //this.nami.play('nami_idle');
        });

        this.teclas.kspc.on('down', () => {
            this.nami.play('nami_jump');
            this.nami.body.setVelocityY(-500);
            this.nami.body.setVelocityX(0);
            this.nami.body.setSize(23, 50, true); //this.nami.body.setSize(48, 45, true);

        });
        this.teclas.kspc.on('up', () => {
            //this.nami.anims.stop();
            this.nami.anims.play('nami_fall');
            this.teclas.kspc.enabled = false;
            setTimeout(() => {
                this.nami.play('nami_idle');
                this.teclas.kspc.enabled = true;
                // this.nami.body.setSize(48, 45, true); //this.nami.body.setSize(48, 45, true);
                // this.nami.body.setOffset(72,70); //this.nami.body.setOffset(72, 70);
            }, 400);

            this.nami.body.stop();


        });
    }
    update() {

        var x = 0;
        var y = 0;

        // this.grupo.children.iterate((corazon) => {
        //     corazon.x = (this.grupo.children.x + this.nami.x) + (y * 100);
        //     y++;
        // });

        if (this.teclas.der.isDown) {
            // this.nami.body.setOffset(72, 70);

            // this.nami.body.setOffset(85, 60);

            this.grupo.children.iterate((corazon) => {
                corazon.x = (-800 + this.nami.x) + (y * 100);
                corazon.y = this.nami.y - 300;
                y++;
            });
            this.grupo2.children.iterate((pocion) => {
                    pocion.x = (100 + this.nami.x) - (x * 100);
                    pocion.y = this.nami.y - 300;
                    x++;
                })
                // this.grupo2.children.iterate((pocion) => {
                //     pocion.x = (800 + this.nami.x) - (x * 100);
                //     x++;
                // });


        }

        if (this.teclas.izq.isDown) {

            // this.nami.body.setOffset(60, 70);
            this.nami.body.setSize(23, 50, true);
            // this.nami.body.setOffset(70, 60);
            // if (this.nami.x <= 100) {
            //     this.nami.x = 100;
            // }
            this.grupo.children.iterate((corazon) => {
                corazon.x = (-800 + this.nami.x) + (y * 100);
                corazon.y = this.nami.y - 300;
                y++;
            });
            this.grupo2.children.iterate((pocion) => {
                pocion.x = (100 + this.nami.x) - (x * 100);
                pocion.y = this.nami.y - 300;
                x++;
            })

        }
    }

    //update de objetos 

}
export default Level2;