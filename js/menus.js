let visibleButtons = [];
let buttons = document.getElementById("menu").getElementsByTagName("button");
let questionCount = 0;
let maxButton = 2;
let minButton = 0;
let currentScore = 0;
let gameGroup;
let timer;
let currentQuestionGroup = 0;
let letterToSelect;
let selectedLetter;
let scoreToEdit;



function newGame() {
    reset();
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
    replace("menu", menus.editQuestions);
    replace("title", `<h1>Edit Quiz</h1>`);
    questionGroups();
    showMenuButtons(0,2);
    focusUpdate();
}

function newGroup(){
    questions.groups.push(templates.newGroup);
    localStorage.setItem('questions', JSON.stringify(questions));
    reset();
    editQuiz();
}


function highScores(currentQuestionGroup,scoreToEdit) {
    console.log("highscores function. Parameters:" + currentQuestionGroup + scoreToEdit);
    group = questions.groups[currentQuestionGroup];
    scores = group.highScores;
    replace("game", screens.scoreScreen);
    replace("title", "<h1>" + group.title + "</h1>");
    replace("highScoreName1" , scores[0][0]);
    replace("highScoreScore1" , scores[0][1]);
    replace("highScoreName2" , scores[1][0]);
    replace("highScoreScore2" , scores[1][1]);
    replace("highScoreName3" , scores[2][0]);
    replace("highScoreScore3" , scores[2][1]);
    replace("highScoreName4" , scores[3][0]);
    replace("highScoreScore4" , scores[3][1]);
    replace("highScoreName5" , scores[4][0]);
    replace("highScoreScore5" , scores[4][1]);

    if(arguments.length === 2){
        nameToChange = "highScoreName" + (scoreToEdit+1).toString();
        replace(nameToChange, components.editScoreName);
        editLetters();
    }
    if(arguments.length >2){
        home();
    }
}

function nextScoreGroup(){
    if(document.getElementById("highScores")!=undefined && document.getElementById("editScoreName") == undefined){
        saveScore();
        if(currentQuestionGroup >= questions.groups.length-1){
            currentQuestionGroup = 0;
        }else{
            currentQuestionGroup += 1;
        }
        highScores(currentQuestionGroup);
    }
}

function previousScoreGroup(){
    if(document.getElementById("highScores")!=undefined && document.getElementById("editScoreName") == undefined){
        saveScore();
        if(currentQuestionGroup <= 0){
            currentQuestionGroup = questions.groups.length-1;
        }else{
            currentQuestionGroup -= 1;
        }
        highScores(currentQuestionGroup);
    }
}

function home() {
    saveScore();
    replace("game", screens.homeScreen);
    reset();
}

function focusUpdate(){
    let buttons = document.getElementById("menu").getElementsByTagName("button");
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
    replace("title", '<textarea id="titleText">' + questions.groups[index].title + '</textarea>');
    groupIndex = index;
    document.getElementById("question").value = questions.groups[index].questions[0].question;
    setAnswers();
    document.getElementById("info").style.display = "grid";
    document.getElementById("cover").style.display = "grid";
    focusUpdate();
    deleteButton = document.createElement("button");
    document.getElementById("game").appendChild(deleteButton);
    deleteButton.addEventListener('click', function() {
        deleteGroup(index);
    });
    deleteButton.innerHTML = "<h2>Delete Entire Group</h2>";
    deleteButton.classList.add("delete");
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

function deleteGroup(i){
    questions.groups.splice(i,1);
    localStorage.setItem('questions', JSON.stringify(questions));
        replace("game", screens.homeScreen);
        showMenuButtons(0,2);
}

function hideCover(){
    document.getElementById("cover").style.display = "none";
}
function startGame(i){
    gameGroup = questions.groups[i];
    gameQuestions = questions.groups[i].questions;
    console.log(questions.groups[i].questions);
    shuffleArray(gameQuestions);
    console.log(questions.groups[i].questions);
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
        timer = document.getElementById("questions")
        timer.addEventListener("animationiteration", timerEnded);
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

function timerEnded(event){
    timeRemaining = 10 - event.elapsedTime;
    submitAnswer("timeExpired");
}

function submitAnswer(answer){
    if(answer != "timeExpired"){

        const computedStyle = window.getComputedStyle(timer);
        const propertyValue = computedStyle.getPropertyValue("margin");
        str = propertyValue.substring(0, propertyValue.length - 2);
        timeElapsed = str * 10;
        points = 1000 - timeElapsed*100;
        points = Math.round(points); 

        if(currentAnswer == answer){
            correct=true;
            score(points);
        }else{
            correct=false;
        }
        questionCount +=1;
        if(questionCount >=10){
            completeGame();
            return;
        }
        newQuestion(correct);
    }else{
        correct = false;
        newQuestion(correct);
    }
}

function score(i){
    currentScore += i;
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
        replace("score", '<h2> Score:' + currentScore + '</h2>');
        replace("remainingQuestions", '<h2> Questions: ' + questionCount + '/ 10</h2>');
    }else{
        replace("game", components.incorrect);
        replace("score", '<h2> Score:' + currentScore + '</h2>');
        replace("remainingQuestions", '<h2> Questions: ' + questionCount + '/ 10</h2>');
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
        timer = document.getElementById("questions")
        timer.addEventListener("animationiteration", timerEnded);
    });
}

