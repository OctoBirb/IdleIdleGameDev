/// PLAN
// Arc Simulator; about a few spheres who want to travel 84852813 meters, which is the distance to cross a minecraft world diagonally. there are a few different spheres. one made of tungsten, another made of styrofoam, another made of paper, and another made of rocks.

/// FEATURES
// 4 sections of the game; Styrofoam, Aluminium, Steel, and Tungsten.
// The weights of the spheres are: 17g, 40g, 131g, and 325g. (16.887 * density of each material)
// Gravity

var savegame // the savegame
var Game = { // easier management of the game vars
  ballType: "Styrofoam",
  currD: 0, // current distance in meters
  currY: 0, // current altitude in meters
  veloH: 0, // horizontal velocity in meters per sec
  veloY: 0, // vertical velocity in meters per sec
  weight: 0, // weight in grams
  potential: {
    vH: 0,
    vY: 0
  }
}

function throwBall(h,y) {
  Game.veloH = h
  Game.veloY = y
}

function load() {
  savegame = JSON.parse(localStorage.getItem("Game"));
  Game = savegame
}

window.setInterval(function() {
  
}, 50)

window.setInterval(function() {
  localStorage.setItem("Game", JSON.stringify(Game)); // saves the file by turning the object into a string and putting it into storage
}, 30000)