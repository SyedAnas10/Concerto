const Deck = require("./deck");
const Round = require("./round");

class Deal {
    constructor(team1, team2) {
        this.roundNumber = 1
        this.team1 = team1
        this.team2 = team2
        this.team1Score = 0
        this.team2Score = 0
    }

    async playDeal() {
        for (; this.roundNumber < 2 ; this.roundNumber++) {
            const roundNS = new Round(this.team1, this.roundNumber)
            const roundEW = new Round(this.team2, this.roundNumber)
            this.team1Score = this.team1Score + await roundNS.playRound()
            this.team2Score = this.team2Score + await roundEW.playRound()
        }
        console.clear()
        console.log(`Team ${this.team1.teamName} total score is ${this.team1Score}`)
        console.log(`Team ${this.team2.teamName} total score is ${this.team2Score}`)
        console.log(`The Winner of this deal is Team ${this.team1Score > this.team2Score ? this.team1.teamName : this.team2.teamName}.`)
    }
}

module.exports = Deal