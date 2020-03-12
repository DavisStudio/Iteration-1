class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, location, texture)
    {
        super(scene, x, y);

        this.ID = 0;
        
        this.boundBox;
        this.buyMenu;
        this.buyMenuButtons = 
        {
            handGen:null,
            solarPanel:null,
            windTurbine:null
        };

        this.upgradeBut;
        this.managerBut;

        let buildingLocation = location;
        this.building = new Phaser.GameObjects.Sprite(this.scene, x, y, texture);
        
        this.building.x += width/2;
        this.building.y += height/2;

        this.building.scaleX = width/100;
        this.building.scaleY = height/100;

        this.building.setDepth(-5);

        this.initialBoundBox(x,y,width,height,location);

        this.lastFrame = 0;
        this.available = true;

        this.hasManager = false;
        this.isSelected = false;

        this.handGenPriceText;
        this.managerPrice = 0;

        this.gameScene = this.scene.scene.manager.keys.gameScene;
        
        let textStyle = 
        {
            font: '40px Changa',
            fill: '#ffffff',
            align: "center"
        }

        this.setUpBuyMenu();
        
        scene.add.existing(this.building);
    }

    initialBoundBox(x, y, width, height, location)
    {
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 0, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        
        this.boundBox = (new Phaser.Geom.Rectangle(x, y, width, height));
        this.graphics.strokeRectShape(this.boundBox);
    }

    updatePrices()
    {
        this.handGenPriceText.setText(this.gameScene.machinePrice.handGen);
        this.solarPanelPriceText.setText(this.gameScene.machinePrice.solarPanel);
        this.windTPriceText.setText(this.gameScene.machinePrice.windTurbine);

        let money = this.gameScene.currencyManager.money;
        let m = this.gameScene.machinePrice;
        let temp = this.gameScene.currencyManager.totalIncomePerTick;

        money -= temp;

        if(money < m.handGen){
            this.buyMenuButtons.handGen.disableButton();
        }else{
            this.buyMenuButtons.handGen.enableButton();
        }

        if(money < m.solarPanel){
            this.buyMenuButtons.solarPanel.disableButton();
        }else{
            this.buyMenuButtons.solarPanel.enableButton();
        }

        if(money < m.windTurbine){
            this.buyMenuButtons.windTurbine.disableButton();
        }else{
            this.buyMenuButtons.windTurbine.enableButton();
        }
        

    }

    setUpBuyMenu()
    {
        let gameScene = this.gameScene;
        let but = this.buyMenuButtons;

        let textStyle = 
        {
            font: '40px Changa',
            fill: '#ffffff',
            align: "center"
        }

       this.buyMenu = new Menu(this.scene.UIScene, config.width / 2 - 400,  config.height / 2 - 170, 800, 240, "menuBackground", [
            but.handGen = new Button(this.scene.UIScene, 10, 10, "handGen", function ()
            {
                
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.machinePrice.handGen = Math.floor(1.25 * gameScene.machinePrice.handGen);
                gameScene.currencyManager.money -= gameScene.machinePrice.handGen;

                gameScene.buildingLocations[gameScene.posSelected] = new HandGenerator(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);
                
                building.destroy();

            }).setScale(1.5),

            but.solarPanel = new Button(this.scene.UIScene, 180, 10, "solarPanel", function ()
            {
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.machinePrice.solarPanel = Math.floor(1.25 * gameScene.machinePrice.solarPanel);
                gameScene.currencyManager.money -= gameScene.machinePrice.solarPanel;

                gameScene.buildingLocations[gameScene.posSelected] = new SolarPanel(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);

                building.destroy();
            }).setScale(1.5),

            but.windTurbine = new Button(this.scene.UIScene, 350, 10, "windTurbine", function ()
            {
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.machinePrice.windTurbine = Math.floor(1.25 * gameScene.machinePrice.windTurbine);
                gameScene.currencyManager.money -= gameScene.machinePrice.windTurbine;

                gameScene.buildingLocations[gameScene.posSelected] = new WindTurbine(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);

                building.destroy();
            }).setScale(1.5),

            this.handGenPriceText = new Phaser.GameObjects.Text(this.scene.UIScene, 80, 180, gameScene.machinePrice.handGen,textStyle).setOrigin(0.5,0),
            this.solarPanelPriceText = new Phaser.GameObjects.Text(this.scene.UIScene, 255, 180, gameScene.machinePrice.solarPanel,textStyle).setOrigin(0.5,0),
            this.windTPriceText = new Phaser.GameObjects.Text(this.scene.UIScene, 425, 180, gameScene.machinePrice.windTurbine,textStyle).setOrigin(0.5,0)
        ]);

        this.scene.UIScene.add.existing(this.buyMenu);
        this.buyMenu.setVisible(false);
    }

    setUpUpgradeMenu()
    {
        let thisBuilding = this;
        let gameScene = this.gameScene;

        let textStyle =
        {
            font: '40px Changa',
            fill: '#ffffff',
            align: "center"
        }

        let descTextStyle =
        {
            font: '22px Changa',
            fill: '#ffffff',
            align: "center"
        }

        let buttonStyle =
        {
            font: '24px Changa',
            fill: '#000000',
            align: "center"
        }

        this.upgradeMenu = new Menu(this.scene.UIScene, config.width / 2 - 400, config.height / 2 - 290, 800, 240, "menuBackground", [
            this.upgradeBut = new Button(this.scene.UIScene, 20, 40, "button", function ()
            {
            }).setScale(5, 3),

            this.managerBut = new Button(this.scene.UIScene, 20, 170, "button", function ()
            {
                console.log(gameScene);
                if(thisBuilding.ID == 1)
                {
                    gameScene.currencyManager.money -=  gameScene.managerPrices.handGen;
                }
                else if(thisBuilding.ID == 2)
                {
                    gameScene.currencyManager.money -=  gameScene.managerPrices.solarPanel;
                }
                else if(thisBuilding.ID == 3)
                {
                    gameScene.currencyManager.money -=  gameScene.managerPrices.windTurbine;
                }

                thisBuilding.hasManager = true;
                console.log("MANAGER BOUGHT");
            }).setScale(5, 3),

            new Button(this.scene.UIScene, 570, 170, "buttonRed", function ()
            {
            }).setScale(5, 3),

            new Phaser.GameObjects.Text(this.scene.UIScene, 230, 177, "Manager will run the machine \n while you are away", descTextStyle),
            new Phaser.GameObjects.Text(this.scene.UIScene, 100, 190, this.managerPrice, buttonStyle),
            new Phaser.GameObjects.Text(this.scene.UIScene, 580, 120, "Sell your Machine \n (Doesn't work yet)", descTextStyle),
            new Phaser.GameObjects.Sprite(this.scene.UIScene, 542, 120, "uiVerticalBrake").setScale(3,5)
        ]);

        /*
        new Button(this.scene.UIScene, 10, 10, "handGen", function ()
            {
                let gameScene = this.scene.scene.manager.keys.gameScene;
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.buildingLocations[gameScene.posSelected] = new HandGenerator(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);
                
                building.destroy();

            }).setScale(1.5),
        */
        // 
        this.scene.UIScene.add.existing(this.upgradeMenu);
        this.upgradeMenu.setVisible(false);
    }
}