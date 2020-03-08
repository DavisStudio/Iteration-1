class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, texture, location)
    {
        super(scene, x, y, texture);

        this.boundBox;
        
        let buildingLocation = location;
        this.building = new Phaser.GameObjects.Sprite(this.scene, x, y, texture);
        
        this.building.x += width/2;
        this.building.y += height/2;

        this.building.scaleX = width/100;
        this.building.scaleY = height/100;

        this.building.setDepth(-5);

        this.initialBoundBox(x,y,width,height,location);
        
        console.log(scene);
        scene.add.existing(this.building);
        
        
    }

    initialBoundBox(x, y, width, height, location)
    {
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        
        this.boundBox = (new Phaser.Geom.Rectangle(x, y, width, height));
        this.graphics.strokeRectShape(this.boundBox);
    }
}