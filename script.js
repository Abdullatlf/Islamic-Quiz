// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const currentScoreSpan = document.getElementById("current-score");
const totalScoreSpan= document.getElementById("total-score");
const finalScoresSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const answersContainer = document.getElementById("answers-container");
const progressBar =document.getElementById("progress");
const restartButton = document.getElementById("restart-btn");
const resultMessage = document.getElementById("result-message");

const quizQuestions = [
    {
        question: "ما هي السورة التي تعدل ثلث القرآن؟",
        answers: [
            {text: "سورة البقرة", correct: false},
            {text: "سورة الناس", correct: false},
            {text: "سورة الإخلاص", correct: true},
            {text: "سورة الفاتحة", correct: false}
        ]
    },
    {
        question: "متى فرضت الصلاة على المسلمين؟",
        answers: [
            {text: "في غار حراء عند نزول الوحي", correct: false},
            {text: "في ليلة الإسراء والمعراج", correct: true},
            {text: "بعد الهجرة إلى المدينة المنورة", correct: false},
            {text: "في السنة الثانية للهجرة مع فرض الصيام", correct: false}
        ]
    },
    {
        question: "من هو اول شهيد/ة في الاسلام؟",
        answers: [
            {text: "سمية بنت خياط", correct: true},
            {text: "ياسر بن عامر", correct: false},
            {text: "الحارث بن أبي هالة", correct: false},
            {text: "عمير بن أبي وقاص", correct: false}
        ]
    },
    {
        question: "ما هي أعظم سورة في القرآن؟",
        answers: [
            {text:"سورة الفاتحة", correct: true},
            {text: "سورة الإخلاص", correct: false},
            {text: "سورة الملك", correct: false},
            {text: "سورة البقرة", correct: false}
        ]
    },
    {
        question: "ما هي السورة التي ذُكرت فيها البسملة مرتين؟",
        answers: [
            {text:"سورة المائدة", correct: false},
            {text: "سورة الأنفال", correct: false},
            {text: "سورة الرحمن", correct: false},
            {text: "سورة النمل", correct: true}
        ]
    }
]

//quiz state var
let currentQuestionIndex = 0;
let score = 0;
let asnwerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
totalScoreSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    //rest variables
    currentQuestionIndex = 0;
    score = 0;
    currentScoreSpan.textContent = score;

    //change pages
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}
function showQuestion(){
    asnwerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    // todo: explain this in a second
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        // what is dataset? it's a property of the button element that 
        // allows you to store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}
function selectAnswer(event){
    //optimization check
    if(asnwerDisabled)return;

    asnwerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // todo: explain this in a second

    Array.from(answersContainer.children).forEach((button) =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });
    if(isCorrect){
        score++;
        currentScoreSpan.textContent = score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        //check if there is another question or not
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();
        }else{
            showResult();
        }
    },1000)
}
function showResult(){

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoresSpan.textContent = score;
    //maxScoreSpan.textContent = totalScoreSpan;

    const percentage = (score/quizQuestions.length)*100;

    if (percentage === 100) {
        resultMessage.textContent = "ممتاز! أنت عبقري";
        } else if (percentage >= 80){
resultMessage.textContent = "عمل رائع! لديك معرفة قوية";
        }
else if (percentage >= 60){
resultMessage.textContent = "جهد جيد! استمر في التعلم";
        } else if (percentage >= 40) {
resultMessage.textContent = "ليس سيئاً! حاول مرة أخرى للتحسين";
        }else {
resultMessage.textContent = "استمر في الدراسة! ستتحسن";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}

