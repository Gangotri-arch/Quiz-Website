const supabaseUrl = "https://sorwebstkjxtophrbboh.supabase.co";
const supabaseKey = "sb_publishable_Idq6skWlkQA8FAOS7a6OSg_ltUSaTrE";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;

/* LOAD FROM SUPABASE */
async function loadQuestions() {
  const { data, error } = await supabaseClient
    .from("questions")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  allQuestions = data;
  console.log("DATA LOADED:", allQuestions);
}

loadQuestions();

/* START QUIZ BY CATEGORY */
function startQuiz(category) {

  quizData = allQuestions.filter(q =>
    (q.category || "").trim().toLowerCase() === category.trim().toLowerCase()
  );

  current = 0;
  score = 0;

  if (quizData.length === 0) {
    alert("No questions found for this category!");
    return;
  }

  showQuestion();
}

/* SHOW QUESTION */
function showQuestion() {

  let q = quizData[current];

  document.getElementById("question").innerText = q.question;

  let box = document.getElementById("options");
  box.innerHTML = "";

  [q.option_a, q.option_b, q.option_c, q.option_d].forEach(opt => {

    let btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      if (opt === q.correct_answer) score++;
      nextQuestion();
    };

    box.appendChild(btn);
  });
}

/* NEXT QUESTION */
function nextQuestion() {
  current++;

  if (current < quizData.length) {
    showQuestion();
  } else {
    document.getElementById("quizSection").innerHTML = `
      <h2>Quiz Completed</h2>
      <p>Score: ${score} / ${quizData.length}</p>
    `;
  }
}
