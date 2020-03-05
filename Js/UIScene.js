class UIScene extends Phaser.Scene
{
    fullScreenBut;
    joyStickStick;
    underJoyStick;
    pointerList;
    virtualJoyStick;
    virtualJoyStickBounds;

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
        this.virtualJoyStick = new Phaser.Geom.Ellipse(230, 550, 180, 180);
        this.virtualJoyStickBounds = new Phaser.Geom.Ellipse(230, 550, 470, 470);
        this.graphics.strokeEllipseShape(this.virtualJoyStick);
        this.graphics.strokeEllipseShape(this.virtualJoyStickBounds);
        
        console.log(this.virtualJoyStick);

        this.underJoyStick = this.physics.add.sprite(this.virtualJoyStick.x, this.virtualJoyStick.y, "underJoyStick");
        this.underJoyStick.scale = 4;
        this.joyStickStick = this.physics.add.sprite(this.virtualJoyStick.x, this.virtualJoyStick.y, "joyStick");
        this.joyStickStick.scale = 6;
        this.graphics.strokeEllipse(this.virtualJoyStick.x, this.virtualJoyStick.y, 10,10);
        
        this.pointerList = [];
    }

    update()
    {
        this.virtualJoystickCheck();
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

    virtualJoystickCheck()
    {
        var pointerList = this.scene.scene.input.manager.pointers;
        var pointerOnJoyStick = 999;
        var angleToTouch = 0;

        var moveX;
        var moveY;

        for(var i = 0; i < pointerList.length;i++)
        {
            var pointer = pointerList[i];
            if(this.virtualJoyStick.contains(pointer.x, pointer.y))
            {
                pointerOnJoyStick = i;

                this.joyStickStick.x = pointer.x;
                this.joyStickStick.y = pointer.y;
                
                this.getMoveVectors();
            } 
            else if(this.virtualJoyStickBounds.contains(pointer.x, pointer.y))
            {
                pointerOnJoyStick = i;

                this.getMoveVectors();
            }
        }

        if (pointerList[pointerOnJoyStick])
        {
            var isDownCheck = pointerList[pointerOnJoyStick].isDown;
            var pointer = pointerList[pointerOnJoyStick];
        
            if (!isDownCheck)
            {
                this.joyStickStick.x = this.virtualJoyStick.x;
                this.joyStickStick.y = this.virtualJoyStick.y;
                
                moveX = 0;
                moveY = 0;
            }
            else
            {
                moveX = (Math.cos(angleToTouch) * this.virtualJoyStick.width / 2) / (this.virtualJoyStick.width / 2);
                moveY = (Math.sin(angleToTouch) * this.virtualJoyStick.height / 2) / (this.virtualJoyStick.height / 2)
            }
        }
        else
        {
            this.joyStickStick.x = this.virtualJoyStick.x;
            this.joyStickStick.y = this.virtualJoyStick.y;

            moveX = 0;
            moveY = 0;
        }

       // moveX = (Math.cos(angleToTouch) * this.virtualJoyStick.width / 2) / (this.virtualJoyStick.width / 2);
       // moveY = (Math.sin(angleToTouch) * this.virtualJoyStick.height / 2) / (this.virtualJoyStick.height / 2)
        //console.log("X pos: " + moveX + "| Y pos: " + moveY);
        
        var gameScene = this.scene.manager.scenes[0];
        gameScene.playerMovementVector.x = moveX;
        gameScene.playerMovementVector.y = moveY;
    }

    getMoveVectors()
    {
        var xDiff = pointer.x - this.virtualJoyStick.x;
        var yDiff = pointer.y - this.virtualJoyStick.y;

        angleToTouch = Math.atan2(yDiff, xDiff);
        
        this.joyStickStick.x = this.virtualJoyStick.x + Math.cos(angleToTouch) * this.virtualJoyStick.width / 2;
        this.joyStickStick.y = this.virtualJoyStick.y + Math.sin(angleToTouch) * this.virtualJoyStick.height / 2;
    }

    radToDeg(rad)
    {
        return rad * 180/Math.PI;
    }

    radToDeg(deg)
    {
        return deg * Math.PI/180;
    }
}