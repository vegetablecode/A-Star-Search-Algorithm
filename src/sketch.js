var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;

// f(n) = g(n) + h(n)
// every spot calculates the f(n) value
// g(n) is actual "cost" from beginning to the end
// h(n) is heuristics
function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.show = function() {
    rect(this.x*w, this.y*h, w, h);
  }
}

function setup() {
  createCanvas(400, 400);
  console.log('A*');

  w = width/cols;
  h = height/rows;

  // create 2D array
  for(var i=0; i<cols; i++) {
    grid[i] = new Array(rows);
  }

  // for each element create a spot
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  openSet.push(start);

}

function draw() {

  if(openSet.length>0) {
    // we can keep going
  } else {
    // no solution
  }

  background(0);

  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      grid[i][j].show();
    }
  }

}
