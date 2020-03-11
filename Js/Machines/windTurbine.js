class WindTurbine extends Building
{
    constructor(scene, x, y, width, height, location)
    {
        super(scene, x - 100, y - 100, 200, 200, location, "handGen");

        this.ID = 3;

        this.managerPrice = this.gameScene.managerPrices.windTurbine;

        this.upgradeMenu;
        this.machinePrice = 5;

        this.available = false;
        this.incomePerTick = 180;
        this.incomeAdded = false;

        this.scene.currencyManager.allMachines.push(this);

        this.setUpUpgradeMenu();
        this.animationString = "windTurbineAnim";
    }

    updateUpgrade()
    {
        if(this.gameScene.managerPrices.WindTurbine < this.gameScene.currencyManager.money)
        {
            this.managerBut.enableButton();
        }
        else
        {
            this.managerBut.disableButton();
            console.log("Not Enough Money");
        }
    }
}