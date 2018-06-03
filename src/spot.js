function Spot(i, j, width, height, grid) {

  // position
  this.i = i;
  this.j = j;
  this.width = width;
  this.height = height;

  // f(n) = g(n) + h(n)
  //  - g(n): the cost of the path from the start node to n
  //  - h(n): heuristics (cheapest path from n to the goal)
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // each spot stores info about its neighbours
  this.neighbours = [];
  this.previous = undefined;

  // is this spot a wall?
  this.wall = false;

  // create a wall
  if (random(1) < 0.1) {
    this.wall = true;
  }

  // find the spot's neighbours
  this.addNeighbours = function(grid) {
    var i = this.i;
    var j = this.j;

    // top-right
    if ((i < cols - 1) && (j > 1)) {
      this.neighbours.push(grid[i + 1][j - 2]);
    }
    if ((i < cols - 2) && (j > 0)) {
      this.neighbours.push(grid[i + 2][j - 1]);
    }

    // top-left
    if ((i > 0) && (j > 1)) {
      this.neighbours.push(grid[i - 1][j - 2]);
    }
    if ((i > 1) && (j > 0)) {
      this.neighbours.push(grid[i - 2][j - 1]);
    }

    // bottom-right
    if ((i < cols - 1) && (j < rows - 2)) {
      this.neighbours.push(grid[i + 1][j + 2]);
    }
    if ((i < cols - 2) && (j < rows - 1)) {
      this.neighbours.push(grid[i + 2][j + 1]);
    }

    // bottom-left
    if ((i > 0) && (j < rows - 2)) {
      this.neighbours.push(grid[i - 1][j + 2]);
    }
    if ((i > 1) && (j < rows - 1)) {
      this.neighbours.push(grid[i - 2][j + 1]);
    }
  }

  // display a spot
  this.show = function(color) {
    // color setup
    fill(color);
    noStroke();

    // walls are black
    if (this.wall) {
      fill(0);
    }

    // draw rectangle
    rect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
  }
}
