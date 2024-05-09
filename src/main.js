// Ian Liu
// Created: 5/6/2024
// Phaser: 3.70.0
//
// Gallery Shooter
//
// 
// Art assets from Kenny Assets "Shooting Gallery" and "Animal Pack Redux" set:
// https://kenney.nl/assets/shooting-gallery
// https://kenney.nl/assets/animal-pack-redux 
//

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1200,
    height: 640,
    fps: { forceSetTimeOut: true, target: 60 },
    scene: [Gallery]
    
}

const game = new Phaser.Game(config);