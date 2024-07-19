#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
// Function to simulate a delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Function to display an animated message with a delay
const showAnimatedMessage = async (message, color = 'blue') => {
    console.clear();
    for (const char of message) {
        process.stdout.write(char);
        await sleep(100);
    }
    await sleep(2000); // Wait for 2 seconds before proceeding
    console.clear();
};
// Objective questions data
const objectiveQuestions = [
    {
        type: 'list',
        name: 'q1',
        message: 'What is the output of console.log(typeof null)?',
        choices: ['object', 'null', 'undefined', 'number'],
        answer: 'object'
    },
    {
        type: 'list',
        name: 'q2',
        message: 'Which company developed TypeScript?',
        choices: ['Google', 'Microsoft', 'Facebook', 'Apple'],
        answer: 'Microsoft'
    },
    {
        type: 'list',
        name: 'q3',
        message: 'What is the main advantage of TypeScript over JavaScript?',
        choices: ['Type Safety', 'Better Performance', 'Easier Syntax', 'None'],
        answer: 'Type Safety'
    },
    {
        type: 'list',
        name: 'q4',
        message: 'Which of the following is a TypeScript data type?',
        choices: ['String', 'Number', 'Boolean', 'All of the above'],
        answer: 'All of the above'
    },
    {
        type: 'list',
        name: 'q5',
        message: 'How do you define a variable in TypeScript?',
        choices: ['var', 'let', 'const', 'All of the above'],
        answer: 'All of the above'
    },
    {
        type: 'list',
        name: 'q6',
        message: 'Which of the following is a correct TypeScript function declaration?',
        choices: ['function foo(): number { return 1; }', 'function foo() { return 1; }', 'function foo(): number { return "1"; }', 'function foo() { return "1"; }'],
        answer: 'function foo(): number { return 1; }'
    },
    {
        type: 'list',
        name: 'q7',
        message: 'What is the command to compile a TypeScript file?',
        choices: ['tsc filename.ts', 'tsc filename.js', 'node filename.ts', 'node filename.js'],
        answer: 'tsc filename.ts'
    },
    {
        type: 'list',
        name: 'q8',
        message: 'How do you add a type annotation in TypeScript?',
        choices: [':', ':=', '=>', '->'],
        answer: ':'
    },
    {
        type: 'list',
        name: 'q9',
        message: 'What does "strict mode" in TypeScript do?',
        choices: ['Enforces strict null checks', 'Enforces strict type checks', 'Both of the above', 'None of the above'],
        answer: 'Both of the above'
    },
    {
        type: 'list',
        name: 'q10',
        message: 'Which TypeScript feature allows you to catch errors at compile-time rather than runtime?',
        choices: ['Static type-checking', 'Dynamic type-checking', 'Both', 'None'],
        answer: 'Static type-checking'
    },
];
// Subjective questions data
const subjectiveQuestions = [
    {
        type: 'input',
        name: 'sq1',
        message: 'What is TypeScript?',
        answer: 'A superset of JavaScript'
    },
    {
        type: 'input',
        name: 'sq2',
        message: 'Explain what a promise is in JavaScript.',
        answer: 'An object representing the eventual completion or failure of an asynchronous operation'
    },
    {
        type: 'input',
        name: 'sq3',
        message: 'What are the main benefits of using TypeScript?',
        answer: 'Type safety, improved IDE support, early bug detection'
    },
    {
        type: 'input',
        name: 'sq4',
        message: 'How do you declare an interface in TypeScript?',
        answer: 'Using the interface keyword followed by the interface name'
    },
    {
        type: 'input',
        name: 'sq5',
        message: 'What is the difference between an interface and a type alias in TypeScript?',
        answer: 'Interfaces can be merged, while type aliases cannot'
    },
    {
        type: 'input',
        name: 'sq6',
        message: 'Explain generics in TypeScript.',
        answer: 'Generics allow you to create reusable components that can work with a variety of types'
    },
    {
        type: 'input',
        name: 'sq7',
        message: 'What is a tuple in TypeScript?',
        answer: 'A tuple is an array with a fixed number of elements whose types are known'
    },
    {
        type: 'input',
        name: 'sq8',
        message: 'How do you handle null and undefined in TypeScript?',
        answer: 'Using strict null checks and the optional chaining operator'
    },
    {
        type: 'input',
        name: 'sq9',
        message: 'What is the "any" type in TypeScript?',
        answer: 'A type that can represent any value, bypassing type checking'
    },
    {
        type: 'input',
        name: 'sq10',
        message: 'How do you convert a JavaScript file to TypeScript?',
        answer: 'Rename the file extension from .js to .ts and add type annotations'
    },
];
// Function to check if the given answer is close to the expected answer
const isAnswerCorrect = (givenAnswer, expectedAnswer) => {
    const expectedKeywords = expectedAnswer.toLowerCase().split(/\s+/);
    const givenKeywords = givenAnswer.toLowerCase().split(/\s+/);
    return expectedKeywords.every(keyword => givenKeywords.includes(keyword));
};
// Function to ask questions and calculate correct answers
const askQuestions = async (questions) => {
    let correctAnswers = 0;
    for (const question of questions) {
        const answer = await inquirer.prompt([
            {
                type: question.type,
                name: question.name,
                message: question.message,
                choices: question.choices,
            }
        ]);
        if (isAnswerCorrect(answer[question.name], question.answer)) {
            correctAnswers++;
        }
    }
    return correctAnswers;
};
// Main function to run the quiz
const runQuiz = async () => {
    await showAnimatedMessage(chalk.blue('Welcome to the TypeScript Quiz App!'));
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        }
    ]);
    const { passcode } = await inquirer.prompt([
        {
            type: 'input',
            name: 'passcode',
            message: 'Enter your passcode:',
        }
    ]);
    const { ready } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ready',
            message: 'Are you ready to start the quiz?',
            default: false
        }
    ]);
    if (!ready) {
        console.log(chalk.red('Quiz aborted.'));
        return;
    }
    await showAnimatedMessage(chalk.blue('Starting the quiz...'));
    console.log(chalk.yellow('Objective Questions:'));
    const correctObjective = await askQuestions(objectiveQuestions);
    console.log(chalk.yellow('Subjective Questions:'));
    const correctSubjective = await askQuestions(subjectiveQuestions);
    // Calculate results
    const totalCorrect = correctObjective + correctSubjective;
    const totalQuestions = objectiveQuestions.length + subjectiveQuestions.length;
    const percentage = (totalCorrect / totalQuestions) * 100;
    const result = {
        'Total Questions': totalQuestions,
        'Correct Answers': totalCorrect,
        'Wrong Answers': totalQuestions - totalCorrect,
        'Percentage': `${percentage.toFixed(2)}%`
    };
    const { seeResult } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'seeResult',
            message: 'Do you want to see your result?',
            default: true
        }
    ]);
    if (seeResult) {
        await showAnimatedMessage('Quiz Summary!');
        console.table(result);
        if (percentage === 100) {
            console.log(chalk.green('Excellent! You got all the answers correct!'));
        }
        else if (percentage >= 75) {
            console.log(chalk.green('Great job!'));
        }
        else if (percentage >= 50) {
            console.log(chalk.yellow('Good effort!'));
        }
        else {
            console.log(chalk.red('Better luck next time!'));
        }
    }
    else {
        console.log(chalk.yellow('Thank you for taking the quiz.'));
    }
};
// Run the quiz application
runQuiz();
