class Gallery extends Phaser.Scene{
    constructor(){
        super("shootScene");
        this.my = {sprite: {}, text: {}};

        this.playerSpeed = 20;
        this.bulletSpeed = 20
        this.startx = 100;
        this.starty = 350;

        this.bulletCooldown = 10;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;

        this.penguinMax = 10;
        this.timer = 0;
        this.my.sprite.penguins = [];

        this.walrusMax = 5;
        this.walrusSpeed = 10;

        this.myScore = 0;
        
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("player", "duck_brown.png");
        this.load.image("projectile", "duck_yellow.png");
        this.load.image("penguin", "penguin.png");
        this.load.image("walrus", "walrus.png");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
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

        this.points = [
            1192, 290,
            
            1099, 12,
            
            987, 582,
            
            815, 31,
            
            719, 573,
            
            594, 54,
            
            502, 548,
            
            392, 64,
            
            290, 557,
            
            208, 45,
            
            148, 555,
            
            74, 55,
            
            7, 553,
        ];
        this.curve = new Phaser.Curves.Spline(this.points);

        my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "Score " + this.myScore);

        my.sprite.walrusGroup = this.add.group({
            active: true,
            defaultKey: "walrus",
            maxSize: 10,
            runChildUpdate: true
            }
        )
        my.sprite.walrusGroup.createMultiple({
            classType: Walrus,
            active: false,
            visible: false,
            key: my.sprite.walrusGroup.defaultKey,
            repeat: my.sprite.walrusGroup.maxSize-1
        });
        my.sprite.walrusGroup.propertyValueSet("speed", this.walrusSpeed);

    }
    update(){
        let my = this.my;

        this.bulletCooldownCounter--;

        // Check for bullet being fired
        if (this.spaceKey.isDown) {
            if (this.bulletCooldownCounter < 0) {
                let bullet = my.sprite.bulletGroup.getFirstDead();
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

        //Penguin Spawner
        if (this.timer % 120 == 0) {
            if(my.sprite.penguins.length < this.penguinMax){
                //console.log("spawn");
                this.penguin = this.add.follower(this.curve, 10, 10, "penguin");
                this.penguin.setScale(0.5);
                this.penguin.x = 1192;
                this.penguin.y = 290;
                this.penguin.visible = true;
                this.penguin.startFollow({
                    from: 0,
                    to: 1,
                    delay: 0,
                    duration: 6000,
                    ease: 'Sine.easeInOut',
                    repeat: -1,
                    yoyo: false,
                    rotateToPath: true,
                    rotationOffset: -90
                });  
                my.sprite.penguins.push(this.penguin);
            }
            else{
                console.log("nospawn");
            }
        }

        //Walrus Spawner
        if(this.timer % 180 == 0){
            let walrus = my.sprite.walrusGroup.getFirstDead();
                if (walrus != null) {
                    walrus.makeActive();
                    walrus.x = 1600;
                    walrus.health = 2;
                    walrus.y = Math.floor(Math.random() * (550 - 50 + 1)) + 50;
                    walrus.setScale(0.75);
                }
        }

        let bulletArray = my.sprite.bulletGroup.getChildren();
        let walrusArray = my.sprite.walrusGroup.getChildren();
        let dedPen = [];
        let dedWal = [];
        //Collision checker
        for(let bullet of bulletArray){
            //console.log(my.sprite.penguins.length);
            for(let penguin of my.sprite.penguins){
                if(this.collides(penguin,bullet)&&bullet.active){
                    bullet.x = 1700;
                    penguin.visible= false;
                    this.myScore += 10;
                    this.updateScore();
                    dedPen.push(penguin);
                }
            }
            for(let walrus of walrusArray){
                if(this.collides(walrus,bullet)&&bullet.active){
                    bullet.x = 1700;
                    walrus.health -=1;
                    if(walrus.health <= 0){
                        this.myScore += 30;
                        walrus.x = 2000;
                    }
                    this.updateScore();
                }
            }
        }
        for(let penguin of dedPen){
            my.sprite.penguins.splice(my.sprite.penguins.indexOf(penguin),1);
        }
        for(let walrus of dedWal){
            walrus.makeInactive();
        }
        
        this.timer++;
    }
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }
}
