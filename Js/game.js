class gameScene extends Phaser.Scene 
{
    player;
    joyStickAngle;
    fullScreen;
    UIScene;

    constructor(key) {
        super(key);
    }

    preload()
    {
        this.load.image("playerImage", "../Sprites/player.png");
    }

    create()
    {
        this.fullScreen = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.cursors);

        this.player = this.physics.add.sprite(50,50, "playerImage", 1);
        console.log(this.player);

        this.player.scale = 2;
        
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        this.graphics.strokeRectShape(new Phaser.Geom.Rectangle(320, 200, 320, 200));
   
        this.UIScene = this.scene.manager.scenes[1];
        this.UIScene.createUIScene();
    }

    update()
    {
        if (!this.fullScreen)
        {
            console.log("EnterFulscrreeen!");
        }
        else
        {
            this.player.setVelocityY(0).setVelocityX(0);

            if (this.cursors.up.isDown)
            {
                this.joyStickAngle = 0;
            }

            if (this.cursors.down.isDown)
            {
                this.joyStickAngle = 180;
            }

            if (this.cursors.right.isDown)
            {
                this.joyStickAngle = 90;
            }

            if (this.cursors.left.isDown)
            {
                this.joyStickAngle = 270;
            }
        }
    }
}

