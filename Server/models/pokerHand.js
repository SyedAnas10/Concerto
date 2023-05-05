const Card = require("./card");
const Player = require("./player")

const pokerHands = [
    "Straight Flush",
    "Fours",
    "Full House",
    "Flush",
    "Straight",
    "Threes",
    "Two Pairs",
    "Pair"
]

class PokerHand {
    constructor() {
        this.hand = [{
            Card,
            Player
        }]
        this.score = 0
        this.type = null
    }
}

module.exports = PokerHand