class UIScene extends Phaser.Scene
{
    fullScreenBut;
    joyStickStick;
    underJoyStick;
    pointerList;

    constructor() 
    {
        super('UIScene')
    }

    preload()
    {
        this.load.image("underJoyStick", "Sprites/UI/underJoyStick.png");
        this.load.image("joyStick", "Sprites/UI/joyStick.png");
    }

    create()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        this.virtualJoyStick = new Phaser.Geom.Rectangle(10, 460, 250, 250);
        this.graphics.strokeRectShape(this.virtualJoyStick);
        
        this.underJoyStick = this.physics.add.sprite(this.virtualJoyStick.centerX, this.virtualJoyStick.centerY, "underJoyStick");
        this.underJoyStick.scale = 4;
        this.joyStickStick = this.physics.add.sprite(this.virtualJoyStick.centerX, this.virtualJoyStick.centerY, "joyStick");
        this.joyStickStick.scale = 6;
        this.graphics.strokeEllipse(this.virtualJoyStick.centerX, this.virtualJoyStick.centerY, 10,10);
        
        this.pointerList = [];
    }

    update()
    {
       // this.pointerList = this.scene.scene.input.manager.touch.manager.pointers;
        //console.log(this.scene.scene.input.manager.touch);
        console.log(this.pointerList);
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