class Bedroom extends AdventureScene {
    constructor() {
        super("bedroom", "Bedroom");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image("door", "door@2x.png");
        this.load.image("keyboard", "keyboard@2x.png");
        this.load.image("monitor", "monitor@2x.png");
        this.load.image("mouse", "mouse@2x.png");
        this.load.image("paper stack", "paper stack@2x.png");
        this.load.image("pen cup", "pen cup_1@2x.png");
        this.load.image("scene1", "scene1-80.jpg");
        this.load.image("window", "window@2x.png");
    }

    onEnter() {
        this.add.image(this.w/2, this.h/2, "scene1").setCrop(0, 0, this.w*0.75 + 1, this.h);
        
        let door = this.add.image(this.w * 0.09, this.h * 0.57, "door")
            .setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.gotoScene('demo2'));
        this.describe(door, "A door. Where does it lead?", "You open the door to the hallway.")

        let keyboard = this.add.image(this.w * 0.5, this.h * 0.68, "keyboard")
            .setScale(0.5)
            .setInteractive();
        this.describe(keyboard, "A shiny new keyboard.", "For some reason, typing on it doesn't do anything.")

        let monitor = this.add.image(this.w * 0.5, this.h * 0.58, "monitor")
            .setScale(0.5)
            .setInteractive()
        this.describe(monitor, "A state-of-the-art desktop monitor.", "It's not touchscreen.")

        let mouse = this.add.image(this.w * 0.43, this.h * 0.68, "mouse")
            .setScale(0.5)
            .setInteractive()
        this.describe(mouse, "A hot pink wireless mouse.", "The monitor bloomed to life.");

        let paper_stack = this.add.image(this.w * 0.6, this.h * 0.67, "paper stack")
            .setScale(0.5)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A stack of blank printer paper."));
        this.takeAndDescribe(paper_stack, "sheet of paper", "You take a blank sheet of paper.", "You have already taken a piece of paper.");
        
        let pen_cup = this.add.image(this.w * 0.41, this.h * 0.62, "pen cup")
            .setScale(0.5)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A cup full of pens."));
        this.describe(pen_cup, "pen", "You take a pen.", "You have already taken a pen.")
        
        let window = this.add.image(this.w * 0.3, this.h * 0.4, "window")
            .setScale(0.5)
            .setInteractive()
        this.describe(window, "A window that looks outside.", "There seems to be a garden beyond the window.")
        
        let pfp = this.add.circle(this.w*0.5,this.h*0.55, 20, 0xcecacf, 0)

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('bedroom');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super("intro");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("studiologo", "pandared@2x.png");
        this.cameras.main.setBackgroundColor(0xaea2ba)
    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        let title = this.add.text(this.w/2, this.h+100, "title", {
            fontFamily: "ChakraPetch-Medium",
            fontSize: 200
        }).setOrigin(0.5);
        let logo = this.add.image(this.w/2, this.h/2, "studiologo").setAlpha(1);
        let start = this.add.text(this.w/2, this.h/2, "click anywhere to start")
            .setFontSize(40).setOrigin(0.5).setAlpha(0);
        let play = this.add.text(this.w/2, this.h/2 + 50, "play", {
            fontFamily: "Baloo2-Regular", 
            fontSize: 100
        }).setOrigin(0.5).setAlpha(0).setInteractive();

        const tweens_chain = this.tweens.chain({
            tweens: [
                {
                    targets: logo,
                    alpha: {from: 0, to: 1},
                    duration: 2300,
                    ease: "Quad.easeInOut",
                    yoyo: true 
                },
                {
                    targets: title,
                    y: this.h/2.5,
                    duration: 2500,
                    ease: "Back.easeOut",
                }, 
                {
                    targets: start,
                    alpha: {from: 0.3, to: 1},
                    duration: 1000,
                    ease: "Quad.easeInOut",
                    repeat: -1,
                    yoyo: true
                }
            ]
        });

        this.input.once('pointerdown', ()=> {
            tweens_chain.stop();
            logo.setAlpha(0);
            title.setY(this.h/2.5);
            this.tweens.add({
                targets: title,
                y: this.h/2.5 - 100,
                ease: "Quad.easeOut"
            });
            this.tweens.add({
                targets: start,
                alpha: 0,
                ease: "Quad.easeOut"
            });
            this.tweens.add({
                targets: play,
                alpha: 1,
                ease: "Quad.easeOut"
            });
        });

        play.on('pointerover', ()=> {
            play.setScale(1.1);
        })
            .on('pointerout', ()=> {
            play.setScale(1);
        })
            .on('pointerdown', ()=> {
            this.scene.start('bedroom');
        });

    }
    update(){
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Bedroom, Demo2, Outro],
    title: "Adventure Game",
});

