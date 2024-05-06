class Movement extends Phaser.Scene{
    constructor(){
        super("moveScene");
        this.my = {sprite: {}};

        this.startx = 400;
        this.starty = 350;
        
        
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("fish", "tile_0119.png");
        this.load.image("dude", "tile_0127.png");
    }
    create(){
        let my = this.my;

        my.sprite.dude = this.add.sprite(this.startx,this.starty,"dude");

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update(){
        let my = this.my;
        if(this.aKey.isDown){
            my.sprite.dude.x -=5;
            if(my.sprite.dude.x <= 0){
                my.sprite.dude.x = 0;
            }

            
        }
        if(this.dKey.isDown){
            my.sprite.dude.x += 5;
            if(my.sprite.dude.x >= 800){
                my.sprite.dude.x = 800;
            }

        }
        this.spaceKey.on('down', (key, event)=>{
            if(!my.sprite.projectile){
                my.sprite.projectile = this.add.sprite(my.sprite.dude.x, my.sprite.dude.y, "fish");
            }
        });

        if (my.sprite.projectile){
            if(my.sprite.projectile.y <= 0){
                my.sprite.projectile.destroy();
                my.sprite.projectile = null;
            }
            else{
                my.sprite.projectile.y -= 5;
            }
            
        }

    }
}
