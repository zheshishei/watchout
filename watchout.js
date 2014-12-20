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
  //create data array for enemies
  var data = [];
  for (var i = 0; i < numEnemies; i++) {
    data[i] = {identity : 'e' + i,
              radius : 25,
              x : Math.random() * this.boardWidth,
              y : Math.random() * this.boardHeight
            };
  }

  //create enemies on the board
  return this.board.selectAll('.enemy')
    .data(data, function(d) { return d.identity; })
    .enter()
    .append('image')
    .attr('class', 'enemy')
    .attr('xlink:href', 'fred.jpeg')
    .attr('width', 50).attr('height', 50)
    .attr('x', function(d) {return d.x})
    .attr('y', function(d) {return d.y});
}

Board.prototype.makeHeroes = function(numHeroes) {
  var data = [];
  for (var i = 0; i < numHeroes; i++) {
    data[i] = {identity : 'h' + i,
              radius : 12.5,
              x : this.boardWidth / 2,
              y : this.boardHeight / 2};
  }

  var diameter = function(d) {return d.radius * 2};

  //d3.behavior.drag() returns a drag object
  //.origin() sets the d object to the element in question
  var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

  var width = this.boardWidth
  var height = this.boardHeight;
  return this.board.selectAll('.hero')
    .data(data, function(d) { return d.identity; })
    .enter()
    .append('image')
    .attr('class', 'hero')
    .attr('xlink:href', 'asteroid.png')
    .attr('width', diameter)
    .attr('height', diameter)
    .attr('x', function(d) {return d.x;})
    .attr('y', function(d) {return d.y;})
    .call(drag);

  function dragmove(d) {
    d3.select(this)
    .attr("x", d.x = Math.max(d.radius, Math.min(width - d.radius, d3.event.x)))
    .attr("y", d.y = Math.max(d.radius, Math.min(height - d.radius, d3.event.y)));
  }
};

// Board.prototype.collisionChecker = function() {
//   setInterval(function() {
//   //collision distance
//   var collisionDistance =

//   //select all enemies
//     //for each enemy check x, y



//   }   ,  10)
// };

Board.prototype.step = function () {
  setInterval(function(){
    this.enemies.transition()
      .duration(1500)
      .attr('x', function() {return Math.random() * this.boardWidth}.bind(this))
      .attr('y', function() {return Math.random() * this.boardHeight}.bind(this));
    console.log(game.enemies);
  }.bind(this), 1000)
};



var game = new Board(600,600,1,5);
console.log(game.enemies);
game.step();
