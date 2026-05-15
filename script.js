let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;
alert("SCRIPT LOADED");
// 🔗 Google Sheet API
fetch("https://script.google.com/macros/s/AKfycby8HXAFfJLGU9wIO7JLV7Fbv-3O--Nu3KxnK3GqmWMwXbNiOM-oxq_eOvqDp0ME11AZ/exec")
  .then(res => res.json())
  .then(data => {
    console.log("📊 DATA FROM SHEET:", data);
    allQuestions = data;
  })
  .catch(err => {
    console.log("❌ API ERROR:", err);
  });


// 🎯 START QUIZ
function startQuiz(subject) {

  console.log("🎯 Selected Subject:", subject);

  quizData = allQuestions.filter(q =>
    q.subject && q.subject.trim() === subject.trim()
  );

  current = 0;
  score = 0;

  console.log("🧠 Filtered Questions:", quizData);

  if (quizData.length === 0) {
    alert("No questions found for this subject!");
    return;
  }

  showQuestion();
}


// ❓ SHOW QUESTION
function showQuestion() {

  let q = quizData[current];

  if (!q) return;

  document.getElementById("question").innerText = q.question;

  let box = document.getElementById("options");
  box.innerHTML = "";

  [q.option1, q.option2, q.option3, q.option4].forEach(opt => {

    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";

    btn.onclick = () => checkAnswer(opt);

    box.appendChild(btn);
  });
}


// ✅ CHECK ANSWER
function checkAnswer(selected) {

  if (selected === quizData[current].answer) {
    score++;
  }
}


// 🔁 NEXT QUESTION
function nextQuestion() {

  current++;

  if (current < quizData.length) {
    showQuestion();
  } else {
    document.getElementById("quizSection").innerHTML =
      `<h2>Quiz Completed!</h2>
       <p>Your Score: ${score} / ${quizData.length}</p>`;
  }
}


// 🎮 OPEN QUIZ SECTION
function openQuiz() {
  document.getElementById("quizSection").style.display = "block";
}
