class Gallery extends Phaser.Scene{
    constructor(){
        super("shootScene");
        this.my = {sprite: {}};

        this.playerSpeed = 20;
        this.bulletSpeed = 20
        this.startx = 100;
        this.starty = 350;

        this.bulletCooldown = 3;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;
        
        
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

        my.sprite.player.setScale(0.5);

        my.sprite.bulletGroup = this.add.group({
            active: true,
            defaultKey: "projectile",
            maxSize: 10,
            runChildUpdate: true
            }
        )
        my.sprite.bulletGroup.createMultiple({
            classType: Projectile,
            active: false,
            visible: false,
            key: my.sprite.bulletGroup.defaultKey,
            repeat: my.sprite.bulletGroup.maxSize-1
        });
        my.sprite.bulletGroup.propertyValueSet("speed", this.bulletSpeed);

    }
    update(){
        let my = this.my;

        this.bulletCooldownCounter--;

        // Check for bullet being fired
        if (this.spaceKey.isDown) {
            if (this.bulletCooldownCounter < 0) {
                // Get the first inactive bullet, and make it active
                let bullet = my.sprite.bulletGroup.getFirstDead();
                // bullet will be null if there are no inactive (available) bullets
                if (bullet != null) {
                    this.bulletCooldownCounter = this.bulletCooldown;
                    bullet.makeActive();
                    bullet.x = my.sprite.player.x;
                    bullet.y = my.sprite.player.y - (my.sprite.player.displayHeight/2);
                    bullet.setScale(0.25);
                }
            }
        }
        my.sprite.player.update();
    }
}
