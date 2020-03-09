

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
    keyboardKeys;

    totalIncomePerTick;

    constructor() {
        super("gameScene");
    }

    preload()
    {
        this.load.image("playerImage", "Sprites/player.png");
        this.load.image("fullScreenBtn", "Sprites/UI/fullScreen.png");

        this.load.image("backGroundGrass", "Sprites/TileSets/backGround.png");
        
        this.load.image("buildSpace", "Sprites/TileSets/sand.png");
        this.load.spritesheet("handGen", "Sprites/Machines/handGenerator.png", 
        {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet("solarPanel", "Sprites/Machines/solarPanel.png", 
        {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.image("menuBackground", "Sprites/UI/menuBackground.png");
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
            gridWidth: 5,
            gridHeight: 5,
            buildWidth: 180,
            buildHeight: 180,
            horizontalMargin: 400,
            verticalMargin: 400
        };

        this.totalIncomePerTick = 0;

        this.keyboardKeys = this.input.keyboard.createCursorKeys();

        this.player.money = 0
        this.totalIncomePerTick = 0;
        let timedEvent = this.time.addEvent({ delay: 800, callback: this.addMoney, callbackScope: this, repeat: -1 });

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
                if (boundBox.contains(this.player.x, this.player.y))
                {
                    this.posSelected = i;
            
                    if (building.available)
                    {
                        building.buyMenu.setVisible(true);
                        if (this.keyboardKeys.space.isDown)
                        {
                            console.log("Purchase");
                            building.available = false; 
                            building.buyMenu.destroy();
                            this.buildingLocations[i] = new SolarPanel(this,building.building.x, building.building.y, building.building.width, building.building.height, i).setDepth(10);
                            building.destroy();
                        }

                        if(this.keyboardKeys.down.isDown)
                        {
                            console.log(this.buildingLocations[i]);
                        }
                    }
                    else
                    {
                        console.log("this is already sold");
                    }
                    
                    building.building.anims.play(building.animationString, true, building.lastFrame);
                    
                } 
                else
                {
                    building.buyMenu.setVisible(false);
                    
                    if(building.building.anims.currentFrame)
                    {
                        building.lastFrame = building.building.anims.currentFrame.index;
                    }
                    building.building.anims.stop(building.animationString);
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
                bc.buildWidth, bc.buildHeight, {x: x, y: y}, "buildSpace");
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
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'solarPanelAnim',
            frames: this.anims.generateFrameNumbers('solarPanel', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    newHandGenerator()
    {

    }

    newSolarPanel()
    {

    }

    // Runs per tick
    addMoney()
    {
        this.player.money += this.totalIncomePerTick;
        this.UIScene.updateMoney(this.player.money);
    }
}


