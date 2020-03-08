

class gameScene extends Phaser.Scene 
{
    player;
    joyStickAngle;
    fullScreen;
    UIScene;
    playerMovementVector;
    playerSpeed;
    buildConfig;
    buildingLocations;
    posSelected;
    anims;

    constructor() {
        super("gameScene");
    }

    preload()
    {
        this.load.image("playerImage", "Sprites/player.png");
        this.load.image("fullScreenBtn", "Sprites/UI/fullScreen.png");
        this.load.image("backGroundGrass", "Sprites/TileSets/backGround.png");
        this.load.image("buildSpace", "Sprites/TileSets/sand.png");

        this.load.spritesheet("handGen", "/Sprites/Machines/handGenerator.png", 
        {
            frameWidth: 100,
            frameHeight: 100
        });
    }

    create()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        this.fullScreen = true;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.background = this.scene.systems.add.image(-500,-500,"backGroundGrass");
        this.background.scale = 5;
        this.background.setDepth(-10);

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
            horizontalMargin: 400,
            verticalMargin: 400
        };

        this.createAnims();
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
                this.player.setVelocityX(this.playerMovementVector.x * this.playerSpeed);
                this.player.setVelocityY(this.playerMovementVector.y * this.playerSpeed);

                for(var i = 0; i < this.buildingLocations.length; i++)
                {
                    //let x = i % 10;
                   // let y = Math.floor(i / 10);
                    
                    let building = this.buildingLocations[i];
                    let boundBox = building.boundBox;
                    if(boundBox.contains(this.player.x, this.player.y))
                    {
                        this.posSelected = i;
                        building.building.setTint(102800);
                    }else
                    {
                        building.building.clearTint();
                    }
                }
        }
    }

    drawBuildGrid()
    {
        this.rectangles = [];
        this.buildingLocations = [];

        var bc = this.buildConfig;
        for (var x = 0; x < 10; x++)
        {
            for (var y = 0; y < 10; y++)
            {
                this.buildingLocations[x + (y * 10)] = new Building(this, x * bc.horizontalMargin - ((bc.horizontalMargin + bc.buildWidth) * bc.gridWidth / 2),
                y * bc.horizontalMargin - ((bc.verticalMargin + bc.buildHeight) * bc.gridHeight / 2),
                bc.buildWidth, bc.buildHeight, "handGenAnim", {x: x, y: y});
            }
        }
    }

    createAnims()
    {
        this.anims.create({
            key: 'handGenAnim',
            frames: this.anims.generateFrameNumbers('handGen', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 10
        })
    }
}


