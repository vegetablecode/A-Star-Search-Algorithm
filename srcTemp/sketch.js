// simulation speed
var lastLoop = new Date;
var count = 0;
var i = 0;


var cols = 15;
var rows = 15;
var grid = new Array(cols);

var w, h;
var path = [];

function loadGame(rows, cols) {
  mapGraphic = null;
  gamemap = new MapFactory().getMap(cols, rows, 10, 10, 410, 410, 0, 0.1);
  start = gamemap.grid[0][0];
  end = gamemap.grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false
  pathfinder = new AStart(gamemap, start, end);
}

function searchStep() {
  var result = pathfinder.step();
}

var mapGraphic = null;

function drawMap() {
  if(mapGraphic == null) {
    for(var i=0; i<gamemap.cols; i++) {
      for(var j=0; j<gamemap.rows; j++) {
        if(gamemap.grid[i][j].wall) {
          gamemap.grid[i][j].show(color(255));
        }
      }
    }
    mapGraphic = get(gamemap.x, gamemap.y, gamemap.w, gamemap.h);
  }

  image(mapGraphic, gamemap.x, gamemam.y);
}

function setup() {
  frameRate(1);
  createCanvas(400, 400);
  console.log('A*');

  w = width/cols;
  h = height/rows;

  loadGame(cols, rows);

  // create a 2D array
  for(var i=0; i<cols; i++) {
    grid[i] = new Array(rows);
  }

  // for each element create a spot
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j] = new Spot(i, j);
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

}

function draw() {

  // simulation speed
  var thisLoop = new Date;
  var fps = 1000/(thisLoop - lastLoop);
  lastLoop = thisLoop;
  ++i;
  count+=fps;
  // ----------------------

  searchStep();
  drawMap();

  background(0);

  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // discovered nodes -> green
  // evaluated nodes -> red
  // path -> blue
  for(var i=0; i<closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  // find the path
  path = [];
  var temp = current;
  path.push(temp);
  while(temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for(var i=0; i<openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  for(var i=0; i<path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

}
