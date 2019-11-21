class Round {
    constructor() {
        this.questions = [
            { question: `"b" + "a" + +"a" + "a"`, answers: ["baNaNa", "baaa", "Nun", "aaab"], correct: 0 },
            { question: `"foo" + +"bar"`, answers: ["foobar", "fooNaN", "foo", "bar"], correct: 1 },
            { question: `"[1, 2, 3] + [4, 5, 6]"`, answers: ["Null", "123456", "1,2,34,5,6", "undefined"], correct: 2 },
            { question: `parseInt(null, 24)`, answers: ["23", "null", "null24", "Error"], correct: 0 },
            { question: `(!+[]+[]+![]).length`, answers: ["13", "0", "undefined", "9"], correct: 3 },
            { question: `9+”1”`, answers: ["91", "10", "Nun", "9"], correct: 0 },
            { question: `true_true + true === 3`, answers: ["false", "Nun", "undefined", "true"], correct: 3 },
            { question: `[] + {}`, answers: ["[object Object]", "0", "false", "array"], correct: 0 },
            { question: `[1,2,3] == [1,2,3]`, answers: ["Null", "array", "false", "true"], correct: 2 },
            { question: `Array(16).join("wat" - 1) + " Batman!"`, answers: ["Batman!", "NaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNNNaNN Batman!", "NaNN", "undefined"], correct: 1, image: "" }
        ];
        this.answerResponses = ["Nice job!", "Well Done!", "You get it!", "That's right!", "You are really a ninja!"];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.rounds = 10;
    }

    startGame() {
        let questionBox = $('#question-box');
        let answersBox = $('#answers-table');
        answersBox.empty();

        if (!this.rounds) {
            clearInterval(intervalHandle);
            questionBox.text("The Game is over");
            answersBox.text(`Correct answers: ${this.correctAnswers} Wrong Answers: ${this.wrongAnswers}`);
            return;
        }
        $('#timer-box').text("");
        let question = this.questions[Math.floor(Math.random() * this.questions.length)];

        $('#text').text("choose you answer ");
        this.questions = this.questions.filter(other => other !== question);
        this.rounds--;

        questionBox.text(question.question);
        countDown();
        let tm = setTimeout(() => this.handleTimeOut(), 5000);

        for (let i = 0; i < question.answers.length; i++) {
            let answers = $(`<li class="answers"></li>`);
            answers.appendTo(answersBox);
            answers.text(question.answers[i]);
            answers.click(() => {
                clearTimeout(tm);
                clearInterval(intervalHandle);
                if (i === question.correct) {
                    let answerResponse = this.answerResponses[Math.floor(Math.random() * this.answerResponses.length)];
                    questionBox.text(answerResponse);
                    this.correctAnswers++;
                } else {
                    questionBox.text(`You select wrong answer! Correct answer is: ${question.answers[question.correct]}`);
                    this.wrongAnswers++;
                }
                setTimeout(() => this.startGame(), 2000);
            });
        }

    }

    handleTimeOut() {
        $('#question-box').text(`Correct answer is: ${this.correct}`);
        this.wrongAnswers++;
        clearInterval(intervalHandle);
        setTimeout(() => this.startGame(), 1000);
    }

}

window.onload = () => {
    $('#text').text("Find out if you're really a JS ninja and can predict its weird behavior or just have some fun. And don't forget that array plus array equal to empty string.");
    $('#start-game').click(function () {
        $('#start-game').toggle();
        let round = new Round();
        setTimeout(() => round.startGame(), 1000);
    });
}

let intervalHandle = null;

function countDown() {
    let reminderTime = 6;
    let func = () => {
        reminderTime--;
        $('#timer-box').text(`${reminderTime}`);
        if (reminderTime <= 0) {
            $('#text').text("Sorry! The time is out!");
            clearInterval(interval);
        }

    }
    func();
    intervalHandle = setInterval(func, 1000);
}