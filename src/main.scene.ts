// generate name frames?
import * as Phaser from 'phaser';
import { adventurer_src } from '../assets';

export class MainScene extends Phaser.Scene {
  adventurer: Phaser.Physics.Arcade.Sprite;
  dKey;
  aKey;
  wKey;

  constructor() {
    super('main-scene');
  }

  preload() {
    this.load.spritesheet('adventurer-sprite', adventurer_src, { frameWidth: 50, frameHeight: 37 });
  }

  create() {
    this.anims.create({
      key: 'adventurer-standing',
      frames: this.anims.generateFrameNumbers('adventurer-sprite', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'adventurer-running-right',
      frames: this.anims.generateFrameNumbers('adventurer-sprite', { start: 8, end: 13 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'adventurer-running-left',
      frames: this.anims.generateFrameNumbers('adventurer-sprite', { start: 8, end: 13 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'adventurer-jumping',
      frames: this.anims.generateFrameNumbers('adventurer-sprite', { start: 14, end: 23 }),
      frameRate: 6,
      repeat: 0,
    })

    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.adventurer = this.physics.add.sprite(100, 100, 'adventurer-sprite');
    this.adventurer.setCollideWorldBounds(true);
    this.adventurer.anims.load('adventurer-standing');
    this.adventurer.anims.load('adventurer-running-right');
    this.adventurer.anims.load('adventurer-running-left');
    this.adventurer.anims.load('adventurer-jumping');
    
    this.adventurer.setState('standing');
    this.adventurer.play('adventurer-standing');
  }

  update(timer, delta) {
    let nextState;
    if (this.dKey.isDown) {
      nextState = 'running-right';
      this.adventurer.flipX = false;
      // if (this.adventurer.body.touching.down) { // not if touching world bounds!?
      this.adventurer.setVelocityX(90);
      // }
    } else if (this.aKey.isDown) {
      nextState = 'running-left';
      this.adventurer.flipX = true;
      this.adventurer.setVelocityX(-90);
    } else if (this.wKey.isDown) {
      nextState = 'jumping';
      this.adventurer.setVelocityY(-400);
    } else {
      nextState = 'standing';
      this.adventurer.setVelocityX(0);
    }

    if (nextState !== this.adventurer.state) {
      this.adventurer.setState(nextState);
      this.adventurer.play(`adventurer-${nextState}`);
    }
    // let animation = this.adventurer.anims.getCurrentKey();


  }
}