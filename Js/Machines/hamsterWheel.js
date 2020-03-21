class HamsterWheel extends Building
{
    constructor(scene, x, y, width, height, location)
    {
        super(scene, x - 100, y - 100, 200, 200, location, "hamsterWheel");

        this.ID = 4;

        this.managerPrice = this.gameScene.managerPrices.hamsterWheel;

        this.upgradeMenu;
        this.machinePrice = 5;

        this.available = false;
        this.incomePerTick = this.gameScene.machineIncome.hamsterWheel;
        this.incomeAdded = false;

        this.scene.currencyManager.allMachines.push(this);

        this.machineSetUp();
        this.setUpUpgradeMenu();
        this.animationString = "hamsterWheelAnim";
    }

    updateUpgrade()
    {
        if(this.gameScene.managerPrices.hamsterWheel < this.gameScene.currencyManager.money && !this.hasManager)
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