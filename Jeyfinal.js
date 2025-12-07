const quizData = [
    // YOUR ORIGINAL 5 JS QUESTIONS (UNCHANGED)
    {
        question: "1. Which symbol is used to end a JavaScript statement (optional but common)?",
        options: ["A. :", "B. ,", "C. ;", "D. ."],
        correct: 2
    },
    {
        question: "2. How do you write a comment in JavaScript?",
        options: ["A. # comment", "B. // comment", "C. Comment", "D. ** comment **"],
        correct: 1
    },
    {
        question: "3. Which keyword declares a variable?",
        options: ["A. set", "B. var", "C. make", "D. new"],
        correct: 1
    },
    {
        question: "4. How do you create an array in JavaScript?",
        options: ["A. {1, 2, 3}", "B. (1, 2, 3)", "C. [1, 2, 3]", "D. <1 2 3>"],
        correct: 2
    },
    {
        question: "5. What does = do in JavaScript?",
        options: ["A. Compares two values", "B. Adds numbers", "C. Ends a function", "D. Assigns a value"],
        correct: 3
    },
    // 🔥 5 NEW QUESTIONS (HTML/CSS/JS mix) [web:38]
    {
        question: "6. Which HTML tag creates a paragraph?",
        options: ["A. < text >", "B. < p >", "C. < paragraph >", "D. < para >"],
        correct: 1
    },
    {
        question: "7. How do you center text in CSS?",
        options: ["A. text-align: center", "B. align: center", "C. center-text", "D. horizontal: center"],
        correct: 0
    },
    {
        question: "8. How to select element by ID in JavaScript?",
        options: ["A. getElementById()", "B. querySelector()", "C. getId()", "D. selectId()"],
        correct: 0
    },
    {
        question: "9. Which HTML tag creates hyperlinks?",
        options: ["A. < link >", "B. < a >", "C. < url >", "D. < href >"],
        correct: 1
    },
    {
        question: "10. What CSS property changes background color?",
        options: ["A. color", "B. background-color", "C. bg-color", "D. background"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

const quizBody = document.getElementById('quizBody');
const progress = document.getElementById('progress');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');

totalQuestionsEl.textContent = quizData.length;

function showQuestion() {
    const q = quizData[currentQuestion];
    const userAnswer = answers[currentQuestion];

    let html = `
        <div class="question">${q.question}</div>
        <div class="options">`;

    q.options.forEach((option, index) => {
        let classes = 'option';
        if (userAnswer === index) classes += ' selected';
        if (currentQuestion === quizData.length - 1 && index === q.correct) classes += ' correct';
        html += `<div class="${classes}" onclick="selectAnswer(${index})">${option}</div>`;
    });

    html += `
        </div>
        <div class="controls">
            ${currentQuestion > 0 ? `<button class="btn-prev" onclick="previousQuestion()">Previous</button>` : ''}
            <button class="btn-next" onclick="nextQuestion()" id="nextBtn">
                ${currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>`;

    quizBody.innerHTML = html;
    updateProgress();
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    showQuestion();
}

function nextQuestion() {
    if (answers[currentQuestion] === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    currentQuestion--;
    showQuestion();
}

function updateProgress() {
    const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
    progress.style.width = progressPercent + '%';
    currentQuestionEl.textContent = currentQuestion + 1;
}

function showResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    let scoreClass = 'poor';
    if (percentage === 100) scoreClass = 'perfect';
    else if (percentage >= 70) scoreClass = 'good';

    quizBody.innerHTML = `
        <div class="results">
            <div class="score ${scoreClass}">${score} / ${quizData.length}</div>
            <div style="font-size: 20px; color: #666; margin-bottom: 30px;">
                ${percentage}% - ${percentage >= 70 ? 'Great job!' : percentage >= 50 ? 'Not bad!' : 'Try again!'}
            </div>
            <button class="restart-btn" onclick="restartQuiz()">Take Quiz Again</button>
        </div>`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    showQuestion();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', showQuestion);
