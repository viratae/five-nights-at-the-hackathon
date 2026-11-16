import { 
    powerManager
 } from "./game.js";
import {
    effects, renderer
} from "./render.js"
import {
    Question
} from "./Question.js"
const questions = (function questions() {
    let questionIndex = 0;

    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const answerForm = document.querySelector("#answerForm");
    const answerInput = document.querySelector("#answerInput");
    option1.addEventListener('click', (e) => {
        handleQuestion("1");
    })
    option2.addEventListener('click', (e) => {
        handleQuestion("2");
    })
    option3.addEventListener('click', (e) => {
        handleQuestion("3");
    })
    option4.addEventListener('click', (e) => {
        handleQuestion("4");
    })
    answerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleQuestion(answerInput.value);
        answerInput.value="";
    })
    function handleQuestion(answer) {
        const currentQuestion = questionList[questionIndex];
        if(answer.replace(/\s/g, '') == currentQuestion.correctAnswer) {
            questionEffects(true);
        } 
        else {
            questionEffects(false);
        }
        questionIndex++;
        displayQuestion(questionIndex);
    }
    function questionEffects(isCorrect) {
        let power = powerManager.getPower();
        if (isCorrect) {
            powerManager.setPower(power + 10);
            effects.correctSound();
        }
        else {
            powerManager.setPower(power - 15);
            powerManager.raisePowerDecrease();
            effects.incorrectSound();
        }
        renderer.renderPower();
    }
    function displayQuestion(index) {

        renderer.renderQuestion(
            questionList[questionIndex].overview, 
            questionList[index].mission,
            questionList[index].code,
            questionList[index].question, 
            questionList[index].option1,
            questionList[index].option2,
            questionList[index].option3,
            questionList[index].option4,
            questionList[index].isMCQ,
        );
    }
    return {
        displayQuestion
    }
})();
export {
    questions
}
const question1 = new Question({
    questionNumber: 1,
    overview: "It's time to contribute to the team's project! Unfortunately there is a bug that's breaking everything and the syntax highlighter is broken.",
    mission: "MISSION: Identify which line the bug is on",
    code: `public class Database {
    int age;
    String name;
    public Database(int theAge, String name) {
        age = theAge;
        name = name;
    }
}`,
    question: "What line is the incorrect code on?",
    option1: "Line 3",
    option2: "Line 4",
    option3: "Line 5",
    option4: "Line 6",
    isMCQ: true,
    correctAnswer: "4"
});
const question2 = new Question({
    questionNumber: 2,
    overview: "Whoa! The lights went out. It looks like somebody hacked into the building's server. Quick, gain access back before anything happens!",
    mission: "MISSION: Figure out the scrambled password and turn the lights back on",
    code: `public static void main(String[] args) {
    String password = "You Shall NOT Pass";
    String[] split = password.split(" ");
    password = split[1];

    password = password.substring(0, 2);
    password += password.toUpperCase() + split[3].substring(2);
}`,
    question: "Find the right password to regain access",
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    isMCQ: false,
    correctAnswer: "ShSHss"
});
const question3 = new Question({
    questionNumber: 3,
    overview: "Looks like they've now taken over control of the building's electrical grid",
    mission: "MISSION: Figure out the systems current logic and fix it so that you get 3 attempts",
    code: `public static void main(String[] args) {
    int attempts = 3;
    for (int i = 0; _____________) {
        System.Override();
    }
}`,
    question: "Fix the loop so that the user gets 3 attempts",
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    isMCQ: false,
    correctAnswer: "i<attempts;i++"
});
const questionList = [question1, question2, question3];