// Identify the  global variables
var countdownTimer
var countdownValue
var questionNumber
var correctAnswer = 0;
var playName
var arrayTest = [];

// Establish all questions in the quiz 
var questions = [
  {
    question: "What does an Array do?",
    answers: ["Stores multiple values in a variable ", "does math functions", "prints money"],
    correct: "Stores multiple values in a variable "
  },

  {
    question: "What does object do",
    answers: ["a collection of properties that have value", "gives money back to you", "gives you peace"],
    correct: "a collection of properties that have value"
  },

  {
    question: "What exactly is Javascript",
    answers: ["it is a scripting lanugage allows you to implement web pages", "helps you train martial arts", "shoot basketballs"],
    correct: "it is a scripting lanugage allows you to implement web pages"
  }
]

// to ensure value is entered for player name 
function validateForm() {
  var x = document.getElementById("playerNameBox").value
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

// To go from one question to the next 
function showNextQuestion() {
  var question = questions[questionNumber]
  var questionEl = document.querySelector('#questionBox')

  // display question
  questionEl.innerHTML = `
  <div class="alert alert-warning"><h3>${question.question}</h3>
  `
  // loop through and show each answer as a button
  for (var i = 0; i < question.answers.length; i++) {
    var answer = question.answers[i]
    questionEl.innerHTML += `
  <button onClick="selectAnswer(event,'${answer}')" class="btn btn-secondary btn-block">${answer}</button>
  `
  }
}

function selectAnswer(event, answer) {
  event.preventDefault()
  console.log(`question answer id: ${answer}`)
  if (answer === questions[questionNumber].correct) {
    console.log(`good job! correct answer: ${answer}`)
    correctAnswer++;
  } else {
    console.log(`sorry, you lose, -10`)
    timerDecreaseAndDisplay(10)
  }
  questionNumber++
  // decide to show next question (if more), else end quiz
  if (questionNumber < questions.length)
    showNextQuestion()
  else
    finishQuiz()
}


function timerDecreaseAndDisplay(byValue = 1) {
  // decrease by the value passed in, or if nothing, by 1
  countdownValue -= byValue && countdownValue > 0
  document.querySelector('#countdown').textContent = countdownValue
  if (countdownValue < 1)
    finishQuiz()
}

function showPage(page) {
  // hide all pages
  document.querySelector('#quizPage').classList.add('d-none')
  document.querySelector('#scorePage').classList.add('d-none')
  // show selected page
  document.querySelector(`#${page}`).classList.remove('d-none')
}

// When quiz is done 
function finishQuiz(event) {
  if (event) event.preventDefault()
  console.log(`finished`)
  // stop the countdown
  clearInterval(countdownTimer)
  // show score page
  showPage('scorePage')


}




// display the name capture + leaderboard
function showResults(event) {
  event.preventDefault()
  var result = correctAnswer
  console.log('You got ' + result + ' right!')
  document.getElementById('userName').value = (playName + ' got ' + result + ' right!')
  if (localStorage.getItem('arrayTest')){

  var userName = document.getElementById('playerNameBox').value
  var retrievedObject = localStorage.getItem('arrayTest');
  arrayTest = JSON.parse(retrievedObject)
  }
  arrayTest.push({ 'quiz': { 'name': `${userName}`, 'score': `${correctAnswer}` } });
  localStorage.setItem('arrayTest', JSON.stringify(arrayTest));

retrievedObject = localStorage.getItem('arrayTest');
 while (document.getElementById ('scoreDelete')){
   document.getElementById('scoreDelete').remove()
 }
  for (var t = 0; t < JSON.parse(retrievedObject).length; t++) {
    var theName = JSON.parse(retrievedObject)[t].quiz.name;
    var theScore = JSON.parse(retrievedObject)[t].quiz.score;
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.setAttribute('id', 'scoreDelete')
    li.textContent = `${theName}  : ${theScore} pts`
    document.getElementById('scoreList').appendChild(li)

  }
}

// to keep old Scores 
function startingOverAgain() {

if (document.getElementById('listid')) {

}

else {
if (localStorage.getItem("arrayTest")) {

    var retrievedObject = localStorage.getItem('arrayTest');
    var jason = JSON.parse(retrievedObject)



    for (var i = 0; i < jason.length; i++) {
        var score = jason[i].quiz.score;
        var name = jason[i].quiz.name;

        const li = document.createElement('li')
        li.setAttribute('class', 'list-group-item')
        li.setAttribute('id', 'scoreDelete')
        li.textContent = `${name}  : ${score} pts`
        document.getElementById('scoreList').appendChild(li);
    }
}
}
}
startingOverAgain()
// START: 
// - start timer
// - show questions
function startQuiz() {
  playName = document.querySelector('#playerNameBox').value
  questionNumber = 0
  countdownValue = 60
  countdownTimer = setInterval(timerDecreaseAndDisplay, 1000)
  // switch back to the quizPage
  showPage('quizPage')
  showNextQuestion()
}