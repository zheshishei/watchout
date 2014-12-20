// start slingin' some d3 here.

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(32," + (height / 2) + ")");


  // DATA JOIN
  // Join new data with old elements, if any.
  //Create enemy node generator

  //create function to instantiate new game boards
  var Board = function(width, height, numHeroes, numEnemies) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = d3.select('body').append('svg')
      .attr('class', 'board')
      .attr('width', width)
      .attr('height', height);
    this.hero = this.makeHeroes(numHeroes);
    this.enemies = this.makeEnemies(numEnemies);
  }

  Board.prototype.makeEnemies = function(numEnemies) {
    var data = [];
    for (var i = 0; i < numEnemies; i++) {
      data[i] = 'e' + i;
    }

    return this.board.selectAll('image')
      .data(data, function(d) { return d; })
      .enter()
      .append('image')
      .attr('class', 'enemy')
      .attr('xlink:href', 'fred.jpeg')
      .attr('width', 50).attr('height', 50)
      .attr('x', function() {return Math.random() * this.boardWidth}.bind(this))
      .attr('y', function() {return Math.random() * this.boardHeight}.bind(this));
  }

  Board.prototype.makeHeroes = function(numHeroes) {
    var data = [];
    for (var i = 0; i < numHeroes; i++) {
      data[i] = 'h' + i;
    }

    var radius = 12.5;
    var width = this.boardWidth, height = this.boardHeight;
    // var drag = d3.behavior.drag()
    // // .origin(function(d) { return d; })
    // .on("drag", dragmove);

    return this.board.selectAll('image')
      .data(data, function(d) { return d; })
      .enter()
      .append('image')
      .attr('class', 'hero')
      .attr('xlink:href', 'asteroid.png')
      .attr('width', radius * 2).attr('height', radius * 2)
      .attr('x', this.boardWidth / 2)
      .attr('y', this.boardHeight / 2)
  };
 //     .call(drag);

  //   function dragmove(d) {
  //     console.log('called');
  //     // debugger;
  //     d3.select(this)
  //     .attr("x", Math.max(radius, Math.min(width - radius, d3.event.x)))
  //     .attr("y", Math.max(radius, Math.min(height - radius, d3.event.y)));
  //   }
  // };

Board.prototype.setDrag = function() {
  var heroElem = document.body.getElementsByClassName("hero")[0];
  heroElem.onmousedown = function(event) {
    console.log(event);
    this.hero.attr("x", event.offsetX).attr("y", event.offsetY);
  }.bind(this);
};

Board.prototype.step = function () {
  setInterval(function(){
    this.enemies.transition()
      .duration(750)
      .attr('x', function() {return Math.random() * this.boardWidth}.bind(this))
      .attr('y', function() {return Math.random() * this.boardHeight}.bind(this));
  }.bind(this), 1000)
};

// function update(data) {
//   // UPDATE
//   // Update old elements as needed.
//   text.attr("class", "update")
//     .transition()
//       .duration(750)
//       .attr("x", function(d, i) { return i * 32; });

//   // ENTER
//   // Create new elements as needed.
//   text.enter().append("text")
//       .attr("class", "enter")
//       .attr("dy", ".35em")
//       .attr("y", -60)
//       .attr("x", function(d, i) { return i * 32; })
//       .style("fill-opacity", 1e-6)
//       .text(function(d) { return d; })
//     .transition()
//       .duration(750)
//       .attr("y", 0)
//       .style("fill-opacity", 1);

//   // EXIT
//   // Remove old elements as needed.
//   text.exit()
//       .attr("class", "exit")
//     .transition()
//       .duration(750)
//       .attr("y", 60)
//       .style("fill-opacity", 1e-6)
//       .remove();
// }

// // The initial display.
// update(alphabet);

// // Grab a random sample of letters from the alphabet, in alphabetical order.
// setInterval(function() {
//   update(shuffle(alphabet)
//       .slice(0, Math.floor(Math.random() * 26))
//       .sort());
// }, 1500);

// // Shuffles the input array.
// function shuffle(array) {
//   var m = array.length, t, i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     t = array[m], array[m] = array[i], array[i] = t;
//   }
//   return array;
// }

var game = new Board(600,600,1,10);
game.setDrag();
game.step();
