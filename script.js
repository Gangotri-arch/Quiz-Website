const supabaseUrl = "https://sorwebstkjxtophrbboh.supabase.co";

const supabaseKey ="sb_publishable_Idq6skWlkQA8FAOS7a6OSg_ltUSaTrE";

const supabaseClient =
supabase.createClient(supabaseUrl, supabaseKey);

let quizData = [];

let current = 0;

let score = 0;

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
}

/* SHOW QUESTION */

function showQuestion() {

  let q = quizData[current];

  document.getElementById("question").innerText =
    q.question;

  let box =
    document.getElementById("options");

  box.innerHTML = "";

  [
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d

  ].forEach(opt => {

    let btn =
      document.createElement("button");

    btn.innerText = opt;

    btn.onclick = () => {

      if (opt === q.correct_answer) {

        score++;
      }

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

    document.getElementById("quizSection")
      .innerHTML = `

      <h2>Quiz Completed</h2>

      <p>
        Score: ${score} / ${quizData.length}
      </p>

      `;
  }
}
