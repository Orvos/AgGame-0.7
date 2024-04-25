let visibleButtons = [];
let buttons = document.getElementsByTagName("button");
let questionCount = 0;
let maxButton = 2;
let minButton = 0;




function newGame() {
    console.log("New Game");
    replace("title", '');
    replace("menu", '');
    loadAnim(function() {
        replace("menu", menus.gameStart);
        chooseQuestionGroup();
        showMenuButtons(0,2);
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
    }, 1600);
}

function editQuiz() {
    resetEditQuestions();
    console.log("Edit Quiz");
    replace("menu", menus.editQuestions);
    replace("title", `<h1>Edit Quiz</h1>`);
    questionGroups();
    showMenuButtons(0,2);
    focusUpdate();
}

function highScores() {
    console.log("Highscores");
}

function home() {
    console.log("home");
    replace("menu", menus.main_menu);
    replace("title", `<h1>RUSS EDWARDS SCHOOL AGRICULTURE QUIZ</h1>`);
    document.getElementById("info").style.opacity = "0";
    focusUpdate();
    resetEditQuestions();
}

function focusUpdate(){
    let buttons = document.getElementsByTagName("button");
    visibleButtons = [];
    for(let i = 0; i < buttons.length; i++){
        if(getComputedStyle(buttons[i]).display !== "none"){
            visibleButtons.push(buttons[i]);
        }
    }
    focusFirst();
}

function focusFirst(){
    visibleButtons[0].focus();
}

function focusNext() {
    var currentFocus = document.activeElement;
    var lastIndex = visibleButtons.length - 1;
    if (typeof visibleButtons[0] !== "undefined") {
        if (!currentFocus || !Array.from(visibleButtons).includes(currentFocus)) {
            visibleButtons[0].focus();
            return;
        }
        for (var i = 0; i < visibleButtons.length; i++) {
            if (visibleButtons[i] === currentFocus) {
                if (i < lastIndex) {
                    visibleButtons[i + 1].focus();
                } else {
                    showNextButtons();
                     focusUpdate();
                }
                break;
            }
        }
    }
}

function focusPrevious() {
    console.log("focus previous");
    var currentFocus = document.activeElement;
    var firstIndex = 0;
    if (typeof visibleButtons[0] !== "undefined") {
        if (!currentFocus || !Array.from(visibleButtons).includes(currentFocus)) {
            visibleButtons[visibleButtons.length - 1].focus();
            return;
        }
        for (var i = visibleButtons.length - 1; i >= 0; i--) {
            if (visibleButtons[i] === currentFocus) {
                if (i > firstIndex) {
                    visibleButtons[i - 1].focus();
                } else {
                    showPreviousButtons();
                    visibleButtons[visibleButtons.length - 1].focus();
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
    focusUpdate();
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
    }
    focusUpdate();
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
    
    if(questionCount >=10){
        completeGame();
    }
    questionCount +=1;
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
        console.log(gameQuestions[currentQuizQuestion].answers.length);
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
    }
        showMenuButtons(0,2);
            focusUpdate();
}

function showMenuButtons(min,max){
    menuButtons = document.getElementsByTagName("button");
    for (let i = 0; i < menuButtons.length; i++){
        if( i>= minButton && i <= maxButton){
            menuButtons[i].style.display = "inline";
        }else{
            menuButtons[i].style.display = "none";
        }
    }
    focusUpdate();
    minButton = min;
    maxbutton = max;
}


function showNextButtons() {
    menuButtons = document.getElementsByTagName("button");
    remainingButtons = menuButtons.length - 1 - maxButton;
    if(remainingButtons >= 3){
        minButton +=3;
        maxButton +=3;
    }else{
        if(remainingButtons > 0 && remainingButtons <3){
            
            minButton += remainingButtons;
            maxButton += remainingButtons;
        }else{
            minButton = 0;
            if(menuButtons.length>=3){
                maxButton = 2;
            }else{
                maxButton = menuButtons.length - 1;
            }
        }
    }
    showMenuButtons(minButton,maxButton);
}



function showPreviousButtons() {
    menuButtons = document.getElementsByTagName("button");
    previousButtons = minButton;
    if(previousButtons >= 3){
        minButton -=3;
        maxButton -=3;
    }else{
        if(previousButtons > 0 && previousButtons <3){
            
            minButton += previousButtons;
            maxButton += previousButtons;
        }else{
            if(menuButtons.length>=3){
                minButton = menuButtons.length-3;
                maxButton = menuButtons.length-1;
            }else{
                minButton =0;
                maxButton = menuButtons.length - 1;
            }
        }
    }
    showMenuButtons(minButton,maxButton);
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

    var answers = [answer1Value, answer2Value, answer3Value, answer4Value];

    for (var i = answers.length - 1; i >= 0; i--) {
        if (answers[i] === "" || answers[i] === undefined || answers[i] === null) {
            // If any answer value is empty, undefined, or null, remove it from the array
            questions.groups[groupIndex].questions[questionIndex].answers.splice(i, 1);
        } else {
            // Otherwise, assign the answer value to the corresponding index
            questions.groups[groupIndex].questions[questionIndex].answers[i] = answers[i];
        }
    }

    questions.groups[groupIndex].questions[questionIndex].question = questionValue;

    localStorage.setItem('questions', JSON.stringify(questions));
}

function resetEditQuestions(){
    groupIndex = 0;
    questionIndex = 0;
    currentQuestion = questions.groups[0].questions[0].question;
    currentQuestionGroup = questions.groups[0];
}



focusUpdate();

resetEditQuestions();

