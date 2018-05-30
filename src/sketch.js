// simulation speed
var lastLoop = new Date;
var count = 0;
var i = 0;


function removeFromArray(arr, elt) {
  for(var i=arr.length-1; i>=0; i--) {
    if(arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  //var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i-b.i) + abs(a.j-b.j);
  return d;
}

var cols = 25;
var rows = 25;
var grid = new Array(cols);

// the set of evaluated nodes
var closedSet = [];

// the set of discovered, but not evaluated yet notes
var openSet = [];

var start;
var end;
var w, h;
var path = [];

// f(n) = g(n) + h(n)
// every spot calculates the f(n) value
// g(n) is actual "cost" from beginning to the end
// h(n) is heuristics
function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // each spot stores info about its neighbours
  this.neighbours = [];
  this.previous = undefined;

  // show a spot
  this.show = function(col) {
    // color setup
    fill(col);
    noStroke();

    // draw rectangle
    rect(this.i*w, this.j*h, w-1, h-1);
  }

  // find spot's neighbours
  this.addNeighbours = function(grid) {
    var i = this.i;
    var j = this.j;
    // top-right
    if((i<cols-1)&&(j>1)) {
      this.neighbours.push(grid[i+1][j-2]);
    }
    if((i<cols-2)&&(j>0)) {
      this.neighbours.push(grid[i+2][j-1]);
    }

    // top-left
    if((i>0)&&(j>1)) {
      this.neighbours.push(grid[i-1][j-2]);
    }
    if((i>1)&&(j>0)) {
      this.neighbours.push(grid[i-2][j-1]);
    }

    // bottom-right
    if((i<cols-1)&&(j<rows-2)) {
      this.neighbours.push(grid[i+1][j+2]);
    }
    if((i<cols-2)&&(j<rows-1)) {
      this.neighbours.push(grid[i+2][j+1]);
    }

    // bottom-left
    if((i>0)&&(j<rows-2)) {
      this.neighbours.push(grid[i-1][j+2]);
    }
    if((i>1)&&(j<rows-1)) {
      this.neighbours.push(grid[i-2][j+1]);
    }
  }

}

function setup() {
  frameRate(2);
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

  openSet.push(start);

}

function draw() {

  // simulation speed
  var thisLoop = new Date;
  var fps = 1000/(thisLoop - lastLoop);
  lastLoop = thisLoop;
  ++i;
  count+=fps;
  // ----------------------

  if(openSet.length>0) {
    // find the lowest "winner"
    var winner = 0;
    for(var i=0; i<openSet.length; i++) {
      if(openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    if(current === end) {
      noLoop();
      console.log("DONE!");
    }

    // remove evaluated node from openSet and add it to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbours = current.neighbours;
    for(var i=0; i<neighbours.length; i++) {
      var neighbour = neighbours[i];

      if(!closedSet.includes(neighbour)) {
        var tempG = current.g + 1;

        if(openSet.includes(neighbour)) {
          if(tempG < neighbour.g) {
            neighbour.g = tempG;
          }
        } else {
          neighbour.g = tempG;
          openSet.push(neighbour);
        }

        // g: how long it takes to get there
        // h: guess how long it takes to get to the end
        // score = g + h
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.previous = current;

      }

    }

  } else {
    // no solution
  }

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
