// Quiz data
const questions = [
    {
        question: "What is the result of '5' + 3?",
        options: ["53", "8", "NaN", "Error"],
        answer: "53",
    },
    {
        question: "What does `typeof null` return?",
        options: ["null", "object", "undefined", "boolean"],
        answer: "object",
    },
    {
        question: "What is the result of 10 % 3?",
        options: ["0", "1", "3", "NaN"],
        answer: "1",
    },
    {
        question: "What is the output of ++x when x = 5?",
        options: ["5", "6", "undefined", "Error"],
        answer: "6",
    },
    {
        question: "What is the value of 2 + true?",
        options: ["3", "2true", "NaN", "Error"],
        answer: "3",
    },
];

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let participantName = "";

// DOM elements
const welcomePage = document.getElementById("welcome-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");

const participantGreeting = document.getElementById("participant-greeting");
const questionTracker = document.getElementById("question-tracker");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback");

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const retryButton = document.getElementById("retry-btn");

// Functions
function startQuiz() {
    const nameInput = document.getElementById("participant-name");
    participantName = nameInput.value.trim();

    if (!participantName) {
        alert("Please enter your name to start the quiz.");
        return;
    }

    welcomePage.style.display = "none";
    quizPage.style.display = "block";
    participantGreeting.textContent = `Hello, ${participantName}!`;
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    // Update question tracker
    questionTracker.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Create buttons for options
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    feedbackContainer.textContent = "";
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
        feedbackContainer.textContent = "🎉 Correct!";
        score++;
    } else {
        feedbackContainer.textContent = `❌ Incorrect! The correct answer was: ${currentQuestion.answer}`;
    }

    nextButton.style.display = "block";

    // Disable all option buttons
    const optionButtons = optionsContainer.querySelectorAll("button");
    optionButtons.forEach((button) => (button.disabled = true));
}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = "none";
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizPage.style.display = "none";
    resultPage.style.display = "block";

    const finalScore = document.getElementById("final-score");
    const finalMessage = document.getElementById("final-message");

    finalScore.textContent = `Your final score: ${score}/${questions.length}`;
    finalMessage.textContent =
        score === questions.length
            ? "🌟 Excellent work! You aced the quiz!"
            : score > questions.length / 2
            ? "🎉 Well done! You passed the quiz!"
            : "🙁 Better luck next time. Keep practicing!";
}

function retryQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    resultPage.style.display = "none";
    welcomePage.style.display = "block";
    document.getElementById("participant-name").value = "";
}

// Event listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
retryButton.addEventListener("click", retryQuiz);
