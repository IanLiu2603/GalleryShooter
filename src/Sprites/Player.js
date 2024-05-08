class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, upKey, downKey, playerSpeed) {
        super(scene, x, y, texture, frame);

        this.up = upKey;
        this.down = downKey;
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);

        return this;
    }

    update() {
        if (this.up.isDown) {
            if (this.y  > (0 + this.displayHeight/2)) {
                this.y -= this.playerSpeed;
            }
        }

        if (this.down.isDown) {
            if (this.y < (game.config.height - (this.displayHeight/2))) {
                this.y += this.playerSpeed;
            }
        }
    }

}