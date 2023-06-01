const prompt = require("prompt-async")
const PokerHand = require("./pokerHand")

class Round {
    constructor(team, roundNumber) {
        this.team = team
        this.roundNumber = roundNumber
        this.constructedHand = new PokerHand()
        this.turnOption = null
        this.passAvailable = true
        this.passCount = 0
    }

    // COMMENCING THE ROUND OF A DEAL. ONE TEAM PER ROUND
    async playRound() {
        console.clear()
        console.log(`
        Round ${this.roundNumber} \n Team ${this.team.teamName} playing with ${this.team.leader.name} as a Leader
        `)
        let roundLeader = this.team.leader
        // LEADER WILL ALWAYS PLAY CARD ON THE FIRST TURN
        await this.selectCard(this.team.leader)
        this.team.establishNewLeader()
        // LOOP WHILE A POKER HAND IS NOT COMPLETED
        while( this.constructedHand.hand.length < 5 ) {
            console.log(`1.Play   2.Pass`)
            prompt.start()
            const {turnOption} = await prompt.get(['turnOption'])
            this.turnOption = turnOption
            if (this.turnOption === '1') {
                await this.selectCard(this.team.leader)
                this.passCount = 0
                this.passAvailable = true
                this.team.establishNewLeader()
            }
            else if(this.turnOption === '2') {
                if (this.passAvailable)
                    this.pass()
                else 
                    console.log(`You can not pass twice. Please select option to play the card.`)
            }
            
        }
        if (roundLeader === this.team.leader) {
            this.team.establishNewLeader()
        }
        return this.constructedHand.score
    }

    // LOGIC OF PLAY, PASS, AND FORCE TO BE IMPLEMENTED.
    play(card, player) {
        this.constructedHand.hand.push({
            card,
            player
        })
        if (this.constructedHand.hand.length === 5) {
            this.constructedHand.evaluateHand()
            console.log(`The card in the hands are`)
            this.constructedHand.hand.map(card => console.log(card.card.cardName))
            console.log(`
                \n The hand constructed by team ${this.team.teamName} is ${this.constructedHand.type} \n
                The score is ${this.constructedHand.score}
            `)
        }
        else {
            console.log(`The card in the hands are`)
            this.constructedHand.hand.map(card => console.log(card.card.cardName))
        }
    }

    pass() {
        console.log(` ${this.team.leader.name} has passed its turn. ${this.team.supporter.name} please make your choice...`)
        this.passCount++
        this.passAvailable = !!(this.passCount !== 2)
        this.team.establishNewLeader()
    }

    force() {

    }

    async selectCard(player) {
        console.log(`\n ${player.name}, please enter the number to select the card to be played`)
        this.listCards(player)
        prompt.start()
        const {selectedCard} = await prompt.get(['selectedCard'])
        this.play(player.cards[selectedCard], player)
        player.cards.splice(selectedCard, 1)
    }

    listCards(player) {
        for( let i = 0 ; i < player.cards.length; i++) {
            console.log(`${i}) ${player.cards[i].cardName}`)
        }
    }
}

module.exports = Round