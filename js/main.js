const SnakeView = require('./snake-view');

$f(function () {
  const rootEl = $f('.snake-game');
  const setUp = new SnakeView(rootEl);

  window.clearInterval(setUp.intervalId);
  const playButton = $f('.play');

  playButton.on("click", () => {
    new SnakeView(rootEl);
  });
});
