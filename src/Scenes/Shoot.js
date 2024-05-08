class Gallery extends Phaser.Scene{
    constructor(){
        super("shootScene");
        this.my = {sprite: {}};

        this.startx = 100;
        this.starty = 350;
        
        
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("player", "duck_brown.png");
        this.load.image("projectile", "duck_yellow.png");
        this.load.image("penguin", "penguin.png");
        this.load.image("walrus", "walrus.png");
    }
    create(){
        let my = this.my;

        

        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.player = new Player(this, game.config.width/10, game.config.height - 40, "player", null, this.wKey, this.sKey, 20);

    }
    update(){
        let my = this.my;

        this.spaceKey.on('down', (key, event)=>{
            if(!my.sprite.projectile){
                my.sprite.projectile = this.add.sprite(my.sprite.player.x, my.sprite.player.y, "projectile");
            }
        });

        if (my.sprite.projectile){
            if(my.sprite.projectile.x >= 1200){
                my.sprite.projectile.destroy();
                my.sprite.projectile = null;
            }
            else{
                my.sprite.projectile.x += 25;
            }
            
        }
        my.sprite.player.update();
    }
}
