// NPM Packages
var inquirer = require('inquirer');
var fs = require('fs');
var Basic = require("./basicflashcard");
var Cloze = require('./clozeflashcard')



// Variables
var card = process.argv[2];
var questions = [];
var clozeQuestions = [];


if (card === undefined) {

    console.log('Please type "Basic" or "Cloze"');

} else if (card.toLowerCase() === "basic") {
  
  // Prompts
    var questionPrompts = [{
        type: "input",
        name: "front",
        message: "What is the front of the card?"
    }, {
        type: "input",
        name: "back",
        message: "What is the back of the card?"
    }];

    var questionResponse = function(answers) {
        var newQuestion = new Basic(answers.front, answers.back);
        newQuestion.printInfo();
        var newQuestionJSON = JSON.stringify(newQuestion);
        questions.push(newQuestionJSON);
        fs.appendFile('basic.txt', newQuestionJSON + "\n");

        return inquirer.prompt([{
            name: "another",
            message: "add another?",
            type: "confirm",
            default: true
        }]);
    };
    
    var anotherResponse = function(cont) {
        if (cont.another) {
            promptForQuestion();
        } else {
            console.log("Number of Flashcards added " + questions.length);
        }
    };

    var error = function(err) {
        console.log("There's an error!");
    };

    var promptForQuestion = function() {
        inquirer.prompt(questionPrompts)
            .then(questionResponse, error)
            .then(anotherResponse, error);
    };

    promptForQuestion();

} else if (card.toLowerCase() === "cloze") {

    console.log('You chose to make a Cloze flashcard!');

    var clozeQuestionPrompts = [{
        type: "input",
        name: "cloze",
        message: "What would you like hidden?"
    }, {
        type: "input",
        name: "phrase",
        message: "What is the text of the card to finish the question?"
    }];

    var clozeResponse = function(clozeAnswers) {
        var newClozeQuestion = new Cloze(clozeAnswers.cloze, clozeAnswers.phrase);
        newClozeQuestion.printClozeInfo();
        var newClozeQuestionJSON = JSON.stringify(newClozeQuestion);
        clozeQuestions.push(newClozeQuestionJSON);
        fs.appendFile('cloze.txt', newClozeQuestionJSON + "\n");

        return inquirer.prompt([{
            name: "anotherCloze",
            message: "Add another Cloze Card?",
            type: "confirm",
            default: true
        }]);
    };

    var anotherClozeResponse = function(cont2) {
        if (cont2.anotherCloze) {
            promptClozeQuestion();
        } else {
            console.log("Number of Flashcards added to database: " + questions.length + ".");
        }
    };

    var clozeError = function() {
        console.log("There's an error!");
    };

    var promptClozeQuestion = function() {
        inquirer.prompt(clozeQuestionPrompts)
            .then(clozeResponse, clozeError)
            .then(anotherClozeResponse, clozeError);
    };

    promptClozeQuestion();

} else {
    console.log('Please type "Basic" if you want a basic flash card or "Cloze" if you want a cloze flash card');
}