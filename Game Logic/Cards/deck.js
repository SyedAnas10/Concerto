const Card = require('./cards');

const Suits = {
    HEARTS: 'H',
    SPADES: 'S',
    CLUBS: 'C',
    DIAMOND: 'D'
}

const cardValues = { 
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    11:'A',
    12:'J',
    13:'Q',
    14:'K' 
}

Deck = () => {
    const deck = [Card]
    reset()
    shuffle()
    

    reset = () => {
        this.deck = []
        for (let suit in Suits) {
            for (let value in cardValues) {
                this.deck.push({suit, value})
            }
        }
    }
}

module.exports = Deck