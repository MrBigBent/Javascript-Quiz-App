function Question(text, choices, answer) {
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

var q1 = new Question("What's the best programming", ["C#", "javascript", "phyton","asp.net"], "javascript");
var q2 = new Question("What's the most popular programming language ?",["C#", "javascript", "phyton","asp.net"], "javascript");
var q3 = new Question("What's the best modern programming language ?" , ["C#", "javascript", "phyton","asp.net"], "javascript");    
var q4 = new Question("Bebeğinin adı ne ?" , ["ayse", "fatma", "hayriye","eliz"], "eliz");    
var q5 = new Question("Kocanın adı ne ?" , ["ahmet", "mehmet", "ali","emre"], "emre");    
var q6 = new Question("What's the best modern programming language ?" , ["C#", "javascript", "phyton","asp.net"], "javascript");    
var q7 = new Question("What's the best modern programming language ?" , ["C#", "javascript", "phyton","asp.net"], "javascript");    

//Question prototype
Question.prototype.checkAnswer = function(answer) {
    return this.answer === answer;
}

var questions  = [q1,q2,q3, q4, q5, q6];

//Quiz Constructor
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

//Quiz prototype
Quiz.prototype.getQuestion = function() {
    return this.questions[this.questionIndex];
}

//Quiz isFinish
Quiz.prototype.isFinish = function() {
    return this.questions.length === this.questionIndex;
}

//Quiz guess
Quiz.prototype.guess = function(answer) {
    var question = this.getQuestion();

    if(question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

//Start Quiz
var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if(quiz.isFinish()) {
        showScrore();
    }else {
        var question = quiz.getQuestion();
        var choices = question.choices;
        console.log(choices);
        document.querySelector('#question').textContent = question.text;

        for(var i=0; i<choices.length; i++) {
            var element  = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];

            guess('btn'+i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function() {
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScrore() {
    var html = `<h2>Score : </h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
}

function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML = 'Question '+questionNumber+ ' of ' + totalQuestion;
}