const Deck = require("./deck");
const PokerHand = require("./pokerHand");
const Round = require("./round");

class Deal {
    constructor(team1, team2) {
        this.roundNumber = 1
        this.team1 = team1
        this.team2 = team2
        this.team1Score = 0
        this.team2Score = 0
        this.leftoverPokerHand = new PokerHand()
    }

    async playDeal() {
        for (; this.roundNumber < 5 ; this.roundNumber++) {
            const roundNS = new Round(this.team1, this.roundNumber)
            const roundEW = new Round(this.team2, this.roundNumber)
            this.team1Score = this.team1Score + await roundNS.playRound()
            this.team2Score = this.team2Score + await roundEW.playRound()
        }
        console.log(`Team ${this.team1.teamName} total score is ${this.team1Score}`)
        console.log(`Team ${this.team2.teamName} total score is ${this.team2Score}`)
        console.log(`The Winner of this deal is Team ${this.team1Score > this.team2Score ? this.team1.teamName : this.team2.teamName}.`)
        console.log(`LeftOver Cards`)
        if (this.team1Score > this.team2Score) {
            for ( let i = 0; i < this.team2.player1.cards.length; i++) {
                console.log(this.team2.player1.cards[i].cardName)
                this.leftoverPokerHand.hand.push(this.team2.player1.cards[i], this.team2.player1)
            }
            for ( let i = 0; i < this.team2.player2.cards.length; i++) {
                console.log(this.team2.player2.cards[i].cardName)
                this.leftoverPokerHand.hand.push(this.team2.player1.cards[i], this.team2.player2)
            }
            console.log(`LeftOver score added to Team 1`)
        } else {
            for ( let i = 0; i < this.team1.player1.cards.length; i++) {
                console.log(this.team1.player1.cards[i].cardName)
                this.leftoverPokerHand.hand.push(this.team1.player1.cards[i], this.team1.player1)
            }
            for ( let i = 0; i < this.team1.player2.cards.length; i++) {
                console.log(this.team1.player2.cards[i].cardName)
                this.leftoverPokerHand.hand.push(this.team1.player2.cards[i], this.team1.player2)
            }
            console.log(`LeftOver score added to Team 2`)
        }
    }
}

module.exports = Deal