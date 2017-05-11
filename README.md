# FiefDOM_demo
A simple implementation of the classic game of Snake using the custom DOM manipulation library FiefDOM.

[LIVE]:(http://nicholaschar.com/FiefDOM_demo/)

![](assets/images/screenshot.png)


## Game Set-up
FiefDOM's wrapper function allows us to grab the element in that DOM where we will inject the game board. In addition, we place an event listener on the `play` button, passing in callback that will generation a new iteration of the game on each click.

```js
$f(function () {
  const rootEl = $f('.snake-game');
  const setUp = new SnakeView(rootEl);

  window.clearInterval(setUp.intervalId);
  const playButton = $f('.play');

  playButton.on("click", () => {
    new SnakeView(rootEl);
  });
});
```

## Gameplay

FiefDOM's event handling functions are used to listen for `keydown` actions by the user.
```js
  $f(window).on("keydown", this.handleKeyEvent.bind(this));
```

## Game-Over Message

When the player inevitably loses (because Snake is hard!), FiefDOM's AJAX is utilized to fire off a request to Giphy to display an informative "Game Over" GIF to the user.

The request returns a Promise, which is resolved with a function that inserts the GIF into an image tag via FiefDOM's #attr method.

```js
const fetchGiphy = () => {
  let offset = Math.floor(Math.random() * 100);
  return $f.ajax({
    method: 'GET',
    url:`http://api.giphy.com/v1/gifs/search?q=game+over&api_key=dc6zaTOxFJmzC&limit=1&offset=${offset}`
  });
}

fetchGiphy().then((res) => {
  $f('#game-over').attr("src", res.data[0].images.downsized.url)
  modal.style.display = "block";
});
```