function editLetters(){
    letters = document.getElementById("editScoreName").getElementsByClassName("letters");
    letterToSelect = 0;
    selectedLetter = letters[0];
    selectedLetter.style.animationName = "blinking";
}

function nextLetter(){
    if(selectedLetter != undefined){
        currentLetter = selectedLetter.innerHTML;
        charCode = currentLetter.charCodeAt(0);
        if(charCode <= 65){
            charCode = 90;
        }else{
            charCode -= 1;
        }
        selectedLetter.innerHTML = String.fromCharCode(charCode);
    }
}

function previousLetter(){
    if(selectedLetter != undefined){
        currentLetter = selectedLetter.innerHTML;
        charCode = currentLetter.charCodeAt(0);
        if(charCode >= 90){
            charCode = 65;
        }else{
            charCode += 1;
        }
        selectedLetter.innerHTML = String.fromCharCode(charCode);
    }
}

function rightLetter(){
    if(selectedLetter != undefined){
        if(letterToSelect >= letters.length-1){
            letterToSelect = 0;
        }else{
            letterToSelect += 1;
        }
        selectedLetter.style.animationName = "";
        selectedLetter = letters[letterToSelect];
        selectedLetter.style.animationName = "blinking";
    }
}

function leftLetter(){
    if(selectedLetter != undefined){
        if(letterToSelect <= 0){
            letterToSelect = letters.length-1;
        }else{
            letterToSelect -= 1;
        }
        selectedLetter.style.animationName = "";
        selectedLetter = letters[letterToSelect];
        selectedLetter.style.animationName = "blinking";
    }
}

function completeGame(){
    gameScore = currentScore;
    scoreToEdit = -1;
    for(let i=0; i<gameGroup.highScores.length; i++){
        if(gameScore > gameGroup.highScores[i][1]){
            gameGroup.highScores.splice(i,0,["",currentScore]);
            gameGroup.highScores.pop();
            scoreToEdit = i;
            break;
        }
    }
    if(scoreToEdit != -1){
        highScores(currentQuestionGroup,scoreToEdit);
    }else{
        highScores(currentQuestionGroup);
    }
}

function clearComponents(){
    componentList = document.getElementsByClassName("component");
    for (let i=0; i < components.length; i++){
        componentList[i].remove();
    }
}
templates= {
    "newGroup": 
    {
        "title": "New QuestionGroup",
        "highScores": [["NOR",5001],["TEM",4001],["RAC",3001],["GEO",2001],["WAN",1001],],
        "questions": [{
            "question": "Question 1",
            "answers": ["Correct Answer", "Answer 2", "Answer 3", "Answer 4"],
            },
            {
            "question": "Question 2",
            "answers": ["Correct Answer", "Answer 2", "Answer 3", "Answer 4"],
            },
        ]
    }
    ,
}
menus = {
        "main_menu": 

            `<button autofocus onclick=newGame()><h2>New Game</h2></button>

            <button onclick=editQuiz()><h2>Edit Quiz</h2></button>

            <button onclick=highScores(0)><h2>Highscores</h2></button>`,

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
    "homeButton":`
        <button onclick="home()">
            <h2>Home</h2>
        </button>`,
    "quiz": `
        <div id="quiz">
            <div class="questions timer" id="questions"></div>
            <div id="currentQuestion"></div> 
            <button id="currentAnswer1" onclick="submitAnswer(this.value)"></button> 
            <button id="currentAnswer2" onclick="submitAnswer(this.value)"></button> 
            <button id="currentAnswer3" onclick="submitAnswer(this.value)"></button> 
            <button id="currentAnswer4" onclick="submitAnswer(this.value)"></button> 
        </div>
        `,
        "tfquiz":`
            <div id="quiz">
            <div class="questions timer" id="questions"></div>
                <div id="currentQuestion"></div> 
                <button id="currentTFAnswer1" onclick="submitAnswer(this.value)"></button> 
                <button id="currentTFAnswer2" onclick="submitAnswer(this.value)"></button>
            </div>
        `,
        "correct":`
        <div id="score"></div>
        <div id=correct> <h1>CORRECT</h1></div>
        <div id="remainingQuestions"></div>
        `,
        "incorrect":`
        <div id="score"></div>
        <div id="incorrect"> <h1>INCORRECT</h1></div>
        <div id="remainingQuestions"></div>
        `,
        "editScoreName":`
            <div id="editScoreName">
            <div id ="letter1" class="letters">A</div>
            <div id ="letter2" class="letters">A</div>
            <div id ="letter3" class="letters">A</div>
            </div>
        `,
        "delete":
        `
        <button id="delete"></button>
        `,
        "newGroup":
        `
        <button id="newGroup">New Group<button/>
        `,
}

