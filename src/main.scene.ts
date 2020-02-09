// generate name frames?
import * as Phaser from 'phaser';
import { adventurer_src } from '../assets';

export class MainScene extends Phaser.Scene {
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

    const adventurer = this.add.sprite(100, 100, 'adventurer-sprite')
    adventurer.anims.load('adventurer-standing');
    adventurer.anims.load('adventurer-running-right');
    adventurer.play('adventurer-running-right');
  }

  update(timer, delta) {

  }
}