class HandGenerator extends Building
{
    constructor(scene, x, y, width, height, texture, location)
    {
        super(scene, x, y, width, height, texture, location);
        
        this.incomePerTick = 2;
        this.incomeAdded = false;

        //this.scene.totalIncomePerTick += this.incomePerTick;

    }
}