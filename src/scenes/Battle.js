
class Battle extends Phaser.Scene{
    
    constructor(){
        super({ key: 'Battle' });
    }

    init(){
        console.log('Escena Battle');
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;
    }

    preload(){
        this.load.path = './assets/';

        this.load.image('1', 'Battle/1.png');
        this.load.image('Button', 'Battle/Button.png');

        this.load.spritesheet('nami','Nami/idlegOOD.png',
        {
            frameWidth: 180,
            frameHeight: 180
        });

        this.load.spritesheet('enemy','enemigos/king/king_idle.png',
        {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.atlas('hearts','hearts/hearts.png','hearts/hearts_atlas.json');
        this.load.animation('heartsAnim','hearts/hearts_anim.json');
        this.load.atlas('potions','potions/potions.png','potions/potions_atlas.json');
        this.load.animation('potionsAnim','potions/potions_anim.json');

    }

    create(){
        const eventos = Phaser.Input.Events;

        this.battle = this.add.image(this.width/2, this.height/2, '1');

        this.btn1 = this.add.image(500, this.height/8, 'Button').setScale(0.3, 0.1).setInteractive();
        this.btn2 = this.add.image(500, this.height/3.5, 'Button').setScale(0.3, 0.1).setInteractive();
        this.btn3 = this.add.image(1420, this.height/8, 'Button').setScale(0.3, 0.1).setInteractive();
        this.btn4 = this.add.image(1420, this.height/3.5, 'Button').setScale(0.3, 0.1).setInteractive();

        this.txt1 = this.add.text(425, 110, "Ataque 1", {fontFamily: 'Akaya Telivigala', fontSize: '45px', color: 'black'});
        this.txt2 = this.add.text(1340, 110, "Ataque 2", {fontFamily: 'Akaya Telivigala', fontSize: '45px', color: 'black'});
        this.txt3 = this.add.text(445, 285, "Pocion", {fontFamily: 'Akaya Telivigala', fontSize: '45px', color: 'black'});
        this.txt4 = this.add.text(1345, 285, "Cubrirse", {fontFamily: 'Akaya Telivigala', fontSize: '45px', color: 'black'});
        
        this.suelo = this.physics.add.image(300, 1000, 'BlockBlock');
        this.suelo.body.setAllowGravity(false);
        this.suelo.setImmovable();
        this.suelo.body.setSize(100000, 55, true);
        //visible false 
        this.suelo.setVisible(false);


        this.nami = this.physics.add.sprite(450, 820, 'nami').setScale(6);
        this.nami.body.setCollideWorldBounds(false);

        this.nami.body.setSize(48, 45, true);
        this.nami.body.setOffset(72, 70);
        this.physics.add.collider(this.nami, this.suelo, () => {});

        this.enemy = this.physics.add.sprite(1450, 853, 'enemy').setScale(9);
        this.enemy.body.setCollideWorldBounds(false);

        this.enemy.body.setSize(20, 25, true);
        // this.enemy.body.setOffset(72, 70);
        this.physics.add.collider(this.enemy, this.suelo, () => {});
        this.enemy.flipX = true;

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

        this.grupo = this.physics.add.group({
            key: 'hearts',
            repeat: 5,
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

        this.grupo.playAnimation('hearts');

        this.grupo2 = this.physics.add.group({
            key: 'potions',
            repeat: 3,
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

        this.grupo2.playAnimation('potions');

        this.grupoEnemy = this.physics.add.group({
            key: 'hearts',
            repeat: 5,
            setXY: {
            x: 1475,
            y: this.enemy.y - 340,
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
            repeat: 3,
            setXY: {
            x: 1440,
            y: this.enemy.y - 300,
            stepX: -35,
            }
        });

        this.grupoEnemy2.children.iterate( (pocion) => {
            pocion.setScale(0.2);
            pocion.body.setAllowGravity(false);
        } );

        this.grupoEnemy2.playAnimation('potions');

        this.btn1.on(eventos.POINTER_OVER, function() {
            // this.btn1.setC
            console.log("btn1");
            this.setTint(0x7d7264);
            // this.setAlpha(0.8);
        });
        this.btn1.on(eventos.POINTER_OUT, function() {
            // this.btn1.setC
            // console.log("btn1");
            this.clearTint();
            // this.setAlpha(1);
        });

        this.btn2.on(eventos.POINTER_OVER, function() {
            console.log("btn2");
            this.setTint(0x7d7264);
            // this.setScale(1.2);
        });
        this.btn2.on(eventos.POINTER_OUT, function() {
            // this.btn1.setC
            // console.log("btn1");
            this.clearTint();
            // this.setAlpha(1);
        });

        this.btn3.on(eventos.POINTER_OVER, function() {
            console.log("btn3");
            this.setTint(0x7d7264);
            // this.setScale(1.2);
        });
        this.btn3.on(eventos.POINTER_OUT, function() {
            // this.btn1.setC
            // console.log("btn1");
            this.clearTint();
            // this.setAlpha(1);
        });

        this.btn4.on(eventos.POINTER_OVER, function() {
            console.log("btn4");
            this.setTint(0x7d7264);
            // this.setScale(1.2);
        });
        this.btn4.on(eventos.POINTER_OUT, function() {
            // this.btn1.setC
            // console.log("btn1");
            this.clearTint();
            // this.setAlpha(1);
        });

    }

    update(time, delta){}
}

export default Battle;