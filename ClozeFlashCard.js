
// Constructor used to create Cloze Flashcard
var fs = require('fs');

function Cloze(cloze, phrase) {
    this.cloze = cloze;
    this.phrase = phrase;
}

Cloze.prototype.printClozeInfo = function() {
    console.log("Cloze: " + this.cloze + "\nPhrase: " + this.phrase + "\nYour card has been added to the database!");
    // fs.appendFile('clozeflashcard.txt', "\ncloze: " + this.cloze + " text: " + this.text);
};

module.exports = Cloze;