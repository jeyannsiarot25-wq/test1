const quizData = [
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
let musicOn = false;
let soundOn = true;

const quizBody = document.getElementById('quizBody');
const progress = document.getElementById('progress');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');

totalQuestionsEl.textContent = quizData.length;

// === AUDIO SYSTEM ===
document.addEventListener('DOMContentLoaded', function() {
    const musicBtn = document.getElementById('musicBtn');
    const soundBtn = document.getElementById('soundBtn');
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    
    bgMusic.volume = 0.2;
    clickSound.volume = 0.6;
    
    musicBtn.addEventListener('click', () => {
        musicOn = !musicOn;
        if (musicOn) {
            bgMusic.play().catch(() => {});
            musicBtn.textContent = '🎵 Music ON';
            musicBtn.classList.add('active');
        } else {
            bgMusic.pause();
            musicBtn.textContent = '🎵 Music';
            musicBtn.classList.remove('active');
        }
    });
    
    soundBtn.addEventListener('click', () => {
        soundOn = !soundOn;
        soundBtn.textContent = `🔊 Sound: ${soundOn ? 'ON' : 'OFF'}`;
        soundBtn.classList.toggle('active', soundOn);
    });
    
    window.playSound = function() {
        if (soundOn && clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    };
    
    showQuestion();
});

function showQuestion() {
    const q = quizData[currentQuestion];
    const userAnswer = answers[currentQuestion];

    let html = `
        <div class="question">${q.question}</div>
        <div class="options">`;

    q.options.forEach((option, index) => {
        let classes = 'option';
        let label = '';
        
        if (userAnswer !== undefined) {
            if (index === userAnswer) {
                if (index === q.correct) {
                    classes += ' correct';
                    label = ' <strong style="color: green;">(Correct)</strong>';
                } else {
                    classes += ' wrong';
                    label = ' <strong style="color: red;">(Wrong)</strong>';
                }
            } else if (index === q.correct) {
                classes += ' correct';
                label = ' <strong style="color: green;">(Correct)</strong>';
            }
        }
        
        html += `<div class="${classes}" onclick="selectAnswer(${index});playSound()">${option}${label}</div>`;
    });

    html += `
        </div>
        <div class="controls">
            ${currentQuestion > 0 ? `<button class="btn-prev" onclick="previousQuestion();playSound()">Previous</button>` : ''}
            <button class="btn-next" onclick="nextQuestion();playSound()" id="nextBtn">
                ${currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>`;

    quizBody.innerHTML = html;
    updateProgress();
}

function selectAnswer(index) {
    // Only allow answer selection if not already answered
    if (answers[currentQuestion] === undefined) {
        answers[currentQuestion] = index;
        showQuestion();
        playSound();
    }
}

function nextQuestion() {
    if (answers[currentQuestion] !== undefined && answers[currentQuestion] === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
    playSound();
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
    let message = '';
    
    if (percentage === 100) {
        scoreClass = 'perfect';
        message = '<div class="congratulations">🎉 CONGRATULATIONS! PERFECT SCORE! 🏆</div>';
    } else if (percentage >= 80) {
        scoreClass = 'perfect';
        message = '<div class="congratulations">🎉 EXCELLENT! High Score Achieved! 🏆</div>';
    } else if (percentage >= 70) {
        scoreClass = 'good';
        message = 'Great job!';
    } else if (percentage >= 50) {
        message = 'Not bad!';
    } else {
        message = 'Try again!';
    }

    quizBody.innerHTML = `
        <div class="results">
            <div class="score ${scoreClass}">${score} / ${quizData.length}</div>
            <div style="font-size: 20px; color: #666; margin-bottom: 30px;">
                ${message}
                <div style="font-size: 18px; margin-top: 10px;">${percentage}%</div>
            </div>
            <button class="restart-btn" onclick="restartQuiz();playSound()">Take Quiz Again</button>
        </div>`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    showQuestion();
}