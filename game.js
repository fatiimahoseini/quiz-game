const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

///////////////////////////////////////
// Quiz questions
let questions = [
  {
    question: "What country has the highest life expectancy?",
    choice1: "Japan",
    choice2: "United State",
    choice3: "Hong Kong",
    choice4: "Spain",
    answer: 3,
  },
  {
    question: "Who was the Ancient Greek God of the Sun?",
    choice1: "Zeus",
    choice2: "Apollo",
    choice3: "Athena",
    choice4: "Poseidon",
    answer: 2,
  },
  {
    question: "What year was the United Nations established?",
    choice1: "1800",
    choice2: "1789",
    choice3: "2001",
    choice4: "1945",
    answer: 4,
  },
  {
    question: "How many minutes are in a full week?",
    choice1: "11,808",
    choice2: "10,080",
    choice3: "21,723",
    choice4: "17,044",
    answer: 2,
  },
  {
    question: "How many elements are in the periodic table?",
    choice1: "118",
    choice2: "108",
    choice3: "210",
    choice4: "170",
    answer: 1,
  },
  {
    question: "Aureolin is a shade of what color?",
    choice1: "Black",
    choice2: "Pink",
    choice3: "Orange",
    choice4: "Yellow",
    answer: 4,
  },
  {
    question: "What country drinks the most coffee per capita?",
    choice1: "Finland",
    choice2: "Scotland",
    choice3: "United Kingdom",
    choice4: "Canada",
    answer: 1,
  },
  {
    question: "Which planet in the Milky Way is the hottest?",
    choice1: "Saturn",
    choice2: "Jupiter",
    choice3: "Venus",
    choice4: "Mars",
    answer: 3,
  },
  {
    question: "What is the 4th letter of the Greek alphabet?",
    choice1: "Delta",
    choice2: "gamma",
    choice3: "zeta",
    choice4: "iota",
    answer: 1,
  },
  {
    question: "What city is known as 'The Eternal City'?",
    choice1: "Athens",
    choice2: "Rome",
    choice3: "Rhodes",
    choice4: "Milan",
    answer: 2,
  },
];

///////////////////////////////////////
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
