import * as Phaser from "phaser";
import { adventurer_src, dungeon_src } from "../assets";
import atlas from "../assets/test-atlas.json";

export class MainScene extends Phaser.Scene {
  adventurer: Phaser.Physics.Arcade.Sprite;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  dKey;
  aKey;
  wKey;

  constructor() {
    super("main-scene");
  }

  preload() {
    this.load.spritesheet("adventurer-sprite", adventurer_src, {
      frameWidth: 50,
      frameHeight: 37,
    });
    this.load.atlas("dungeon", dungeon_src, atlas); // todo: export url next to src url
  }

  create() {
    /* create adventurer animations */
    this.anims.create({
      key: "adventurer-standing",
      frames: this.anims.generateFrameNumbers("adventurer-sprite", {
        start: 0,
        end: 3
      }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "adventurer-running-right",
      frames: this.anims.generateFrameNumbers("adventurer-sprite", {
        start: 8,
        end: 13
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "adventurer-running-left",
      frames: this.anims.generateFrameNumbers("adventurer-sprite", {
        start: 8,
        end: 13
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "adventurer-jumping",
      frames: this.anims.generateFrameNumbers("adventurer-sprite", {
        start: 14,
        end: 23
      }),
      frameRate: 12,
      repeat: 0
    });

    /* bind keyboard keys */
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    /* setup adventurer sprite */
    this.adventurer = this.physics.add.sprite(100, 100, "adventurer-sprite");
    this.adventurer.setCollideWorldBounds(false);
    this.adventurer.body.setSize(20, 31, true).setOffset(15, 6);

    this.adventurer.anims.load("adventurer-standing");
    this.adventurer.anims.load("adventurer-running-right");
    this.adventurer.anims.load("adventurer-running-left");
    this.adventurer.anims.load("adventurer-jumping");

    /* setup adventurer data */
    // this.adventurer.setMaxVelocity(90, 180);

    /* setup dungeon platforms */
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, 500, "dungeon", "platform");
    this.platforms.create(300, 600, "dungeon", "platform");


    /* set collisions */
    this.physics.add.collider(this.adventurer, this.platforms);
  }

  update(timer, delta) {
    let midair = !this.adventurer.body.touching.down;
    // let lateral = Phaser.Math.Clamp(this.adventurer.body.velocity.x, -1, 1);
    let animation = this.adventurer.anims.getCurrentKey();

    if (midair) {
      if (this.dKey.isDown) {
        this.adventurer.flipX = false;
        this.adventurer.setVelocityX(150);
      }
      if (this.aKey.isDown) {
        this.adventurer.flipX = true;
        this.adventurer.setVelocityX(-150);
      }
      if (this.dKey.isUp && this.aKey.isUp) {
        this.adventurer.setVelocityX(0);
      }
    } else {
      if (this.dKey.isDown && animation !== "adventurer-running-right") {
        this.adventurer.play("adventurer-running-right");
        this.adventurer.flipX = false;
        this.adventurer.setVelocityX(150);
      }
      if (this.aKey.isDown && animation !== "adventurer-running-left") {
        this.adventurer.play("adventurer-running-left");
        this.adventurer.flipX = true;
        this.adventurer.setVelocityX(-150);
      }
      if (this.wKey.isDown) {
        this.adventurer.play("adventurer-jumping");
        this.adventurer.setVelocityY(-300);
      }
      if (this.aKey.isUp && this.dKey.isUp && this.wKey.isUp && animation !== "adventurer-standing") {
        this.adventurer.play("adventurer-standing");
        this.adventurer.setVelocityX(0);
      }
    }

  }
}
