import * as Phaser from 'phaser';
import { MainScene } from './main.scene';

const phaser_game_config = {
  width: 350,
  height: 700,
  parent: 'app',
  pixelArt: true,
  scene: [ MainScene ],
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true,
            fps: 60,
        }
    },
}

export class PhaserGame extends Phaser.Game {
  constructor() {
    super(phaser_game_config);
  }
}