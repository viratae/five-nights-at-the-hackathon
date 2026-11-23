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
        console.log(currentQuestion.correctAnswer.length);
        if(Array.isArray(currentQuestion.correctAnswer) && currentQuestion.correctAnswer.length > 1) {
            let isCorrect = false;
            for (const solution of currentQuestion.correctAnswer) {
                if(answer.replace(/\s/g, '') == solution) {
                    isCorrect = true;
                    break;
                } 
            }
            questionEffects(isCorrect);
        }
        else if(answer.replace(/\s/g, '') == currentQuestion.correctAnswer) {
            questionEffects(true);
        } 
        else {
            questionEffects(false);
        }
        questionIndex++;
        if(questionIndex < questionList.length) {
            displayQuestion(questionIndex);
        }
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
            questionList[index].overview, 
            questionList[index].mission,
            questionList[index].code,
            questionList[index].question, 
            questionList[index].option1,
            questionList[index].option2,
            questionList[index].option3,
            questionList[index].option4,
            questionList[index].isMCQ,
            questionList[index].source,
        );
    }
    return {
        displayQuestion
    }
})();
export {
    questions
}
const hackathonProjectQ = new Question({
    overview: "It's time to contribute to the team's project! Unfortunately something isn't working as expected...",
    mission: "MISSION: Investigate the code's behavior",
    code: `class Main {
    void main() {
        Computer c = new Computer(256.0);
        IO.println(c.storage);
    }
}

class Computer {
    double storage;

    Computer(double storage) {
        storage = storage;
    }
}`,
    question: "What prints?",
    option1: "27.5",
    option2: "0.0",
    option3: "null",
    option4: "Compile Error",
    isMCQ: true,
    correctAnswer: "2",
    source: "CS 180 - Writing Classes Lesson"
});
const substringPasswordQ = new Question({
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
    correctAnswer: "ShSHss",
    source: ""
});
const loopQ = new Question({
    overview: "Looks like they've now taken over control of the building's electrical gameLogic",
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
    correctAnswer: "i<attempts;i++",
    source: ""
});
const parseIntQ = new Question({
    overview: "Looks like the hackers have altered the system's password logic! Reimplement it so only users with the correct password can access the system.",
    mission: "MISSION: Parse the user's input as a number using IO.",
    code: `void main() {
    int password = 8923;
    while(true) {
        int guess = _________________________
        if(guess != password) {
            System.alert();
        }
        else {
            System.grantAccess();
            break;
        }
    }
}`,
    question: "Fix the code to read the user's input (as a number!) using IO.readln() with NO PARAMETERS",
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    isMCQ: false,
    correctAnswer: "Integer.parseInt(IO.readln());",
    source: "CS 180 - HW04"
});
const synchronizedQ = new Question({
    overview: "Seems like your competition with the hacker's is exposing flaws in the system's handling of race conditions!",
    mission: "MISSION: Ensure that the system can approporiately handle multiple users",
    code: `public class System implements Runnable {
    static int counter = 0;
    static Object gateKeeper = new Object();       

    @Override
    public void run() {
        for (int i = 0; i < 1_000_000; i++) {
            ____________ __________ {
                counter++;                         
            }
        }
    }
}`,
    question: "Use the existing variables to fill in the missing blank and fix the race condition ",
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    isMCQ: false,
    correctAnswer: "synchronized(gateKeeper)",
    source: "CS 180 - Synchronization Lesson"
});
const cdQ = new Question({
    overview: "Before we get working on fixing the system we need to make sure we're in the right folder",
    mission: "MISSION: Move into the folder system/src (this lies in the home directory which you're currently in",
    code: `CoderBro@Codeys-Macbook-Air ~ % __ ______`,
    question: "Write the code to commit your changes with the correct message",
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    isMCQ: false,
    /* 
    Correct answers are written with no spaces to match the code after trimming the whitespace.
    While in the case of git it could technically make the answer incorrect, this allows most java code to pass correctly
    regardless of exact spacing 
    */
    correctAnswer: ["cd.system/src", "cdsystem/src"],
    source: "CS 193 - EDIT LATER"
})
const gitCommitQ = new Question({
    overview: "Your changes are great, but unfortunately they aren't being pushed properly. Finish the current workflow",
    mission: "MISSION: Commit your work with the exact message \"Patched bugs in the system\"",
    code: `git add.
___ _______ __
git push`,
    question: "Write the code to commit your changes with the correct message",
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    isMCQ: false,
    /* 
    Correct answers are written with no spaces to match the code after trimming the whitespace.
    While in the case of git it could technically make the answer incorrect, this allows most java code to pass correctly
    regardless of exact spacing 
    */
    correctAnswer: `gitcommit-m"Patchedbugsinthesystem"`,
    source: "CS 193 - Git Introduction HW05"
});

const questionList = [hackathonProjectQ, substringPasswordQ, cdQ, loopQ, parseIntQ, synchronizedQ, gitCommitQ];