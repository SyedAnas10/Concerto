const PokerHand = require("./pokerHand")

class Round {
    constructor(dealer, team) {
        this.dealer = dealer
        this.team = team
        this.constructedHand = new PokerHand()
    }

    // LOGIC OF PLAY, PASS, AND FORCE TO BE IMPLEMENTED.
    play(card, player) {
        this.constructedHand.hand.push({
            card,
            player
        })
        if (this.constructedHand.hand.length === 5) {
            this.constructedHand.evaluateHand()
            console.log(`The card in the hands are \n`)
            this.constructedHand.hand.map(card => console.log(card.card.cardName))
            console.log(`
                \n The hand constructed by team ${this.team.teamName} is ${this.constructedHand.type} \n
                The score is ${this.constructedHand.score}
            `)
        }
    }
}

module.exports = Round