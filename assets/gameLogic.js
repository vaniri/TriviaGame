class Round {
    constructor() {
        this.questions = [
            { question: `"b" + "a" + +"a" + "a"`, answers: ["baNaNa", "baaa", "Nun", "aaab"], correct: 0 },
            { question: `"foo" + +"bar"`, answers: ["foobar", "fooNaN", "foo", "bar"], correct: 1 },
            { question: `"[1, 2, 3] + [4, 5, 6]"`, answers: ["Null", "123456", "1,2,34,5,6", "undefined"], correct: 2 },
            { question: `parseInt(null, 24)`, answers: ["23", "null", "null24", "Error"], correct: 0 },
            { question: `(!+[]+[]+![]).length`, answers: ["13", "0", "undefined", "9"], correct: 3 },
            { question: `9+”1”`, answers: ["91", "10", "Nun", "9"], correct: 0 },
            { question: `3 + true == 4`, answers: ["false", "Nun", "undefined", "true"], correct: 3 },
            { question: `[] + {}`, answers: ["[object Object]", "0", "false", "array"], correct: 0 },
            { question: `[1,2,3] == [1,2,3]`, answers: ["Null", "array", "false", "true"], correct: 2 },
            { question: `!![]`, answers: ["[]", "false", "array", "false"], correct: 1 },
            { question: `true + false`, answers: ["1", "truefalse", "undefined", "false"], correct: 0 },
            { question: `true + 4`, answers: ["4", "true4", "null", "5"], correct: 3 },
            { question: `1 + 1 + "1"`, answers: ["21", "null", "111", "3"], correct: 0 }
        ];
        this.answerResponses = ["Nice job!", "Well Done!", "You get it!", "That's right!", "You are really a ninja!"];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.rounds = 12;
        this.timer = null;
    }

    startGame() {
        if (this.timer) { this.timer.clear(); }
        let questionBox = $('#question-box');
        let answersBox = $('#answers-table');
        answersBox.empty();

        if (!this.rounds) {
            $('#choose-answer').text("");
            questionBox.text("The Game is over");
            answersBox.text(`Correct answers: ${this.correctAnswers} Wrong Answers: ${this.wrongAnswers}`);
            return;
        }
        $('#timer-box').text("");
        let curQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
        
        $('#text').text("");
        $('#choose-answer').text("Choose your answer:");
        this.questions = this.questions.filter(other => other !== curQuestion);
        this.rounds--;

        questionBox.html(`<code>${curQuestion.question}</code>`);
        this.timer = new TimeOut(5, () => this.handleTimeOut(curQuestion));

        for (let i = 0; i < curQuestion.answers.length; i++) {
            let answer = $(`<li></li>`);
            answer.appendTo(answersBox);
            answer.html(`<code>${curQuestion.answers[i]}</code>`);
            answer.click(() => {
                this.timer.clear();
                $('#choose-answer').text("");
                if (i === curQuestion.correct) {
                    let answerResponse = this.answerResponses[Math.floor(Math.random() * this.answerResponses.length)];
                    questionBox.text(answerResponse);
                    this.correctAnswers++;
                    answer.addClass('correct');
                } else {
                    questionBox.text(`You select wrong answer! Correct answer is: ${curQuestion.answers[curQuestion.correct]}`);
                    this.wrongAnswers++;
                    answer.addClass('wrong');
                }
                setTimeout(() => this.startGame(), 2000);
            });
        }

    }

    handleTimeOut(curQuestion) {
        $('#choose-answer').text("");
        $('#question-box').text(`Correct answer is: ${curQuestion.answers[curQuestion.correct]}`);
        this.wrongAnswers++;
        setTimeout(() => this.startGame(), 1000);
    }
}

class TimeOut {
    constructor(remainderTime, func) {
        this.remainderTime = remainderTime + 1;
        let timerDecrement = () => {
            this.remainderTime--;
            $('#timer-box').text(`${this.remainderTime}`);
            if (this.remainderTime <= 0) {
                $('#text').text("Sorry! The time is out!");
                func();
                this.clear();
            }
        };
        timerDecrement();
        this.intervalHandle = setInterval(timerDecrement, 1000);
    }

    clear() {
        clearInterval(this.intervalHandle);
    }
}

window.onload = () => {
    $('#text').html(`Find out if you're really a JS ninja and can predict its behavior. <br/> And don't forget that <code>[] + [] = ""</code>!`);
    $('#start-game').click(function () {
        $('#start-game').toggle();
        let round = new Round();
        setTimeout(() => round.startGame(), 1000);
    });
}