const quizData = [
  {
    question: "1年（平年）は何日ですか？",
    options: ["360日", "365日", "366日", "300日"],
    correctIndex: 1,
  },
  {
    question: "日本の首都はどこですか？",
    options: ["大阪", "京都", "名古屋", "東京"],
    correctIndex: 3,
  },
  {
    question: "水は何度で氷になりますか？",
    options: ["0度", "10度", "-10度", "100度"],
    correctIndex: 0,
  },
  {
    question: "1週間は何日ですか？",
    options: ["5日", "6日", "7日", "8日"],
    correctIndex: 2,
  },
  {
    question: "人間の心臓は体のどの部分にありますか？",
    options: ["頭", "胸", "お腹", "背中"],
    correctIndex: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

const progressEl = document.getElementById("progress");
const questionTextEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const resultTextEl = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

function renderQuestion() {
  isAnswered = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;

  const current = quizData[currentQuestionIndex];
  progressEl.textContent = `第${currentQuestionIndex + 1}問 / 全${quizData.length}問`;
  questionTextEl.textContent = current.question;

  optionsEl.innerHTML = "";
  current.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = optionText;
    button.addEventListener("click", () => handleAnswer(index, button));
    optionsEl.appendChild(button);
  });
}

function handleAnswer(selectedIndex, selectedButton) {
  if (isAnswered) return;
  isAnswered = true;

  const current = quizData[currentQuestionIndex];
  const optionButtons = optionsEl.querySelectorAll(".option-btn");
  optionButtons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === current.correctIndex) {
    score++;
    selectedButton.classList.add("correct");
    feedbackEl.textContent = "正解です！";
    feedbackEl.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
    optionButtons[current.correctIndex].classList.add("correct");
    feedbackEl.textContent = `不正解です。正解は「${current.options[current.correctIndex]}」です。`;
    feedbackEl.classList.add("incorrect");
  }

  nextBtn.hidden = false;
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionScreen.hidden = true;
  resultScreen.hidden = false;
  resultTextEl.textContent = `結果：${quizData.length}問中${score}問正解でした！`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  questionScreen.hidden = false;
  renderQuestion();
}

nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
