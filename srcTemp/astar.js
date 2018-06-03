function AStar(map, start, end) {
  this.map = map;
  this.start = start;
  this.end = end;

  // the set of evaluated nodes
  var closedSet = [];
  // the set of discovered, but not evaluated yet notes
  var openSet = [];
  this.openSet.push(start);

  this.visualDist = function(a, b) {
    return dist(a.i, a.j, b.i, b.j);
  }

  this.heuristic = function(a, b) {
    var d = abs(a.i-b.i) + abs(a.j-b.j);
    return d;
  }

  // utility: remove element from the array
  function removeFromArray(arr, elt) {
    for(var i=arr.length-1; i>=0; i--) {
      if(arr[i] == elt) {
        arr.splice(i, 1);
      }
    }
  }

  // 0: if search ongoing
  // 1: if goal reached
  //-1: if no solution
  this.step = function() {

    if(this.openSet.length > 0) {

      // find the lowest "winner"
      var winner = 0;
      for(var i=0; i<this.openSet.length; i++) {
        if(this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }

      // --------------------------------
      //if we have a tie according to the standard heuristic
      if (this.openSet[i].f == this.openSet[winner].f) {
          //Prefer to explore options with longer known paths (closer to goal)
          if (this.openSet[i].g > this.openSet[winner].g) {
              winner = i;
          }
        }
      // --------------------------------

      var current = this.openSet[winner];

      if(current === this.end) {
        console.log("DONE!");
        return 1;
      }

      // remove evaluated node from openSet and add it to closedSet
      this.removeFromArray(openSet, current);
      this.closedSet.push(current);

      // check all the neighbours
      var neighbours = current.getNeighbours();

      for(var i=0; i<neighbours.length; i++) {
        var neighbour = neighbours[i];

        // valid next spot?
        if(!closedSet.includes(neighbour) && !neighbour.wall) {
          // is this a better path than before?
          var tempG = current.g + this.heuristic(neighbour, current);

          // is this a better path than before?
          if(!this.openSet.includes(neighbour)) {
              this.openSet.push(neighbour);
          } else if (tempG >= neighbour.g) {
            // it's not a better path
            continue;
          }

          // g: how long it takes to get there
          // h: guess how long it takes to get to the end
          // score = g + h
          neighbour.g = tempG;
          neighbour.h = this.heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;

        }

      }
      return 0;

    } else {
      console.log('no solution');
      return -1;
    }

  }
