class UIScene extends Phaser.Scene
{
    constructor() 
    {
        super('UIScene')
    }

    createUIScene()
    {
        this.gameScene = gameScene;

        this.scoreText = this.add.text(100, 100, "Score: 0", {
            font: '40px Arial',
            fill: '#ffffff'
        }).setDepth(2);
    }

}