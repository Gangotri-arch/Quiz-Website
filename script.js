const supabaseUrl = "https://sorwebstkjxtophrbboh.supabase.co";
const supabaseKey = "sb_publishable_Idq6skWlkQA8FAOS7a6OSg_ltUSaTrE";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function loadQuestions() {
  const { data, error } = await supabaseClient
    .from("questions")
    .select("*");

  if (error) {
    console.log("Error:", error);
    return;
  }

  console.log("SUPABASE DATA:", data);

  allQuestions = data;
}

loadQuestions();

let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;

/* 🎮 OPEN QUIZ */
function openQuiz() {
    document.getElementById("quizSection").style.display = "block";

    setTimeout(() => {
        if (allQuestions.length > 0) {
            startQuiz(allQuestions[0].subject);
        } else {
            alert("Data not loaded yet, please refresh");
        }
    }, 500);
}


/* 🎯 START QUIZ (BY SUBJECT) */
function startQuiz(subject) {
    function waitForDataAndStart(subject) {

    let check = setInterval(() => {

        if (allQuestions.length > 0) {

            clearInterval(check);
            startQuiz(subject);

        } else {
            console.log("⏳ Waiting for data...");
        }

    }, 300);
}

    console.log("🎯 Subject Selected:", subject);

  quizData = allQuestions;

    current = 0;
    score = 0;

    console.log("🧠 Filtered Questions:", quizData);

    if (quizData.length === 0) {
        alert("No questions found for this subject!");
        return;
    }

    showQuestion();
}


/* ❓ SHOW QUESTION */
function showQuestion() {

    let q = quizData[current];

    if (!q) {
        console.log("❌ No question found");
        return;
    }

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


/* ✅ CHECK ANSWER */
function checkAnswer(selected) {

    if (selected === quizData[current].correct_answer) {
        score++;
    }
}


/* 🔁 NEXT QUESTION */
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
