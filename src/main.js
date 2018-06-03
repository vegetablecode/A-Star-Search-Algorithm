// settings
var fpsNumber = 1;
var cols = 5;
var rows = 5;

var startX = 2;
var startY = 4;

var endX = 2
var endY = 1;

var towerX = 0;
var towerY = 0;

var randomObstacles = false;

// create the grid
var grid = new Array(cols);

// simulation speed
var lastLoop = new Date;
var count = 0;
var i = 0;

// UI elements
var button;
var sizeInput, sizeLabel;
var speedInput, speedLabel;
var towerXInput, towerYInput, towerLabel, towerXLabel, towerYLabel;
var kingXInput, kingYInput, kingLabel, kingXLabel, kingYLabel;
var playerXInput, playerYInput, playerLabel, playerXLabel, playerYLabel;

function setup() {

  // UI elements

  // board size
  sizeLabel = createElement('h3', 'Board size:');
  sizeLabel.position(20, 405);
  sizeInput = createInput();
  sizeInput.position(20, 450);

  // simulation speed
  speedLabel = createElement('h3', 'Simulation speed:');
  speedLabel.position(20, 480);
  speedInput = createInput();
  speedInput.position(20, 525);

  // tower position
  towerLabel = createElement('h3', 'Tower\'s position:');
  towerXLabel = createElement('h5', 'x:');
  towerYLabel = createElement('h5', 'y:');
  towerXLabel.position(10, 580);
  towerYLabel.position(190, 580);
  towerLabel.position(20, 555);
  towerXInput = createInput();
  towerYInput = createInput();
  towerXInput.position(20, 600);
  towerYInput.position(200, 600);

  // king position
  kingLabel = createElement('h3', 'King\'s position:');
  kingXLabel = createElement('h5', 'x:');
  kingYLabel = createElement('h5', 'y:');
  kingXLabel.position(10, 730);
  kingYLabel.position(190, 730);
  kingLabel.position(20, 700);
  kingXInput = createInput();
  kingYInput = createInput();
  kingXInput.position(20, 750);
  kingYInput.position(200, 750);

  // player position
  playerLabel = createElement('h3', 'Player\'s position:');
  playerXLabel = createElement('h5', 'x:');
  playerYLabel = createElement('h5', 'y:');
  playerXLabel.position(10, 655);
  playerYLabel.position(190, 655);
  playerLabel.position(20, 635);
  playerXInput = createInput();
  playerYInput = createInput();
  playerXInput.position(20, 675);
  playerYInput.position(200, 675);

  // buttons
  button = createButton('submit');
  button.position(sizeInput.x + sizeInput.width, 775);
  button.mousePressed(applySetup);

  textAlign(CENTER);
  textSize(50);

  // canvas setup
  frameRate(fpsNumber);
  createCanvas(400, 800);
  fill(255);
  rect(0, 400, 400, 400);
  width = 400 / cols;
  height = 400 / rows;

  // create a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // for each element create a spot
  // 0: normal spot
  // 1: wall
  // 2: tower
  // 3: king
  // 4: player
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (i == towerX && j == towerY) {
        // if spot is a tower
        grid[i][j] = new Spot(i, j, width, height, grid, 2, randomObstacles);
      } else if (i == startX && j == startY) {
        // if spot is a player
        grid[i][j] = new Spot(i, j, width, height, grid, 4, randomObstacles);
      } else if (i == endX && j == endY) {
        // if spot is a king
        grid[i][j] = new Spot(i, j, width, height, grid, 3, randomObstacles);
      } else if (i == towerX || j == towerY) {
        // if spot is a wall
        grid[i][j] = new Spot(i, j, width, height, grid, 1, randomObstacles);
      } else {
        // if spot is not a wall
        grid[i][j] = new Spot(i, j, width, height, grid, 0, randomObstacles);
      }
    }
  }

  // for each spot, add the neighbours
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  // start & end point
  start = grid[startX][startY];
  end = grid[endX][endY];

  // create a new pathfinder
  pathfinder = new AStarAlgorithm(start, end);

}

function draw() {

  // simulation speed
  var thisLoop = new Date;
  var fps = 1000 / (thisLoop - lastLoop);
  lastLoop = thisLoop;
  ++i;
  count += fps;

  // make a pathfinder step
  pathfinder.step();

  // set the background color
  //background(0);
  fill(0);
  rect(0, 0, 399, 399);

  // display the grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // display discovered nodes (green)
  for (var i = 0; i < pathfinder.openSet.length; i++) {
    pathfinder.openSet[i].show(color(0, 255, 0));
  }

  // display evaluated nodes (red)
  for (var i = 0; i < pathfinder.closedSet.length; i++) {
    pathfinder.closedSet[i].show(color(255, 0, 0));
  }

  // display the path
  var path = getPath(pathfinder.lastCheckedNode);
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

}

function getPath(endNode) {
  // find the path by walking backwards
  path = [];
  var temp = endNode;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  return path
}

// UI methods
function applySetup() {
  // board size
  var value = parseInt(sizeInput.value());
  if (value > 2 && value < 500) {
    cols = value;
    rows = value;
  }

  // simulation speed
  var value = parseInt(speedInput.value());
  if (value > 0 && value < 500) {
    fpsNumber = value;
  }

  // tower position
  var value = parseInt(towerXInput.value());
  if (value > 0 && value < cols) {
    towerX = value;
  }
  var value = parseInt(towerYInput.value());
  if (value > 0 && value < rows) {
    towerY = value;
  }

  // king position
  var value = parseInt(kingXInput.value());
  if (value > 0 && value < cols) {
    endX = value;
  }
  var value = parseInt(kingYInput.value());
  if (value > 0 && value < rows) {
    endY = value;
  }

  // player position
  var value = parseInt(playerXInput.value());
  if (value > 0 && value < cols) {
    startX = value;
  }
  var value = parseInt(playerYInput.value());
  if (value > 0 && value < rows) {
    startY = value;
  }


  setup();

}
