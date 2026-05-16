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

      const allButtons =
        document.querySelectorAll(".option-btn");

      allButtons.forEach(b => {

        b.disabled = true;
      });

      if (item.value === q.correct_answer){

        btn.classList.add("correct");

        score++;

      } else {

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
