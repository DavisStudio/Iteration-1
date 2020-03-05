class gameScene extends Phaser.Scene 
{
    player;
    joyStickAngle;
    fullScreen;
    UIScene;
    playerMovementVector;
    playerSpeed;
    buildConfig;

    constructor() {
        super("gameScene");
    }

    preload()
    {
        this.load.image("playerImage", "Sprites/player.png");
        this.load.image("fullScreenBtn", "Sprites/UI/fullScreen.png");
        this.load.image("backGroundGrass", "Sprites/TileSets/backGround.png");
    }

    create()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        this.fullScreen = true;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.background = this.scene.systems.add.image(-500,-500,"backGroundGrass");
        this.background.scale = 5;
        this.background.setDepth(-5);

        this.player = this.physics.add.sprite(50,50, "playerImage");

        this.player.scale = 2;
        this.playerSpeed = 300;   
   
        this.UIScene = this.scene.get("UIScene");
        this.UIScene.createUIScene(this.scene.key);
        this.scene.launch(this.UIScene);
        
        this.playerMovementVector = {x: 0, y: 0};
        
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
        
        this.buildConfig = {
            gridWidth: 10,
            gridHeight: 10,
            buildWidth: 180,
            buildHeight: 180,
            horizontalMargin: 500,
            verticalMargin: 500
        };

        this.drawBuildGrid();
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

    drawBuildGrid()
    {
        this.rectangles = [];

        var bc = this.buildConfig;
        for (var x = 0; x < 10; x++)
        {
            for (var y = 0; y < 10; y++)
            {
                this.rectangles.push(new Phaser.Geom.Rectangle
                    (x * bc.horizontalMargin - ((bc.horizontalMargin + bc.buildWidth) * bc.gridWidth / 2),
                        y * bc.horizontalMargin - ((bc.verticalMargin + bc.buildHeight) * bc.gridHeight / 2),
                        bc.buildWidth,
                        bc.buildHeight));
            }
        }

        for (var i = 0; i < this.rectangles.length; i++)
        {
            console.log(this.rectangles[i]);
            this.graphics.strokeRectShape(this.rectangles[i]);
        }
    }
}


