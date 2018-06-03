// simulation speed
var lastLoop = new Date;
var count = 0;
var i = 0;

var cols = 15;
var rows = 15;
var grid = new Array(cols);


var start;
var end;
var w, h;
var path = [];




function setup() {
  frameRate(1);
  createCanvas(400, 400);
  console.log('A*');

  w = width/cols;
  h = height/rows;

  // create a 2D array
  for(var i=0; i<cols; i++) {
    grid[i] = new Array(rows);
  }

  // for each element create a spot
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j] = new Spot(i, j, w, h, grid);
    }
  }

  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  start = grid[0][0];
  //end = grid [15][7];
  end = grid[cols-1][rows-1];

  pathfinder = new AStarAlgorithm(start, end);
  var openSet = pathfinder.openSet;
  var closedSet = pathfinder.closedSet;
  var current = pathfinder.current;

}

function calcPath(endNode) {
    // Find the path by working backwards
    path = [];
    var temp = endNode;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
    return path
}

function draw() {

  // simulation speed
  var thisLoop = new Date;
  var fps = 1000/(thisLoop - lastLoop);
  lastLoop = thisLoop;
  ++i;
  count+=fps;
  // ----------------------

  pathfinder.step();

  background(0);

  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // discovered nodes -> green
  // evaluated nodes -> red
  // path -> blue
  for(var i=0; i<pathfinder.closedSet.length; i++) {
    pathfinder.closedSet[i].show(color(255, 0, 0));
  }

  // find the path
  var path = calcPath(pathfinder.lastCheckedNode);


  for(var i=0; i<pathfinder.openSet.length; i++) {
    pathfinder.openSet[i].show(color(0, 255, 0));
  }

  for(var i=0; i<path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

}
