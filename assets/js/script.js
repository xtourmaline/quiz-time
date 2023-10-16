let startButtonEl = document.getElementById("startButton");
let informationEl = document.getElementById("information");
let quizEl = document.getElementById("quiz");
let endEl = document.getElementById("end");
let timerEl = document.getElementById("timer");
let questionEl = document.getElementById("question");
let choicesEl = document.getElementById("choices");
let scoreEl = document.getElementById("score");
let finalScoreEl = document.getElementById("finalScore");
let playerEl = document.getElementById("initials");
let saveButtonEl = document.getElementById("save");
let highscoresEl = document.getElementById("highscores");
let scoreListEl = document.getElementById("scoreList");
let refreshEl = document.getElementById("refresh");
let clearScoresEl = document.getElementById("clearScores");

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
let timeLeft = 45;
let score = 0;

let timeInterval;

// countdown timer, end screen pops up when timer run out
function countdown() {
    timerEl.textContent = "Time Left: " + timeLeft;

    timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time Left: " + timeLeft;

        if(timeLeft <= 0) {
            quizEl.style.display = "none";
            endEl.style.display = "block";
            clearInterval(timeInterval);
            finalScoreEl.textContent = score
        }
    }, 1000);
}

// displays the questions and answer options. goes through until there are no more questions which results in the end screen to pop up.
function displayQuestion() {
    if (currentQuestion >= questions.length) {
        quizEl.style.display = "none";
        endEl.style.display = "block";
        clearInterval(timeInterval);
        finalScoreEl.textContent = score
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

/*
Saves the score to a localStorage named "scoreHistory".
It stores a list of all the scores saved throughout doing the quiz.
If there is no score, this function ensures that it makes a new empty list,
and adds it to the localStorage, thus preventing the localStorage from ever
being null.
*/
function saveScore() {
    let scoreHistory = [];
    let newScore = {
        name: playerEl.value,
        score: score,
    };
    let lastStorage = localStorage.getItem("scoreHistory");

    if (lastStorage !== null) {
        scoreHistory = JSON.parse(lastStorage);
    }

    let foundOldScore = false;

    for (score of scoreHistory) {
        if (score["name"] == newScore["name"]) {
            foundOldScore = true;
            score["score"] = newScore["score"];
        }
    }

    if (!foundOldScore) {
        scoreHistory.push(newScore);
    }
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
}

/*
Displays all previous scores from the "scoreHistory" localStorage item.
It sorts all entries first by their score, then by their name in alphabetical order.
Entries in 1st, 2nd, and 3rd place get special colors to pop out.
*/
function displayOldScores() {
    endEl.style.display = "none";
    highscoresEl.style.display = "block";

    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")); // don't need to check here because saveScore() guarantees its gonna be there
    // https://stackoverflow.com/a/979289/9091276
    scoreHistory.sort(function(prev, next) {
        let scoreComp = next["score"] - prev["score"];
        let nameComp = prev["name"].localeCompare(next["name"]);

        return scoreComp == 0 ? nameComp : scoreComp;
    });

    const firstPlaceColor = "rgb(193, 225, 193)";
    const secondPlaceColor = "rgb(255, 250, 160)";
    const thirdPlaceColor = "rgb(250, 160, 160)";

    // guaranteed in order
    let place = 1; // track the "place", ie. track firstPlace, secondPlace, or thirdPlace
    for (score of scoreHistory) {
        let scoreLi = document.createElement("li");
        let nameP = document.createElement("p");
        let scoreP = document.createElement("p");
        
        scoreLi.className = "score";

        if (place == 1) {
            scoreLi.style.backgroundColor = firstPlaceColor;
        }
        else if (place == 2) {
            scoreLi.style.backgroundColor = secondPlaceColor;
        }
        else if (place == 3) {
            scoreLi.style.backgroundColor = thirdPlaceColor;
        }

        nameP.textContent = `${place}. ` + score["name"];
        scoreP.textContent = score["score"];

        scoreLi.appendChild(nameP);
        scoreLi.appendChild(scoreP);

        scoreListEl.appendChild(scoreLi);
        place++;
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

saveButtonEl.addEventListener('click', function () {
    saveScore();
    displayOldScores();
});

refreshEl.addEventListener("click", function() {
    window.location.reload();
});

clearScoresEl.addEventListener("click", function() {
    localStorage.setItem("scoreHistory", "[]");
    scoreListEl.replaceChildren(); // https://stackoverflow.com/a/65413839
});