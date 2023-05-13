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
            .on('pointerdown', () => this.gotoScene('hallway'));
        this.describe(door, "A door. Where does it lead?", "You open the door to the hallway.")

        let keyboard = this.add.image(this.w * 0.5, this.h * 0.68, "keyboard")
            .setScale(0.5)
            .setInteractive();
        this.describe(keyboard, "A shiny new keyboard.", "For some reason, typing on it doesn't do anything.")

        let monitor = this.add.image(this.w * 0.5, this.h * 0.58, "monitor")
            .setScale(0.5)
            .setInteractive()
        this.describe(monitor, "A state-of-the-art desktop monitor.", "It's not touchscreen.")

        let pfp = this.add.circle(this.w*0.5,this.h*0.55, 20, 0xcecacf).setAlpha(0)

        let mouse = this.add.image(this.w * 0.43, this.h * 0.68, "mouse")
            .setScale(0.5)
            .setInteractive()
            .once('pointerdown', () => {
                this.tweens.add({
                    targets: pfp,
                    alpha: {from:0, to: 1},
                    duration: 700
                })
            })
        this.describe(mouse, "A hot pink wireless mouse.", "The monitor turned on.");

        let paper_stack = this.add.image(this.w * 0.6, this.h * 0.67, "paper stack")
            .setScale(0.5)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A stack of blank printer paper."));
        this.takeAndDescribe(paper_stack, "sheet of paper", "You take a blank sheet of paper.", "You have already taken a piece of paper.");
        
        let pen_cup = this.add.image(this.w * 0.41, this.h * 0.62, "pen cup")
            .setScale(0.5)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A cup full of pens."));
        this.takeAndDescribe(pen_cup, "pen", "You take a pen.", "You have already taken a pen.")
        
        let window = this.add.image(this.w * 0.3, this.h * 0.4, "window")
            .setScale(0.5)
            .setInteractive()
        this.describe(window, "A window that looks outside.", "There seems to be a garden beyond the window.")
    }
}

class Hallway extends AdventureScene {
    constructor() {
        super("hallway", "Hallway");
    }
    onEnter() {
        let bed_door = this.add.text(this.w * 0.5, this.h * 0.4, "bedroom door🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('bedroom');
            });
        this.describe(bed_door, "A door that goes back to the bedroom.", "You open the door to the bedroom.")

        let key = this.add.text(this.w * 0.2, this.h * 0.3, 'key 🔑')
            .setFontSize(this.s *2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
        this.describe(key, "A key.", "It doesn't look like it fits with any of the doors.")

        let back_door = this.add.text(this.w * 0.4, this.h * 0.5, "back door🚪")
            .setOrigin(0.5)
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('garden')
            })
        this.describe(back_door, "A door that leads to the garden.", "The door creaks as it opens.")
        }
    }

class Garden extends AdventureScene {
    constructor() {
        super("garden", "Garden");
    }
    onEnter() {
        for (let i = 1; i < 11; i++) {
            this.add.text(this.w * 0.075 * i - (this.s * 10), this.h * 0.3, '🌳').setFontSize(this.s * 10)
        }

        let rabbit = this.add.text(this.w * 0.4, this.h * 0.65, "rabbit 🐇")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.tweens.add({
                    targets: rabbit,
                    alpha: {from: 0, to: 1},
                    y: `+=${10 * this.s}`,
                    duration: 1000,
                    onComplete: () => rabbit.destroy()
                })
            })
        this.describe(rabbit, "A peaceful rabbit.", "The rabbit hopped away.")

        let garden_door = this.add.text(this.w * 0.1, this.h * 0.6, "back door🚪")
            .setOrigin(0.5)
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('hallway')
            })
        this.describe(garden_door, "A door that leads to the back to the house.", "The door creaks as it opens.")

        let pond = this.add.text(this.w * 0.6, this.h * 0.7, "pond 🌊")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('pond')
            })
        this.describe(pond, "A small pond in the garden.", "Let's take a closer look.")
    }
}

class Pond extends AdventureScene {
    constructor() {
        super("pond", "Pond");
    }
    onEnter() {
        
        let jewelry_box = this.add.rectangle(this.w * 0.5, this.h * 0.3, 200, 100, 0xfcedf1)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A small jewelry box. It's locked."))
            .on('pointerdown', () => {
                if(!this.hasItem('key')) {
                    this.tweens.add({
                        targets: jewelry_box,
                        x: '+=' + this.s,
                        repeat: 2,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 100
                    })
                    this.showMessage("It needs a key to open.")
                } else {
                    this.showMessage("The jewelry box has been opened with the key.")
                    this.loseItem('key')
                    this.tweens.add({
                        targets: [heart, gate],
                        alpha: {from:0, to: 1},
                        duration: 1000
                    })
                    jewelry_box.destroy()
                }
            })

        let heart = this.add.text(this.w * 0.5, this.h * 0.3, "💗")
            .setFontSize(this.s * 2)
            .setOrigin(0.5)
            .setInteractive()
            .setAlpha(0)
            .on('pointerdown', () => {
                this.gainItem('heart')
                this.tweens.add({
                    targets: heart,
                    alpha: {from:1, to: 0},
                    duration: 1000,
                    onComplete: ()=> heart.destroy()
                })
            })
        this.describe(heart, "A small heart charm.", "The heart charm reminds you of something.")
        
        let gate = this.add.text(this.w * 0.5, this.h * 0.6, "⛩️")
        .setFontSize(this.s * 2)
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', () => this.showMessage("A gate. It seems to be the exit."))
        .on('pointerdown', () => {
            if (this.hasItem('heart') && this.hasItem('pen') && this.hasItem('sheet of paper')) {
                this.showMessage("You write a note on the gate and leave.")
                this.gotoScene('outro')
            } else {
                this.showMessage("A heartfelt note must be written on the shrine in order to leave.")
            }

        })

        let garden = this.add.text(50, 50, "back to the garden 🌳")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('garden')
            })
        this.describe(garden, "Garden", "Going back to the garden...")
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

        //scene shortcuts
        let scene1 = this.input.keyboard.addKey("1");
        let scene2 = this.input.keyboard.addKey("2");
        let scene3 = this.input.keyboard.addKey("3");
        let scene4 = this.input.keyboard.addKey("4");
        scene1.on('down', ()=> this.scene.start('bedroom'));
        scene2.on('down', ()=> this.scene.start('hallway'));
        scene3.on('down', ()=> this.scene.start('garden'));
        scene4.on('down', ()=> this.scene.start('pond'));


        let title = this.add.text(this.w/2, this.h+100, "title", {
            fontFamily: "ChakraPetch-Medium",
            fontSize: 200
        }).setOrigin(0.5);
        let logo = this.add.image(this.w/2, this.h/2, "studiologo").setAlpha(1);
        let start = this.add.text(this.w/2, this.h/2, "click anywhere to start")
            .setFontSize(40).setOrigin(0.5).setAlpha(0);
        let play = this.add.text(this.w/2, this.h/2 + 100, "play", {
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
        this.add.text(50, 50, "Thank you for playing!").setFontSize(50);
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
    scene: [Intro, Bedroom, Hallway, Garden, Pond, Outro],
    title: "Adventure Game",
});

