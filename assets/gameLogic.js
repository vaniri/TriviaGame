class Round {
    constructor() {
        this.questions = [
            { question: `"b" + "a" + +"a" + "a"`, answers: ["baNaNa", "baaa", "NaN", "aaab"], correct: 0 },
            { question: `"foo" + +"bar"`, answers: ["foobar", "fooNaN", "foo", "bar"], correct: 1 },
            { question: `"[1, 2, 3] + [4, 5, 6]"`, answers: ["null", "123456", "1,2,34,5,6", "undefined"], correct: 2 },
            { question: `parseInt(null, 24)`, answers: ["23", "null", "null24", "Error"], correct: 0 },
            { question: `(!+[]+[]+![]).length`, answers: ["13", "0", "undefined", "9"], correct: 3 },
            { question: `9+”1”`, answers: ["91", "10", "NaN", "9"], correct: 0 },
            { question: `3 + true == 4`, answers: ["false", "NaN", "undefined", "true"], correct: 3 },
            { question: `[] + {}`, answers: ["[object Object]", "0", "false", "array"], correct: 0 },
            { question: `[1,2,3] == [1,2,3]`, answers: ["null", "array", "false", "true"], correct: 2 },
            { question: `!![]`, answers: ["[]", "false", "array", "true"], correct: 1 },
            { question: `true + false`, answers: ["1", "truefalse", "undefined", "false"], correct: 0 },
            { question: `true + 4`, answers: ["4", "true4", "null", "5"], correct: 3 },
            { question: `1 + 1 + "1"`, answers: ["21", "null", "111", "3"], correct: 0 }
        ];
        this.answerResponses = ["Nice job!", "Well done!", "You get it!", "That's right!", "You are really a ninja!"];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.rounds = 12;
        this.timer = null;
    }

    startGame() {
        if (this.timer) { this.timer.clear(); }
        $('#answers-table').empty();

        if (!this.rounds) {
            $('#choose-answer').text("");
            $('#timer-box').text("");
            $('#question-box').text("The Game is over!");
            $('#answers-table').text(`Correct answers: ${this.correctAnswers}. Wrong answers: ${this.wrongAnswers}.`);
            return;
        }
        let curQuestion = getRandomElem(this.questions);
        
        $('#choose-answer').text("Choose your answer:");
        this.questions = this.questions.filter(other => other !== curQuestion);
        this.rounds--;

        $('#question-box').html(`<code>${curQuestion.question}</code>`);
        this.timer = new TimeOut(30, () => this.handleTimeOut(curQuestion));

        for (let i = 0; i < curQuestion.answers.length; i++) {
            let answer = $(`<li class="answer-option"></li>`);
            answer.appendTo($('#answers-table'));
            answer.html(`<code>${curQuestion.answers[i]}</code>`);
            answer.click(() => {
                $('.answer-option').unbind();
                this.timer.clear();
                if (i === curQuestion.correct) {
                    $('#choose-answer').text(getRandomElem(this.answerResponses));
                    this.correctAnswers++;
                    answer.addClass('correct');
                } else {
                    $('#choose-answer').text(`Wrong answer! Correct one is: ${curQuestion.answers[curQuestion.correct]}`);
                    this.wrongAnswers++;
                    answer.addClass('wrong');
                }
                setTimeout(() => this.startGame(), 3000);
            });
        }
    }

    handleTimeOut(curQuestion) {
        $('#choose-answer').text("");
        $('#answers-table').text(`Correct answer is: ${curQuestion.answers[curQuestion.correct]}`);
        this.wrongAnswers++;
        setTimeout(() => this.startGame(), 3000);
    }
}

class TimeOut {
    constructor(remainderTime, timeoutFunc) {
        this.remainderTime = remainderTime + 1;
        let timerDecrement = () => {
            this.remainderTime--;
            $('#timer-box').text(`${this.remainderTime}`);
            if (this.remainderTime <= 0) {
                timeoutFunc();
                this.clear();
            }
        };
        timerDecrement();
        this.intervalHandle = setInterval(timerDecrement, 1000);
    }

    clear() {
        clearInterval(this.intervalHandle);
        $('#timer-box').text("");
    }
}

window.onload = () => {
    $('#text').html(`Find out if you're really a JS ninja and can predict its weird behavior. <br/> And don't forget that <code>[] + [] = ""</code>!`);
    $('#start-game').click(function () {
        $('#text').hide();
        $('#title').hide();
        $('#start-game').hide();
        let round = new Round();
        setTimeout(() => round.startGame(), 50);
    });
}

function getRandomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}