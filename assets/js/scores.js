function printHighscores() {
    // either get scores from localstorage or set to empty array
    var scores = JSON.parse(window.localStorage.getItem('scores')) || [];
  
    // sort highscores in descending order in array
    scores.sort(function (x, y) {
      return y.score-x.score;
    });
  
    // create html li tag for each high score and then display them 
    for (var i = 0; i < scores.length; i += 1) {
      var li = document.createElement('li');
      li.textContent = scores[i].initials+ ' - ' +scores[i].score;
  
  
      var olEl = document.getElementById('high-scores');
      olEl.appendChild(li);
    }
  }


  // function to clear current high scores when user clicks the appropriate button and reload the page after
  function clearHighscores() {
    window.localStorage.removeItem('scores');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  
  
  printHighscores();