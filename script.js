const supabaseUrl = "https://sorwebstkjxtophrbboh.supabase.co/rest/v1/";
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

  console.log(data);
}

loadQuestions();

let allQuestions = ...
let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;

/* 🔗 Google Sheet API */
fetch("https://script.google.com/macros/s/AKfycby8HXAFfJLGU9wIO7JLV7Fbv-3O--Nu3KxnK3GqmWMwXbNiOM-oxq_eOvqDp0ME11AZ/exec")
.then(res => res.json())
.then(data => {

    console.log("DATA RECEIVED:", data);

    allQuestions = data;

})
.catch(err => {
    console.log("ERROR:", err);
});

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

    [q.option1, q.option2, q.option3, q.option4].forEach(opt => {

        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option-btn";

        btn.onclick = () => checkAnswer(opt);

        box.appendChild(btn);
    });
}


/* ✅ CHECK ANSWER */
function checkAnswer(selected) {

    if (selected === quizData[current].answer) {
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
