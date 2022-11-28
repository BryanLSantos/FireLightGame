class Level3 extends Phaser.Scene{
    constructor(){
        super({ key: 'Level3' });
    }

    init(){
        console.log('Escena Volcan');
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;
    }

    preload(){
        this.load.path = './assets/';

        // this.load.image('1', 'Battle/1.png');
        // this.load.image('Button', 'Battle/Button.png');
    }

    create(){
    

    }

    update(time, delta){}
}

export default Level3;