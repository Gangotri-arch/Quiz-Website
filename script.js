let allQuestions = [];
let quizData = [];
let current = 0;
let score = 0;

/* 🔗 Google Sheet API */
fetch("https://script.google.com/macros/s/AKfycby8HXAFfJLGU9wIO7JLV7Fbv-3O--Nu3KxnK3GqmWMwXbNiOM-oxq_eOvqDp0ME11AZ/exec")
.then(res => res.json())
.then(data => {

    console.log("📊 DATA LOADED:", data);

    allQuestions = data;

})
.catch(err => {
    console.log("❌ API ERROR:", err);
});


/* 🎮 OPEN QUIZ */
function openQuiz() {

    document.getElementById("quizSection").style.display = "block";

    // auto start first subject safely
    if (allQuestions && allQuestions.length > 0) {
        startQuiz(allQuestions[0].subject);
    } else {
        console.log("⚠ Data not loaded yet");
    }
}


/* 🎯 START QUIZ (BY SUBJECT) */
function startQuiz(subject) {

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
