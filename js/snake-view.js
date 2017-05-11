import openModal from './modal';
const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(20);
    this.setupGrid();

    this.score = $f('.score');

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_INTERVAL
    );

    $f(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  render() {
    let score = Math.floor(this.board.snake.segments.length / 3);
    this.score.html(score);

    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  updateClasses(coords, className) {
    let els = $f(`.${className}`);
    els.removeClass(`${className}`);

    coords.forEach( coord => {
      const flatCoord = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(flatCoord).addClass(className);
    });
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {

      openModal();
      window.clearInterval(this.intervalId);
    }
  }
}

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

View.STEP_INTERVAL = 100;

module.exports = View;