screens = {
    "homeScreen":`
        <div class="circles" id="circles">
            <div class="circle"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
        </div>

        <div id="cover" onclick="hideCover()"><h2>Click to Reveal Answers</h2></div>

        <div id="info" class="info">
            <textarea name="question" id="question" cols="20" rows="5"></textarea>
            <textarea name="" id="answer1" cols="20" rows="1"></textarea>
            <textarea name="" id="answer2" cols="20" rows="1"></textarea>
            <textarea name="" id="answer3" cols="20" rows="1"></textarea>
            <textarea name="" id="answer4" cols="20" rows="1"></textarea>
        </div>
        <div class="title" id="title">
            <h1>RUSS EDWARDS SCHOOL AGRICULTURE QUIZ</h1>
        </div>

        <div class="menu" id="menu">
            <button autofocus onclick=newGame()><h2>New Game</h2></button>
            <button onclick=editQuiz()><h2>Edit Quiz</h2></button>
            <button onclick=highScores(0)><h2>Highscores</h2></button>
        </div>
        `,
        "scoreScreen":`
        <div class="circles" id="circles">
            <div class="circle"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
        </div>

        <div class="title" id="title">
            <h1>RUSS EDWARDS SCHOOL AGRICULTURE QUIZ</h1>
        </div>

        <div id="highScores">
            <div id="highScore1"><h2>1</h2><h2 id="highScoreName1">Nor</h2><h2 id=highScoreScore1>5000</h2></div>
            <div id="highScore2"><h2>2</h2><h2 id="highScoreName2">Tem</h2><h2 id=highScoreScore2>4000</h2></div>
            <div id="highScore3"><h2>3</h2><h2 id="highScoreName3">Rac</h2><h2 id=highScoreScore3>3000</h2></div>
            <div id="highScore4"><h2>4</h2><h2 id="highScoreName4">Geo</h2><h2 id=highScoreScore4>2000</h2></div>
            <div id="highScore5"><h2>5</h2><h2 id="highScoreName5">Wan</h2><h2 id=highScoreScore5>1000</h2></div>
        </div>
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
        newGroupButton = document.createElement('button');
        newGroupButton.innerHTML = "<h2>Add New Question Group</h2>";
        newGroupButton.addEventListener('click', function() {
            newGroup();
        });
        document.getElementById("menu").appendChild(newGroupButton);
        focusUpdate();
        showMenuButtons(0,2);
            
}

function showMenuButtons(min,max){
    menuButtons = document.getElementById("menu").getElementsByTagName("button");
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
    menuButtons = document.getElementById("menu").getElementsByTagName("button");
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
    menuButtons = document.getElementById("menu").getElementsByTagName("button");
    previousButtons = minButton;
    if(previousButtons >= 3){
        minButton -=3;
        maxButton -=3;
    }else{
        if(previousButtons > 0 && previousButtons <3){
            
            minButton += 1;
            maxButton += 1;
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
    var title = document.getElementById("titleText").value;

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
    questions.groups[groupIndex].title = title;

    localStorage.setItem('questions', JSON.stringify(questions));
}

function saveScore(){
    if(document.getElementById("editScoreName")){
        letter1 = document.getElementById("letter1").innerHTML;
        letter2 = document.getElementById("letter2").innerHTML;
        letter3 = document.getElementById("letter3").innerHTML;
        nameToSave = letter1 + letter2 + letter3;
        scores[scoreToEdit][0] = nameToSave;
        scores[scoreToEdit][1] = currentScore;
        localStorage.setItem('questions', JSON.stringify(questions));
    }
}

function resetEditQuestions(){
    groupIndex = 0;
    questionIndex = 0;
    currentQuestion = questions.groups[0].questions[0].question;
}

function reset(){
    visibleButtons = [];
    buttons = document.getElementById("menu").getElementsByTagName("button");
    questionCount = 0;
    maxButton = 2;
    minButton = 0;
    currentScore = 0;
    resetEditQuestions();
    focusUpdate();
}






console.log(questions);
reset();


