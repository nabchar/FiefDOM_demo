const openModal = () => {
    // Get the modal
  let modal = document.getElementById('myModal');

  const fetchGiphy = () => {
    let offset = Math.floor(Math.random() * 100);
    return $f.ajax({
      method: 'GET',
      url:`http://api.giphy.com/v1/gifs/search?q=game+over&api_key=dc6zaTOxFJmzC&limit=1&offset=${offset}`
    });
  }

  fetchGiphy().then((res) => {
    debugger
    $f('#game-over').attr("src", res.data[0].images.downsized.url)
    modal.style.display = "block";
  })

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
};

module.exports = openModal;
