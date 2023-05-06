// CARD CLASS
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
        this.cardName = `${this.value} of ${this.suit}`
    }
}

module.exports = Card