class gameScene extends Phaser.Scene 
{
    player;
    joyStickAngle;
    fullScreen;
    UIScene;
    playerMovementVector;
    playerSpeed;

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
        this.fullScreen = true;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(50,50, "playerImage");

        this.player.scale = 2;
        this.playerSpeed = 300;   
   
        this.UIScene = this.scene.get("UIScene");
        this.UIScene.createUIScene(this.scene.key);
        this.scene.launch(this.UIScene);
        
        this.playerMovementVector = {x: 0, y: 0};
    }

    update()
    {
        if (!this.fullScreen)
        {
            console.log("Enter FullScreen");
        }
        else
        {
                console.log("ee");
                this.player.setVelocityX(this.playerMovementVector.x * this.playerSpeed);
                this.player.setVelocityY(this.playerMovementVector.y * this.playerSpeed);
        }
    }
}


