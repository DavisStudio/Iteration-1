class gameScene extends Phaser.Scene 
{
    player;
    joyStickAngle;
    fullScreen;
    UIScene;

    constructor() {
        super("gameScene");
    }

    preload()
    {
        this.load.image("playerImage", "Sprites/player.png");
        this.load.image("fullScreenBtn", "Sprites/UI/fullScreen.png");
    }

    create()
    {
        this.fullScreen = false;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(50,50, "playerImage");

        this.player.scale = 2;
        
   
        this.UIScene = this.scene.get("UIScene");
        this.UIScene.createUIScene(this.scene.key);
        this.scene.launch(this.UIScene);
    }

    update()
    {
        if (!this.fullScreen)
        {
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


