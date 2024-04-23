import "./menus.js";
function newGame() {
    console.log("New Game");
    replace("title", '');
    replace("menu", '');
    loadAnim(function() {
        replace("menu", menus.gameStart);
        chooseQuestionGroup();
    });
}

function loadAnim(callbackFunction) {
    var circles = document.getElementById("circles");
    if(!circles){
        createElement("game", `
            <div class="circles" id="circles">
            <div class="circle"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            </div>`)
            var circles = document.getElementById("circles");
    }
    var clone = circles.cloneNode(true);

    circles.style.animationPlayState = "running";
    
    setTimeout(function() {
        circles.parentNode.replaceChild(clone, circles);
        if (typeof callbackFunction === 'function') {
            callbackFunction();
        }
    }, 1000);
}

function editQuiz() {
    console.log("Edit Quiz");
    replace("menu", menus.editQuestions);
    focusUpdate();
    replace("title", `<h1>Edit Quiz</h1>`);
    questionGroups();
    focusFirst();
}

function highScores() {
    console.log("Highscores");
}

function home() {
    console.log("home");
    replace("menu", menus.main_menu);
    replace("title", `<h1>RUSS EDWARDS SCHOOL AGRICULTURE QUIZ</h1>`);
    document.getElementById("info").style.opacity = "0";
    focusFirst();
}

function focusUpdate(){
    buttons = document.getElementsByTagName("button");
}

function focusFirst(){
    focusUpdate();
    buttons[0].focus();
}

function focusNext() {
    var currentFocus = document.activeElement;
    var lastIndex = buttons.length - 1;
    if (typeof buttons[0] !== "undefined")
{
        if (!currentFocus || !Array.from(buttons).includes(currentFocus)) {
            buttons[0].focus();
            return;
        }
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i] === currentFocus) {
                if (i < lastIndex) {
                    buttons[i + 1].focus();
                } else {
                    buttons[0].focus();
                }
                break;
    }
        }
    }
}

function focusPrevious() {
    var currentFocus = document.activeElement;
    var firstIndex = 0;
    if (typeof buttons[0] !== "undefined")
    {
    if (!currentFocus || !Array.from(buttons).includes(currentFocus)) {
        buttons[buttons.length - 1].focus();
        return;
    }
    for (var i = buttons.length - 1; i >= 0; i--) {
        if (buttons[i] === currentFocus) {
            if (i > firstIndex) {
                buttons[i - 1].focus();
            } else {
                buttons[buttons.length - 1].focus();
            }
            break;
    }
        }
    }
}

function editGroup(index) {
    replace("menu", menus.editGroup);
    replace("title", '<h1>' + questions.groups[index].title + '</h1>');
    groupIndex = index;
    document.getElementById("question").value = questions.groups[index].questions[0].question;
    setAnswers();
    document.getElementById("info").style.opacity = "1";
    focusFirst();
}

function chooseQuestionGroup(){
    createElement("menu", components.homeButton);
    for (let i = 0; i < questions.groups.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = '<h2>' + questions.groups[i].title + '</h2>';
        replace("title", `<h1>Choose Question Group</h1>`);
        button.addEventListener('click', function() {
            clearComponents();
            startGame(i);
        });
        document.getElementById("menu").appendChild(button);
        focusUpdate();
    }
}

