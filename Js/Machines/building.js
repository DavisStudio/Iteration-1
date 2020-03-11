class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, location, texture)
    {
        super(scene, x, y);

        this.boundBox;
        this.buyMenu;
        
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

        this.handGenPriceText;

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
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        
        this.boundBox = (new Phaser.Geom.Rectangle(x, y, width, height));
        this.graphics.strokeRectShape(this.boundBox);
    }

    updatePrices()
    {
        this.handGenPriceText.setText(this.gameScene.machinePrice.handGen);
    }

    setUpBuyMenu()
    {
        let gameScene = this.gameScene;

        let textStyle = 
        {
            font: '40px Changa',
            fill: '#ffffff',
            align: "center"
        }

       this.buyMenu = new Menu(this.scene.UIScene, config.width / 2 - 400,  config.height / 2 - 170, 800, 240, "menuBackground", [
            new Button(this.scene.UIScene, 10, 10, "handGen", function ()
            {
                
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.machinePrice.handGen = Math.floor(1.7 * gameScene.machinePrice.handGen);

                gameScene.buildingLocations[gameScene.posSelected] = new HandGenerator(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);
                
                building.destroy();

            }).setScale(1.5),

            new Button(this.scene.UIScene, 180, 10, "solarPanel", function ()
            {
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.buildingLocations[gameScene.posSelected] = new SolarPanel(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);

                building.destroy();
            }).setScale(1.5),

            new Button(this.scene.UIScene, 350, 10, "windTurbine", function ()
            {
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.buildingLocations[gameScene.posSelected] = new WindTurbine(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);

                building.destroy();
            }).setScale(1.5),

            this.handGenPriceText = new Phaser.GameObjects.Text(this.scene.UIScene, 80, 180, gameScene.machinePrice.handGen,textStyle).setOrigin(0.5,0)
        ]);

        this.scene.UIScene.add.existing(this.buyMenu);
        this.buyMenu.setVisible(false);
    }

    setUpUpgradeMenu()
    {
        let thisBuilding = this;

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
            align: "left"
        }

       this.upgradeMenu = new Menu(this.scene.UIScene, config.width / 2 - 400,  config.height / 2 - 290, 800, 240, "menuBackground", [
        new Button(this.scene.UIScene, 20, 40, "button", function ()
        {
            thisBuilding.hasManager = true;
            console.log(this.hasManager + "Manager BOUGHT");
        }).setScale(5,3),
       
        new Button(this.scene.UIScene, 20, 170, "button", function ()
        {
        },false).setScale(5,3),
        
        new Button(this.scene.UIScene, 570, 170, "buttonRed", function ()
        {
        }).setScale(5,3),

        new Phaser.GameObjects.Text(this.scene.UIScene, 230, 180, "Manager will run the machine \n while you are away", descTextStyle)
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