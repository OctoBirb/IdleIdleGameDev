/// PLAN
// Arc Simulator; about a few spheres who want to travel 84852813 meters, which is the distance to cross a minecraft world diagonally. there are a few different spheres. one made of tungsten, another made of styrofoam, another made of paper, and another made of rocks.

/// FEATURES
// 4 sections of the game; Styrofoam, Aluminium, Steel, and Tungsten.
// The weights of the spheres are: 17g, 40g, 131g, and 325g. (16.887 * density of each material)
// Gravity

var savegame // the savegame
var Game = { // easier management of the game vars
  materials: ["Styrofoam", "Aluminium", "Steel", "Tungsten"],
  materialWeight: [17, 40, 131, 325],
  ballType: 0,
  currD: 0, // current distance in meters
  currY: 0, // current altitude in meters
  veloH: 0, // horizontal velocity in meters per sec
  veloY: 0, // vertical velocity in meters per sec
  bestD: 0, // best distance in meters
  bestY: 0, // best altitude in meters
  bestVH: 0,
  bestVY: 0,
  ballThrown: false,
  potential: {
    vH: 0,
    vY: 0,
    ivH: 0.05,
    ivY: 0.05
  }
}

Game.currMat = Game.materials[Game.ballType]
Game.weight = Game.materialWeight[Game.ballType]

var canvas = document.getElementById("visual");
var c = canvas.getContext("2d");
var scale = 1 / (10 ** ie('scale').valueAsNumber)
let oldScale = 1 / (10 ** ie('scale').valueAsNumber)

function throwBall(h, y) {
  ballThrown = true
  Game.currD = 0
  Game.currY = 0
  Game.veloH = h
  Game.veloY = y
  Game.potential.vH = 0
  Game.potential.vY = 0
  c.fillStyle = "#000000"
  c.fillRect(0, 0, 500, 100)
}

function load() {
  savegame = JSON.parse(localStorage.getItem("Game"));
  Game = savegame
}

function checkScale() {
  if (scale != oldScale) {
    c.fillStyle = "#000000"
    c.fillRect(0, 0, 500, 100)
    oldScale = scale
  } else {
    oldScale = scale
  }
}

function draw() {
  ut("bT", Game.currMat)
  ut("cD", br(Game.currD, 3) + " meters")
  ut("cY", br(Game.currY, 3) + " meters")
  ut("bD", br(Game.bestD, 3) + " meters")
  ut("bY", br(Game.bestY, 3) + " meters")
  ut("vH", br(Game.veloH * 20, 3) + " meters per second")
  ut("vY", br(Game.veloY * 20, 3) + " meters per second")
  ut("bvH", br(Game.bestVH * 20, 3) + " meters per second")
  ut("bvY", br(Game.bestVY * 20, 3) + " meters per second")

  ut("pvH", br(Game.potential.vH * 20,1).toString() + " meters per second")
  ut("pvY", br(Game.potential.vY * 20,1).toString() + " meters per second")

  ut("scaleT", `Scale: ${br(10 ** (ie('scale').valueAsNumber + 2) * 5, 0)}x${br(10 ** (ie('scale').valueAsNumber + 2), 0)} meters view`)

  c.fillStyle = `hsl(${Game.currD}, 100%, 50%)`
  c.fillRect(Game.currD * scale, (100 - (Game.currY * scale)), 2, 2)
  c.fillStyle = "#7f7f7f"
  c.fillRect(84852813 * scale, 0, 500, 100)
  c.fillStyle = "#ffffff"
  c.fillRect(1000 * scale, 480, 2, 20)
  c.fillRect(10000 * scale, 480, 2, 20)
  c.fillRect(100000 * scale, 480, 2, 20)
  c.fillRect(1000000 * scale, 480, 2, 20)

  checkScale()
}

window.setInterval(function() {
  scale = 1 / (10 ** ie('scale').valueAsNumber)
  Game.currY += Game.veloY
  Game.currD += Game.veloH
  Game.veloY -= Game.weight / 100

  if ((Game.currY < 0 || Game.veloH < 0) && !Game.ballThrown) {
    Game.veloH = 0
    Game.veloY = 0
  }

  if (Game.currY <= 0 && Game.currD <= 0) {
    Game.ballThrown = false
  }

  Game.potential.vH += Game.potential.ivH
  Game.potential.vY += Game.potential.ivY
  Game.potential.vH = br(Game.potential.vH, 3)
  Game.potential.vY = br(Game.potential.vY, 3)
  Game.bestD = Math.max(Game.bestD, Game.currD)
  Game.bestY = Math.max(Game.bestY, Game.currY)
  Game.bestVH = Math.max(Game.bestVH, Game.veloH)
  Game.bestVY = Math.max(Game.bestVY, Game.veloY)
  draw()
}, 50)

window.setInterval(function() {
  localStorage.setItem("Game", JSON.stringify(Game)); // saves the file by turning the object into a string and putting it into storage
}, 30000)