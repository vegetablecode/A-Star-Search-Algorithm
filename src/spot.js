// f(n) = g(n) + h(n)
// every spot calculates the f(n) value
// g(n) is actual "cost" from beginning to the end
// h(n) is heuristics
function Spot(i, j, width, height, grid) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.width = width;
  this.height = height;

  // each spot stores info about its neighbours
  this.neighbours = [];
  this.previous = undefined;

  // walls
  this.wall = false;

  if(random(1) < 0.1) {
    this.wall = true;
  }

  // show a spot
  this.show = function(col) {
    // color setup
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke();

    // draw rectangle
    rect(this.i*this.width, this.j*this.height, this.width-1, this.height-1);
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
