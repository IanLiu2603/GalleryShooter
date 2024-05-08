// Ian Liu
// Created: 5/6/2024
// Phaser: 3.70.0
//
// Gallery Shooter
//
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters
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
    width: 800,
    height: 600,
    fps: { forceSetTimeOut: true, target: 30 },
    scene: [Movement]
    
}

const game = new Phaser.Game(config);