class UIScene extends Phaser.Scene
{
    fullScreenBut;
    joyStickStick;
    underJoyStick;
    pointerList;
    virtualJoyStick;
    virtualJoyStickBounds;
    
    moneyBarUI;
    moneyUIIcon;
    moneyText;

    constructor() 
    {
        super('UIScene')
    }

    preload()
    {
        this.load.image("underJoyStick", "Sprites/UI/underJoyStick.png");
        this.load.image("joyStick", "Sprites/UI/joyStick.png");

        this.load.image("moneyBarUI", "Sprites/UI/moneyUI.png");
        this.load.image("electricIconUI", "Sprites/UI/electric.png");
    }

    create()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 0, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
        this.virtualJoyStick = new Phaser.Geom.Ellipse(230, 550, 80, 80);
        this.virtualJoyStickBounds = new Phaser.Geom.Ellipse(230, 550, 470, 470);
        this.graphics.strokeEllipseShape(this.virtualJoyStick);
        this.graphics.strokeEllipseShape(this.virtualJoyStickBounds);

        this.underJoyStick = this.physics.add.sprite(this.virtualJoyStick.x, this.virtualJoyStick.y, "underJoyStick");
        this.underJoyStick.scale = 4;
        this.joyStickStick = this.physics.add.sprite(this.virtualJoyStick.x, this.virtualJoyStick.y, "joyStick");
        this.joyStickStick.scale = 6;
        this.graphics.strokeEllipse(this.virtualJoyStick.x, this.virtualJoyStick.y, 10, 10);
        
        this.moneyBarUI = this.add.existing(new Phaser.GameObjects.Sprite(this, config.width / 2, 40, "moneyBarUI"));
        this.moneyBarUI.scale = 2;

        this.moneyText = this.add.text(this.moneyBarUI.x, 35, "0", {
            font: '40px Changa',
            fill: '#ffffff',
            align: "center"
        });
        this.moneyText.setOrigin(0.5,0.5);

        this.electricIconUI = this.add.existing(new Phaser.GameObjects.Sprite(this, config.width / 2 + 15, 37, "electricIconUI"));
        
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

        this.fullScreenBut = new Button(this, config.width - 75, 10, "fullScreenBtn", function ()
        {
            if (!this.scene.scale.isFullscreen)
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
        var pointersOnJoyStick = 99;
        var angleToTouch = 0;

        var moveX;
        var moveY;

        for (var i = 0; i < pointerList.length; i++)
        {
            var pointer = pointerList[i];
            if (this.virtualJoyStick.contains(pointer.x, pointer.y))
            {
                pointersOnJoyStick = i;

                this.joyStickStick.x = pointer.x;
                this.joyStickStick.y = pointer.y;

                var xDiff = pointer.x - this.virtualJoyStick.x;
                var yDiff = pointer.y - this.virtualJoyStick.y;

                angleToTouch = Math.atan2(yDiff, xDiff);

                moveX = (Math.cos(angleToTouch) * this.virtualJoyStick.width / 2) / (this.virtualJoyStick.width / 2);
                moveY = (Math.sin(angleToTouch) * this.virtualJoyStick.height / 2) / (this.virtualJoyStick.height / 2)

            }
            else if (this.virtualJoyStickBounds.contains(pointer.x, pointer.y))
            {
                pointersOnJoyStick = i;

                var xDiff = pointer.x - this.virtualJoyStick.x;
                var yDiff = pointer.y - this.virtualJoyStick.y;

                angleToTouch = Math.atan2(yDiff, xDiff);

                this.joyStickStick.x = this.virtualJoyStick.x + Math.cos(angleToTouch) * this.virtualJoyStick.width / 2;
                this.joyStickStick.y = this.virtualJoyStick.y + Math.sin(angleToTouch) * this.virtualJoyStick.height / 2;
            }
        }

        if (pointerList[pointersOnJoyStick])
        {
            var isDownCheck = pointerList[pointersOnJoyStick].isDown;
            var pointer = pointerList[pointersOnJoyStick];

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

    updateMoney(money)
    {
        if(this.moneyText)
        {
            this.moneyText.text = money;
            this.electricIconUI.x = this.moneyText.x + this.moneyText.width / 2 + 10;
        }
    }

    radToDeg(rad)
    {
        return rad * 180 / Math.PI;
    }

    radToDeg(deg)
    {
        return deg * Math.PI / 180;
    }
}