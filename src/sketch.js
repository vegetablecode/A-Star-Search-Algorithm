// settings
var fpsNumber = 5;
var cols = 15;
var rows = 15;
var startX = 0;
var startY = 0;
var endX = cols - 1;
var endY = rows - 1;

// create the grid
var grid = new Array(cols);

// simulation speed
var lastLoop = new Date;
var count = 0;
var i = 0;


function setup() {

  // canvas setup
  frameRate(fpsNumber);
  createCanvas(400, 400);
  width = width / cols;
  height = height / rows;

  // create a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // for each element create a spot
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j, width, height, grid);
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
  background(0);

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
