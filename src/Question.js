/*
* Represents a single question including its text content, answer, answer choices, and if it's MCQ
*/
class Question {
    constructor({
        overview, 
        mission, 
        code, 
        question,
        option1, 
        option2, 
        option3, 
        option4, 
        isMCQ,  // render.js renders questions differently if isMCQ is false
        correctAnswer,
        source
    }) {
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
        this.source = source;
    }
}
export {
    Question
}