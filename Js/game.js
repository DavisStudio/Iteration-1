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

    currentMachines;
    totalIncomePerTick;
    selectedMachine;
    machinePrice;

    constructor() {
        super("gameScene");
    }

    preload()
    {   
        this.load.image("underJoyStick", "Sprites/UI/underJoyStick.png");
        this.load.image("joyStick", "Sprites/UI/JoyStick.png");

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
        this.load.spritesheet("windTurbine", "Sprites/Machines/windTurbine.png", 
        {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet("hamsterWheel", "Sprites/Machines/hamsterWheel.png", 
        {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.image("menuBackground", "Sprites/UI/menuBackground.png");
        this.load.image("button", "Sprites/UI/button.png");
        this.load.image("buttonDown", "Sprites/UI/button-Pressed.png");
        this.load.image("buttonRed", "Sprites/UI/button-red.png");
        this.load.image("uiVerticalBrake", "Sprites/UI/menu-brake-vertical.png")
        this.load.spritesheet("managerAlert", "Sprites/Machines/UI/redAlert.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    create()
    {
        this.machinePrice = 
        {
            handGen: 70,
            solarPanel: 820,
            windTurbine: 10000,
            geoTer: 500,
            nuclearPlant: 1000,
            hamsterWheel: 20000
        };

        this.managerPrices = 
        {
            handGen: 100,
            solarPanel: 4500,
            windTurbine: 22000,
            hamsterWheel: 44000
        }

        this.graphics = this.add.graphics({ lineStyle: { width: 0, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
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
            horizontalMargin: 330,
            verticalMargin: 330
        };

        this.currencyManager = 
        {
            money: 100,
            totalIncomePerTick: 0,
            allMachines:[]
        }

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
                
                if(!building.available)
                {
                    building.updateManagerAlert()
                }

                if (boundBox.contains(this.player.x, this.player.y))
                {
                    this.posSelected = i;
                    building.isSelected = true;

                    console.log(building.building);
                    // IF THE PLACE IS A BUILD SPOT 
                    if (building.available)
                    {
                        building.updatePrices();
                        building.buyMenu.setVisible(true);
                    }
                    else // IF THE PLACE IS ANY BUILDING
                    {
                        building.updateUpgrade();

                        this.selectedMachine = building;
                        building.upgradeMenu.setVisible(true);
                    }
                    
                    if(building.building.anims)
                    {
                        building.building.anims.play(building.animationString, true, building.lastFrame);
                    }
                }
                else
                {
                    building.buyMenu.setVisible(false);
                    building.isSelected = false;

                    if (building.upgradeMenu)
                    {
                        building.upgradeMenu.setVisible(false);
                    }

                    if (building.building.anims)
                    {
                        if (building.building.anims.currentFrame)
                        {
                            building.lastFrame = building.building.anims.currentFrame.index;
                        }

                        if (!building.hasManager)
                        {
                            building.building.anims.stop(building.animationString);
                        }
                    }
                }
            }
            
            for(var i = 0; i < this.currencyManager.allMachines.length; i++)
            {
                let cm = this.currencyManager;
                let machine = cm.allMachines[i];
                
                if(machine.hasManager && !machine.incomeAdded)
                {
                    cm.totalIncomePerTick += machine.incomePerTick;
                    machine.incomeAdded = true;
                }

                if(machine.sold)
                {
                    if(machine.hasManager)
                    {
                        cm.totalIncomePerTick -= machine.incomePerTick;
                    }
                    cm.allMachines.splice(i, i + 1)
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

        this.anims.create({
            key: 'windTurbineAnim',
            frames: this.anims.generateFrameNumbers('windTurbine', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'hamsterWheelAnim',
            frames: this.anims.generateFrameNumbers('hamsterWheel', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'managerAlertAnim',
            frames: this.anims.generateFrameNumbers('managerAlert', {
                start: 0,
                end: 4,
                first: 0
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    // Runs per tick
    addMoney()
    {
        let tempIncome = 0;
        if(this.selectedMachine)
        {
            if(this.selectedMachine.isSelected && !this.selectedMachine.sold)
            {
                tempIncome = this.selectedMachine.incomePerTick;
            }
        }

        this.currencyManager.money += this.currencyManager.totalIncomePerTick + tempIncome;
        this.UIScene.updateMoney(this.numCompressor(this.currencyManager.money));
    }

    /** 
     * Converts large number to a compressed version 
     * returns string
     * @param {number} money - int or float value to be converted
    */
    numCompressor(money)
    {
        var numberTags = ["","k", "m", "b", "t", "q", "qn", "s", "spt"];
        money = money.toString();
        var len = money.length;
        var lenDiv = Math.floor(len / 3);
        var lenMod = len % 3;

        var endString = "";

        if(len > 3)
        {
            if(lenMod == 1)
            {
                endString = money.substr(0, 1) + "." + money.substr(1, 2) + numberTags[lenDiv];
            }
            else if(lenMod == 2)
            {
                endString = money.substr(0, 2) + "." + money.substr(2, 2) + numberTags[lenDiv];
            }
            else if(lenMod == 0)
            {
                endString = money.substr(0, 3) + numberTags[lenDiv - 1];
            }
        }
        else
        {
            endString = money;
        }

        return endString
    }
}


