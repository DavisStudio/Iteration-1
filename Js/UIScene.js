class UIScene extends Phaser.Scene
{
    fullScreenBut;
    joyStickStick;

    constructor() 
    {
        super('UIScene')
    }

    create()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        this.virtualJoyStick = new Phaser.Geom.Rectangle(10, 460, 250, 250);
        this.graphics.strokeRectShape(this.virtualJoyStick);
        
        this.graphics.strokeEllipse(this.virtualJoyStick.centerX, this.virtualJoyStick.centerY, 10,10);
    }

    update()
    {

    }

    createUIScene()
    {
        this.makeFButton();
    }

    makeFButton()
    {
        console.log("fullSCRENbuttttttttttton");
        
        this.fullScreenBut = new Button(this, config.width - 75, 10, "fullScreenBtn", function()
        {
            if(!this.scene.scale.isFullscreen)
            {
                this.scene.scale.startFullscreen();
            }
            else
            {
                this.scene.scale.stopFullscreen();   
            }
            
        });
        this.fullScreenBut.scale = 2;

        this.add.existing(this.fullScreenBut);
    }
}