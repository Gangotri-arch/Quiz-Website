let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;

// 🔗 Google Sheet API
fetch("https://script.google.com/macros/s/AKfycby8HXAFfJLGU9wIO7JLV7Fbv-3O--Nu3KxnK3GqmWMwXbNiOM-oxq_eOvqDp0ME11AZ/exec")
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
  });

// 🎯 Start quiz
function startQuiz(subject) {
  quizData = allQuestions.filter(q => q.subject === subject);

  current = 0;
  score = 0;

  showQuestion();
}

// ❓ Show question
function showQuestion() {
  let q = quizData[current];

  document.getElementById("question").innerText = q.question;

  let box = document.getElementById("options");
  box.innerHTML = "";

  [q.option1, q.option2, q.option3, q.option4].forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    box.appendChild(btn);
  });
}

// ✅ Check answer
function checkAnswer(selected) {
  if (selected === quizData[current].answer) {
    score++;
  }
}

// 🔁 Next question
function nextQuestion() {
  current++;

  if (current < quizData.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").innerHTML =
      `Quiz Completed! Score: ${score}/${quizData.length}`;
  }
}
