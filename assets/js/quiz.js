// current question.
var current = 0;
var time = 15*questions.length;
var timer;

var timerEl = document.getElementById('time');
var startBtn = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');
var submitBtn = document.getElementById('submit');
var resultsEl = document.getElementById('right-wrong');

function startQuiz() {
  // hide start page
  var startScreenEl = document.getElementById('start-page');
  startScreenEl.setAttribute('class', 'hide');

  // show question section by removing hide class attached to it. it's the only class attached to it so don't need to specify which class
  questionsEl.removeAttribute('class');

  // start timer
  timer = setInterval(clock, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question from questions array in question.js
  var currentQuestion = questions[current];

  // update on index.html
  var questionEl = document.getElementById('question');
  questionEl.textContent = currentQuestion.title;

  // clear out previous choices
  choicesEl.innerHTML = '';

  // create choices for current question and display them
  for (var i=0; i<currentQuestion.choices.length; i++) {
  
    var choice = currentQuestion.choices[i];
    var choiceCurrent = document.createElement('button');
    choiceCurrent.setAttribute('class', 'choice');
    choiceCurrent.setAttribute('value', choice);
    choiceCurrent.textContent = i+1 + '. ' +choice;
    choicesEl.appendChild(choiceCurrent);
  }
}

function answerClick(event) {
  var buttonEl = event.target;

  // if none of the choices are clicked, do nothing
  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== questions[current].answer) {
    time -= 10;
    
    // reset time to 0 if the penalty put it below 0
    if (time < 0) time = 0;

    // display new time on page
    timerEl.textContent = time;
    resultsEl.textContent = 'Wrong!';
  }
    //user guessed right
    else resultsEl.textContent = 'Correct!';


  // show correct or wrong on page
  resultsEl.setAttribute('class', 'right-wrong');
  setTimeout(function () { resultsEl.setAttribute('class', 'right-wrong hide'); }, 1000);

  // next question
  current++;

  // check time and if any questions are left
  if (time <= 0 || current === questions.length) quizOver();
  else getQuestion();
  
}

function quizOver() {
  // stop timer
  clearInterval(timer);

  // hide questions section
  questionsEl.setAttribute('class', 'hide');

  // remove hide class from end-page
  var endPageEl = document.getElementById('end-page');
  endPageEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time; 
}

// have timer update on during quiz
function clock() {
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) quizEnd();
}

function saveScore() {
  // get value of input
  var initials = initialsEl.value;

  // make sure value wasn't empty
  if (initials !== '') {
    // get scores from localstorage, or set to empty array
    var scores = JSON.parse(window.localStorage.getItem('scores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save score
    scores.push(newScore);
    window.localStorage.setItem('scores', JSON.stringify(scores));

    // redirect to scores.html
    window.location.href = 'scores.html';
  }
}

// user clicks
startBtn.onclick = startQuiz;
choicesEl.onclick = answerClick;
submitBtn.onclick = saveScore;
