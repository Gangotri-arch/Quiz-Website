const supabaseUrl = "https://sorwebstkjxtophrbboh.supabase.co";
const supabaseKey = "sb_publishable_Idq6skWlkQA8FAOS7a6OSg_ltUSaTrE";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

/* ---------------- VARIABLES ---------------- */
let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;

/* ---------------- LOAD QUESTIONS ---------------- */
async function loadQuestions() {
  const { data, error } = await supabaseClient
    .from("questions")
    .select("*");

  if (error) {
    console.log("Error:", error);
    return;
  }

  console.log("SUPABASE DATA:", data);

  allQuestions = data || [];

  // auto start quiz after data loads
  startQuiz("GK");
}

loadQuestions();

/* ---------------- START QUIZ ---------------- */
function startQuiz(subject) {

  quizData = allQuestions.filter(q =>
    q.category && q.category.trim() === subject
  );

  current = 0;
  score = 0;

  console.log("Quiz Data:", quizData);

  if (quizData.length === 0) {
    alert("No questions found for this category!");
    return;
  }

  showQuestion();
}

/* ---------------- SHOW QUESTION ---------------- */
function showQuestion() {

  let q = quizData[current];

  document.getElementById("question").innerText = q.question;

  let box = document.getElementById("options");
  box.innerHTML = "";

  [q.option_a, q.option_b, q.option_c, q.option_d].forEach(opt => {

    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";

    btn.onclick = () => checkAnswer(opt);

    box.appendChild(btn);
  });
}

/* ---------------- CHECK ANSWER ---------------- */
function checkAnswer(selected) {

  if (selected === quizData[current].correct_answer) {
    score++;
  }

  nextQuestion();
}

/* ---------------- NEXT QUESTION ---------------- */
function nextQuestion() {

  current++;

  if (current < quizData.length) {
    showQuestion();
  } else {

    document.getElementById("quizSection").innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} / ${quizData.length}</p>
    `;
  }
}
