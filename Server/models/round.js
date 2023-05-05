const PokerHand = require("./pokerHand")

class Round {
    constructor(dealer, team) {
        this.dealer = dealer
        this.team = team
        this.constructedHand = new PokerHand()
    }
}