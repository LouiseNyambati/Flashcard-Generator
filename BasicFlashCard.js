
// Constructor used for creating new Basic Flash card

var fs = require('fs');

function Basic(front, back) {
    this.front = front;
    this.back = back;
}

Basic.prototype.printInfo = function() {
    console.log("Question: " + this.front + "\nAnswer: " + this.back + "\nThis card has been added to the database!");
    // fs.appendFile('basicflashcard.txt', "\nQuestion: " + this.question + " Answer: " + this.answer);
};

module.exports = Basic;