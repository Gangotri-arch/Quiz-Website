const supabaseUrl = "https://sorwebstkjxtophrbboh.supabase.co";

const supabaseKey ="sb_publishable_Idq6skWlkQA8FAOS7a6OSg_ltUSaTrE";

const supabaseClient =
supabase.createClient(supabaseUrl, supabaseKey);
let timeTaken = 0;
let quizData = [];

let current = 0;

let score = 0;
let wrong = 0;
let attemptedQuestions = [];
/* LOAD QUESTIONS BY CATEGORY */

async function loadCategoryQuestions(category) {

  const { data, error } = await supabaseClient

    .from("questions")

    .select("*")

    .eq("category", category);

  if (error) {

    console.log(error);

    return;
  }

  quizData = data;

  current = 0;

  score = 0;

  if (quizData.length === 0) {

    document.getElementById("question").innerHTML =
      "No Questions Found";

    return;
  }

  showQuestion();
  startTimer();
}

/* SHOW QUESTION */

function showQuestion() {

  let q = quizData[current];

  document.getElementById("question").innerText =

`Question ${current + 1}: ${q.question}`;
  let box =
    document.getElementById("options");

  box.innerHTML = "";

 const options = [

  { label: "A", value: q.option_a },

  { label: "B", value: q.option_b },

  { label: "C", value: q.option_c },

  { label: "D", value: q.option_d }

];

options.forEach(item => {

    let btn =
      document.createElement("button");

  btn.innerText =
`${item.label}. ${item.value}`;

    btn.classList.add("option-btn");

    btn.onclick = () => {
      attemptedQuestions.push(current);

      const allButtons =
        document.querySelectorAll(".option-btn");

      allButtons.forEach(b => {

        b.disabled = true;
      });

      if (item.value === q.correct_answer){

        btn.classList.add("correct");

        score++;

      } else {
   wrong++;
        btn.classList.add("wrong");
        

        allButtons.forEach(b => {

          if (b.innerText.includes(q.correct_answer))
          {

            b.classList.add("correct");
          }
        });
      }

      setTimeout(() => {

        nextQuestion();

      }, 1000);
    };

    box.appendChild(btn);
  });
  let panel = document.getElementById("questionPanel");

panel.innerHTML = "";

for(let i = 0; i < quizData.length; i++) {

   let qBtn = document.createElement("button");

   qBtn.innerText = i + 1;
  if(attemptedQuestions.includes(i)){

   qBtn.style.background = "green";
}
  else{

   qBtn.style.background = "gray";
}

   qBtn.onclick = () => {

      current = i;

      showQuestion();
   };

   panel.appendChild(qBtn);
}
}

/* NEXT QUESTION */

function nextQuestion() {

  current++;

  if (current < quizData.length) {

    showQuestion();

  } else {

    document.getElementById("quizSection")
      .innerHTML = `

      <h2>Quiz Completed</h2>

<p>
  Total Questions: ${quizData.length}
</p>

<p>
  Correct Answers: ${score}
</p>

<p>
  Wrong Answers: ${wrong}
</p>

<p>
  Final Score: ${score} / ${quizData.length}
</p>

      `;
  }
}
let reviewQuestions = [];

function previousQuestion() {

  if(current > 0) {

    current--;

    showQuestion();
  }
}

function markForReview() {

  reviewQuestions.push(current);

  alert(
    `Question ${current + 1} marked for review`
  );

  nextQuestion();
}

function submitQuiz() {

  document.getElementById("quizSection")
    .innerHTML = `

    <h2>Quiz Submitted</h2>

    <p>
      Final Score:
      ${score} / ${quizData.length}
    </p>

    <p>
      Marked For Review:
      ${reviewQuestions.length}
    </p>

  `;
}

let englishQuiz = true;

function toggleQuizLanguage() {

  englishQuiz = !englishQuiz;

  alert(
    englishQuiz
    ? "English Enabled"
    : "Hindi Enabled"
  );
}
let timeLeft = 600;
let timerInterval;

function startTimer() {

  clearInterval(timerInterval);

  timeLeft = 600;
  timeTaken = 0;

  timerInterval = setInterval(() => {

    timeTaken++;

    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    document.getElementById("timer").innerText =
      `Time Left: ${min}:${sec < 10 ? "0"+sec : sec}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }

  }, 1000);
}
