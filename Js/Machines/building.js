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

        this.setUpBuyMenu();
        scene.add.existing(this.building);
    }

    initialBoundBox(x, y, width, height, location)
    {
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        
        this.boundBox = (new Phaser.Geom.Rectangle(x, y, width, height));
        this.graphics.strokeRectShape(this.boundBox);
    }

    setUpBuyMenu()
    {

       this.buyMenu = new Menu(this.scene.UIScene, config.width / 2 - 400,  config.height / 2 - 170, 800, 240, "menuBackground", [
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

            new Button(this.scene.UIScene, 180, 10, "solarPanel", function ()
            {
                let gameScene = this.scene.scene.manager.keys.gameScene;
                let building = gameScene.buildingLocations[gameScene.posSelected];

                building.available = false; 
                building.buyMenu.destroy();

                gameScene.buildingLocations[gameScene.posSelected] = new SolarPanel(gameScene, building.building.x, building.building.y, 
                    building.building.width, building.building.height, gameScene.posSelected).setDepth(10);

                building.destroy();
            }).setScale(1.5),

        ]);

        console.log(this.scene);
        this.scene.UIScene.add.existing(this.buyMenu);
        this.buyMenu.setVisible(false);
    }
}