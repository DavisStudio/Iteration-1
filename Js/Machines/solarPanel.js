class SolarPanel extends Building
{
    constructor(scene, x, y, width, height, location)
    {
        super(scene, x - 100, y - 100, 200, 200, location, "solarPanel");

        this.ID = 2;

        this.managerPrice = this.gameScene.managerPrices.solarPanel;

        this.available = false;
        this.incomePerTick = 55;
        this.incomeAdded = false;

        this.animationString = "solarPanelAnim";

        this.scene.currencyManager.allMachines.push(this);

        this.setUpUpgradeMenu();
    }

    
    updateUpgrade()
    {
        if(this.gameScene.managerPrices.solarPanel < this.gameScene.currencyManager.money && !this.hasManager)
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