
function startTimer(duration, display) {
  var start = Date.now(),
    diff,
    minutes,
    seconds;
  function timer() {
    diff = duration - (((Date.now() - start) / 1000) | 0);
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (diff <= 0) {
      start = Date.now() + 1000;
    }

  };
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');

  const myQuestions = [
    {
      question: "What is your name?",
      answers: {
        a: "Merry",
        b: "Tim?",
        c: "Kris",
        d: "Arthur, King of the Britons"
      },
      correctAnswer: "d"
    },
    {
      question: "What is your quest?",
      answers: {
        a: "to find peace",
        b: "a healthy protein bar",
        c: "I seek the Grail.",
        d: "to avenge my father"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the airspeed velocity of an unladen swallow?",
      answers: {
        a: "African or European?",
        b: "What? I don't know that",
        c: "seven knots",
        d: "65 km/hr"
      },
      correctAnswer: "a"
    },
    {
      question: "What is your favorite color?",
      answers: {
        a: "Blue",
        b: "Yellow",
        c: "all of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the capitol of Assyria?",
      answers: {
        a: "Raleigh",
        b: "Assur",
        c: "A",
        d: "Syria"
      },
      correctAnswer: "c"
    }
  ]

  buildQuiz();

  // SUBMIT QUIZ
  submitButton.addEventListener('click', showResults);
  function buildQuiz() {
    const output = [];
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        output.push(
          `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
        );

      }
    );

    quizContainer.innerHTML = output.join('');
  }
  // GET RESULTS
  function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question' + questionNumber + ']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // IF ANSWER IS CORRECT
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // ANSWERS=GREEN
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // IF ANSWER IS INCORRECT
      else {
        // ANSWERS=RED
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    const highScoreStorage= document.getElementById('initials');
    // CORRECT/TOTAL
    resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;


    //////-----STORE HIGH SCORE------//////
    highScoreStorage.innerHTML = 'Please enter your initials to store your score: <form id="highScore"> <input id= "userInitials" type="text" name="initials" placeholder=" ex. MM "><input type="submit" value="Store Score"></form>';
    document.getElementById("highScore").onsubmit =function storeInitials() {
      event.preventDefault();
      var userInitials = document.getElementById("userInitials")
      localStorage.setItem("initials", userInitials.value)
      localStorage.setItem("score", numCorrect);
      var scoreStorage = localStorage.getItem('score');
      var initialStorage = localStorage.getItem('initials');
      highScoreStorage.innerHTML = 'Thank you! Your score has been stored.';
      highScoreStorage.innerHTML="User: " + initialStorage + "  Number Correct: " + scoreStorage + "/5";
      console.log(scoreStorage);
      console.log(initialStorage);
    }
  }


  //////------PAGINATION-----//////

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }
  showSlide(0);
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);


  timer();
  setInterval(timer, 1000);
}


window.onload = function (timeLeft) {
  var timeLeft = 15 * 5,
    display = document.querySelector('#time');
  startTimer(timeLeft, display);
};