function startGame(i){
    gameQuestions = questions.groups[i].questions;
    shuffleArray(gameQuestions);
    replace("title", '');
    replace("menu", '');
    currentAnswer = gameQuestions[0].answers[0];
    shuffleArray(gameQuestions[0].answers);
    currentQuizQuestion = 0;

    loadAnim(function() {
        if(gameQuestions[0].answers.length == 2){
            replace("game", components.tfquiz);
            replace("currentQuestion", gameQuestions[0].question);
            replace("currentTFAnswer1", gameQuestions[0].answers[0]);
            replaceElementAttribute("currentTFAnswer1", "value", gameQuestions[0].answers[0]);
            replace("currentTFAnswer2", gameQuestions[0].answers[1]);
            replaceElementAttribute("currentTFAnswer2", "value", gameQuestions[0].answers[1]);
        }else{
            replace("game", components.quiz);
            replace("currentQuestion", gameQuestions[0].question);
            replace("currentAnswer1", gameQuestions[0].answers[0]);
            replaceElementAttribute("currentAnswer1", "value", gameQuestions[0].answers[0]);
            replace("currentAnswer2", gameQuestions[0].answers[1]);
            replaceElementAttribute("currentAnswer2", "value", gameQuestions[0].answers[1]);
            replace("currentAnswer3", gameQuestions[0].answers[2]);
            replaceElementAttribute("currentAnswer3", "value", gameQuestions[0].answers[2]);
            replace("currentAnswer4", gameQuestions[0].answers[3]);
            replaceElementAttribute("currentAnswer4", "value", gameQuestions[0].answers[3]);
        }
    });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function submitAnswer(answer){
    if(currentAnswer == answer){
        correct=true;
    }else{
        correct=false;
    }  
    newQuestion(correct);
}

function newQuestion(correct){
    if((currentQuizQuestion + 1) < gameQuestions.length){
        currentQuizQuestion += 1;
    }else{
        completeGame();
        return;
    }
    currentAnswer = gameQuestions[currentQuizQuestion].answers[0];
    shuffleArray(gameQuestions[currentQuizQuestion].answers);
    if(correct==true){
        replace("game", components.correct);
        console.log("Correct Answer");
    }else{
        replace("game", components.incorrect);
        console.log("Incorrect Answer");
    }
    loadAnim(function() {
        if(gameQuestions[currentQuizQuestion].answers.length == 2){
            replace("game", components.tfquiz);
            replace("currentQuestion", gameQuestions[currentQuizQuestion].question);
            replace("currentTFAnswer1", gameQuestions[currentQuizQuestion].answers[0]);
            replaceElementAttribute("currentTFAnswer1", "value", gameQuestions[currentQuizQuestion].answers[0]);
            replace("currentTFAnswer2", gameQuestions[currentQuizQuestion].answers[1]);
            replaceElementAttribute("currentTFAnswer2", "value", gameQuestions[currentQuizQuestion].answers[1]);
        }else{
            replace("game", components.quiz);
            replace("currentQuestion", gameQuestions[currentQuizQuestion].question);
            replace("currentAnswer1", gameQuestions[currentQuizQuestion].answers[0]);
            replaceElementAttribute("currentAnswer1", "value", gameQuestions[currentQuizQuestion].answers[0]);
            replace("currentAnswer2", gameQuestions[currentQuizQuestion].answers[1]);
            replaceElementAttribute("currentAnswer2", "value", gameQuestions[currentQuizQuestion].answers[1]);
            replace("currentAnswer3", gameQuestions[currentQuizQuestion].answers[2]);
            replaceElementAttribute("currentAnswer3", "value", gameQuestions[currentQuizQuestion].answers[2]);
            replace("currentAnswer4", gameQuestions[currentQuizQuestion].answers[3]);
            replaceElementAttribute("currentAnswer4", "value", gameQuestions[currentQuizQuestion].answers[3]);
        }
    });
}

function completeGame(){

}

function clearComponents(){
    componentList = document.getElementsByClassName("component");
    for (let i=0; i < components.length; i++){
        componentList[i].remove();
    }
}

menus = {
        "main_menu": 

            `<button autofocus onclick=newGame()><h2>New Game</h2></button>

            <button onclick=editQuiz()><h2>Edit Quiz</h2></button>

            <button onclick=highScores()><h2>Highscores</h2></button>`,

        "editQuestions":
            `<button onclick="home()">
                <h2>Home</h2>
            </button>`,

        "editGroup":
            `<button onclick="home()">
                <h2>Home</h2>
            </button>
                    <button onclick="previousQuestion()"><h2>Previous</h2></button>
                    <button onclick="nextQuestion()"><h2>Next</h2></button>
                `,
        "gameStart":
            `<div id="questionGroups"></div>`,
}

components = {
    "loadingBar": `
    <div id="timer-outer" class="component">
        <div id="timer-inner"> </div>
    </div>
    `,
    "homeButton":`
        <button onclick="home()">
            <h2>Home</h2>
        </button>`,
    "quiz": `
        <div id="quiz">
            <div id="currentQuestion"></div> 
            <button id="currentAnswer1" onclick="submitAnswer(this.value)"></button> 
            <button id="currentAnswer2" onclick="submitAnswer(this.value)"></button> 
            <button id="currentAnswer3" onclick="submitAnswer(this.value)"></button> 
            <button id="currentAnswer4" onclick="submitAnswer(this.value)"></button> 
        </div>
        `,
        "tfquiz":`
            <div id="quiz">
                <div id="currentQuestion"></div> 
                <button id="currentTFAnswer1" onclick="submitAnswer(this.value)"></button> 
                <button id="currentTFAnswer2" onclick="submitAnswer(this.value)"></button> 
            </div>
        `,
        "correct":`
        <div id=correct> <h1>CORRECT</h1></div>
        `,
        "incorrect":`
        <div id=incorrect> <h1>INCORRECT</h1></div>
        `,
}

function replace(elementId, newValue) {
    var element = document.getElementById(elementId);
    
    if (element) {
        element.innerHTML = newValue;
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}

function createElement(parentId, childHTML) {
    var parent = document.getElementById(parentId);
    
    if (parent) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = childHTML.trim();
        parent.appendChild(tempElement.firstChild);
    } else {
        console.error("Parent element with ID '" + parentId + "' not found.");
    }
}

function replaceElementAttribute(elementId, attributeName, attributeValue) {
    // Split the elementId into parts using '_' as delimiter
    var parts = elementId.split('_');
    var targetId = parts[0]; // Extract the main element ID
    var targetElement = document.getElementById(targetId); // Get the main element
    
    // Check if the main element exists
    if (targetElement) {
        // Check if there are specific attributes to target
        if (parts.length > 1) {
            // Get the specific attribute name
            var specificAttribute = parts[1];
            
            // Check if the specific attribute exists
            if (targetElement.hasAttribute(specificAttribute)) {
                // Update the value of the specific attribute
                targetElement.setAttribute(specificAttribute, attributeValue);
            } else {
                console.error("Attribute '" + specificAttribute + "' not found in element with ID '" + targetId + "'.");
            }
        } else {
            // Update the main element's attribute
            targetElement.setAttribute(attributeName, attributeValue);
        }
    } else {
        console.error("Element with ID '" + targetId + "' not found.");
    }
}

function questionGroups() {
    for (let i = 0; i < questions.groups.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = '<h2>' + questions.groups[i].title + '</h2>';

        button.addEventListener('click', function() {
            editGroup(i);
        });
        document.getElementById("menu").appendChild(button);
        focusUpdate();
    }
}

function previousQuestion(){
    saveQuestion();
    if(questionIndex > 0){
        questionIndex += -1;
    }else{
        questionIndex = (questions.groups[groupIndex].questions.length) - 1;
    }
    setAnswers();
}

function nextQuestion(){
    saveQuestion();
    if(questionIndex < (questions.groups[groupIndex].questions.length) - 1){
    questionIndex += 1;
    }else{
        questionIndex = 0;
    }
    setAnswers();
}

function setAnswers(){
    document.getElementById("question").value = questions.groups[groupIndex].questions[questionIndex].question;
    if(questions.groups[groupIndex].questions[questionIndex].answers[0]){
        document.getElementById("answer1").value = questions.groups[groupIndex].questions[questionIndex].answers[0];
    }else{document.getElementById("answer1").value = null}

    if(questions.groups[groupIndex].questions[questionIndex].answers[1]){
        document.getElementById("answer2").value = questions.groups[groupIndex].questions[questionIndex].answers[1];
    }else{document.getElementById("answer2").value = null}

    if(questions.groups[groupIndex].questions[questionIndex].answers[2]){
        document.getElementById("answer3").value = questions.groups[groupIndex].questions[questionIndex].answers[2];
    }else{document.getElementById("answer3").value = null}

    
    if(questions.groups[groupIndex].questions[questionIndex].answers[3]){
        document.getElementById("answer4").value = questions.groups[groupIndex].questions[questionIndex].answers[3];
    }else{document.getElementById("answer4").value = null}
}
function saveQuestion(){
    var questionValue = document.getElementById('question').value;
    var answer1Value = document.getElementById('answer1').value;
    var answer2Value = document.getElementById('answer2').value;
    var answer3Value = document.getElementById('answer3').value;
    var answer4Value = document.getElementById('answer4').value;

    questions.groups[groupIndex].questions[questionIndex].question = questionValue;

    questions.groups[groupIndex].questions[questionIndex].answers[0] = answer1Value;

    questions.groups[groupIndex].questions[questionIndex].answers[1] = answer2Value;

    questions.groups[groupIndex].questions[questionIndex].answers[2] = answer3Value;

    questions.groups[groupIndex].questions[questionIndex].answers[3] = answer4Value;

    localStorage.setItem('questions', JSON.stringify(questions));
}

let groupIndex = 0;
let questionIndex = 0;
let currentQuestion = questions.groups[0].questions[0].question;
let currentQuestionGroup = questions.groups[0];

focusUpdate();

