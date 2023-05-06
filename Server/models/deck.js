const Card = require("./card");

// DECK CLASS
class Deck {

    suits = ["hearts", "diamonds", "clubs", "spades"];
    values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    constructor() {
        this.cards = [];
        for (let suit of this.suits) {
          for (let value of this.values) {
            this.cards.push(new Card(suit, value));
        }}
        this.shuffle()
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop()
    }

    
}

module.exports = Deck;