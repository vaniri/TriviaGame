class Round {
    constructor() {
        this.questions = [
            { question: "abc", answers: ["a", "b", "c", "d"], correct: 3 },
            { question: "abc", answers: ["a", "b", "c", "d"], correct: 3 }
        ];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.rounds = 2
    }

    startGame() {
        let questionBox = $('#question-box');
        let answersBox = $('#answers-table');
        answersBox.empty();
       
        if (!this.rounds) {
            questionBox.text("The Game is over");
            answersBox.text(`Correct answers: ${this.correctAnswers} Wrong Answers: ${this.wrongAnswers}`);
            return;
        }
        $('#timer-box').text("");
        let question = this.questions[Math.floor(Math.random() * this.questions.length)];
        this.questions = this.questions.filter(other => other !== question);
        this.rounds --; 

        questionBox.text(question.question);
        let tm = setTimeout(() => this.handleTimeOut(), 5000);;

        for (let i = 0; i < question.answers.length; i++) {
            let answers = $(`<li class="answers"></li>`);
            answers.appendTo(answersBox);
            answers.text(question.answers[i]);
            answers.click(() => {
                clearTimeout(tm);
                if (i === question.correct) {
                    questionBox.text("Your answer is correct!");
                    this.correctAnswers++;
                } else {
                    questionBox.text(`You select wrong answer! ${question.answers[question.correct]}`);
                    this.wrongAnswers++;
                }
                setTimeout(() => this.startGame(), 1000);
            });
        } 
    }

    handleTimeOut() {
        $('#timer-box').text("Sorry! The time is out!");
        $('#answers-table').text("");
        $('#question-box').text(`Correct answer is ${this.correct}`);
        this.wrongAnswers++;
        setTimeout(() => this.startGame(), 1000);
    }
}

$('#start-game').click(function () {
    let round = new Round();
    setTimeout(() => round.startGame(), 1000);
});



