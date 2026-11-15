class Question {
    constructor({
        questionNumber, 
        overview, 
        mission, 
        code, 
        question,
        option1, 
        option2, 
        option3, 
        option4, 
        isMCQ, 
        correctAnswer
    }) {
        this.questionNumber = questionNumber;
        this.overview = overview;
        this.mission = mission;
        this.code = code;
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.isMCQ = isMCQ;
        this.correctAnswer = correctAnswer;
    }
}
export {
    Question
}