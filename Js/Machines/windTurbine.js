class WindTurbine extends Building
{
    constructor(scene, x, y, width, height, location)
    {
        super(scene, x - 100, y - 100, 200, 200, location, "handGen");

        this.upgradeMenu;
        this.machinePrice = 5;

        this.available = false;
        this.incomePerTick = 2;
        this.incomeAdded = false;

        this.scene.totalIncomePerTick += this.incomePerTick;

        this.setUpUpgradeMenu();
        this.animationString = "windTurbineAnim";
    }
}