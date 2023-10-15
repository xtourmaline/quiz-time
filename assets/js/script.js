let startButtonEl = document.getElementById("startButton");
let informationEl = document.getElementById("information");
let quizEl = document.getElementById("quiz");
let endEl = document.getElementById("end");
let timerEl = document.getElementById("timer");
let questionEl = document.getElementById("question");
let choicesEl = document.getElementById("choices");
let scoreEl = document.getElementById("score");
let timeLeft = 20;
const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            "<script>",
            "<js>",
            "<javascript>",
            "<scripting>",
        ],
        correctIndex: 0
    },
    {
        question: `How do you access this in Javascript? Most SPECIFIC answer. <p id="quiz">Happy learning!</p>`,
        answers: [
            `getElement("p")`,
            `getElementByName("p")`,
            `getElementByClass("quiz")`,
            `getElementById("quiz")`,
        ],
        correctIndex: 3
    },
    {
        question: "How is a function created in JavaScript?",
        answers: [
            "def functionName():",
            "function functionName()",
            "function = functionName()",
            "function == functionName()",
        ],
        correctIndex: 1
    },
    {
        question: "How do you write an IF statement?",
        answers: [
            "if i = 10",
            "if == 10",
            "if (i = 10)",
            "if (i == 10)",
        ],
        correctIndex: 3
    },
    {
        question: "How do you declare a variable?",
        answers: [
            "vari name;",
            "v name;",
            "var name;",
            "variable name;"
        ],
        correctIndex: 2
    },
];
let currentQuestion = 0;
let score = 0;

// countdown timer, end screen pops up when timer run out
function countdown() {
    timerEl.textContent = "Time Left: " + timeLeft;

    let timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time Left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timeInterval);
            quizEl.style.display = "none";
            endEl.style.display = "block";
        }
    }, 1000);
}

// displays the questions and answer options. goes through until there are no more questions which results in the end screen to pop up.
function displayQuestion() {
    if (currentQuestion >= questions.length) {
        quizEl.style.display = "none";
    }
    else {
        for (let i = 0; i < 4; ++i) {
            let choiceEl = document.getElementById(`choice${i}`);
        
            questionEl.textContent = questions[currentQuestion].question;
            choiceEl.textContent = questions[currentQuestion].answers[i];
            
            choiceEl.onclick = function(e) {
                let correctAnswer = questions[currentQuestion].correctIndex;
        
                if (i == correctAnswer) {
                    score++;
                    scoreEl.textContent = `Score: ${score}`;
                }
                else {
                    timeLeft -= 5;
                }
        
                currentQuestion += 1;
                displayQuestion();
            };
        }
    }
}

// start button to start quiz
startButtonEl.addEventListener("click", function() {   
    informationEl.style.display = "none";
    quizEl.style.display = "block";
    scoreEl.textContent = `Score: ${score}`;
    countdown();
    displayQuestion();
});