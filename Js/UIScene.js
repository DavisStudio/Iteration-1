class UIScene extends Phaser.Scene
{
    fullScreenBut;

    constructor() 
    {
        super('UIScene')
    }

    preload()
    {
        this.load.image("ss", "Sprites/UI/fullScreen.png");
    }

    update()
    {
    }

    createUIScene(sceneKey)
    {
        this.currentScene = this.scene.get(sceneKey);
        this.scene.launch(this);

        this.makeFButton();
    }

    makeFButton()
    {
        console.log("fullSCRENbuttttttttttton");
        
        this.fullScreenBut = new Button(this, config.width - 60, 10, "ss", function()
        {
            console.log("fullSCREN");
        });
    }
}