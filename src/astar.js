function AStarAlgorithm (start, end) {

  this.lastCheckedNode = start;
  
  // starting & ending point
  this.start = start;
  this.end = end;

  // create open set
  this.openSet = [];
  this.openSet.push(start);

  //create closed set
  this.closedSet = [];

  this.heuristic = function (a, b) {
    //var d = dist(a.i, a.j, b.i, b.j);
    var d = abs(a.i-b.i) + abs(a.j-b.j);
    return d;
  }

  // utility: remove element from an array
  this.removeFromArray = function (arr, elt) {
    for(var i=arr.length-1; i>=0; i--) {
      if(arr[i] == elt) {
        arr.splice(i, 1);
      }
    }
  }

  // 0: if search ongoing
  // 1: if goal reached
  //-1: if no solution
  this.step = function () {

    if(this.openSet.length > 0) {

      // find the best option
      var winner = 0;
      for(var i=0; i<this.openSet.length; i++) {
        if(this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }

      var current = this.openSet[winner];
      this.lastCheckedNode = current;

      if(current === this.end) {
        console.log("DONE!");
        return 1;
      }

      // remove evaluated node from openSet and add it to closedSet
      this.removeFromArray(this.openSet, current);
      this.closedSet.push(current);

      var neighbours = current.neighbours;
      for(var i=0; i<neighbours.length; i++) {
        var neighbour = neighbours[i];

        if(!this.closedSet.includes(neighbour) && !neighbour.wall) {
          var tempG = current.g + 1;

          if(this.openSet.includes(neighbour)) {
            if(tempG < neighbour.g) {
              neighbour.g = tempG;
            }
          } else {
            neighbour.g = tempG;
            this.openSet.push(neighbour);
          }

          // g: how long it takes to get there
          // h: guess how long it takes to get to the end
          // score = g + h
          neighbour.h = this.heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
    }
  }
  return 0;
} else {
  console.log("no solution!");
  return -1;
}

}
}
