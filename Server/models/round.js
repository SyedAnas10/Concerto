const PokerHand = require("./pokerHand")

class Round {
    constructor(dealer, team) {
        this.dealer = dealer
        this.team = team
        this.constructedHand = new PokerHand()
    }

    // LOGIC OF PLAY, PASS, AND FORCE TO BE IMPLEMENTED.
}

module.exports = Round