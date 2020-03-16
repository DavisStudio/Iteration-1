class HandGenerator extends Building
{
    constructor(scene, x, y, width, height, location)
    {
        super(scene, x - 100, y - 100, 200, 200, location, "handGen");

        this.ID = 1;

        this.managerPrice = this.gameScene.managerPrices.handGen;

        this.upgradeMenu;
        this.machinePrice = 5;

        this.available = false;
        this.incomePerTick = 105;
        this.incomeAdded = false;

        this.scene.currencyManager.allMachines.push(this);

        this.machineSetUp();
        this.setUpUpgradeMenu();
        this.animationString = "handGenAnim";
    }

    updateUpgrade()
    {
        if(this.gameScene.managerPrices.handGen < this.gameScene.currencyManager.money && !this.hasManager)
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