class SolarPanel extends Building
{
    constructor(scene, x, y, width, height, location)
    {
        super(scene, x - 100, y - 100, 200, 200, location, "solarPanel");

        this.available = false;
        this.incomePerTick = 4;
        this.incomeAdded = false;

        this.animationString = "solarPanelAnim";

        this.scene.totalIncomePerTick += this.incomePerTick;

        this.setUpUpgradeMenu();
    }

}