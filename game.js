class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
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
        let bg = this.add.image(this.w/2, this.h/2, "scene1")
        .setCrop(0, 0, this.w*0.75, this.h);

        

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

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
                this.gotoScene('demo1');
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

        let title = this.add.text(this.w/2, this.h+100, "title").setScale(1.3);
        let logo = this.add.image(this.w/2, this.h/2, "studiologo").setAlpha(1);
        let start = this.add.text(960, 540, "click anywhere to start");
        start.setFontSize(40).setOrigin(0.5).setAlpha(0);
        let play = this.add.text(this.w/2, this.h/2 + 50, "play", {
            fontFamily: "Baloo2-Regular", 
            fontSize: 100
        }).setOrigin(0.5).setAlpha(0).setInteractive();
        let quit = this.add.text(this.w/2, this.h/2 + 250, "quit", {
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
                targets: [play, quit],
                alpha: 1,
                ease: "Quad.easeOut"
            });
        });

        play.on('pointerover', ()=> {
            play.setScale(1.1);
        });

        play.on('pointerout', ()=> {
            play.setScale(1);
        });

        play.on('pointerdown', ()=> {
            this.scene.start('demo1');
        });

        quit.on('pointerover', ()=> {
            quit.setScale(1.1);
        });

        quit.on('pointerout', ()=> {
            quit.setScale(1);
        });

        quit.on('pointerdown', ()=> {
            this.scene.start('outro');
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
    scene: [Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

