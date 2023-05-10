const prompt = require("prompt-async")
const PokerHand = require("./pokerHand")

class Round {
    constructor(team, roundNumber) {
        this.team = team
        this.roundNumber = roundNumber
        this.constructedHand = new PokerHand()
        this.turnOption = null
    }

    // COMMENCING THE ROUND OF A DEAL. ONE TEAM PER ROUND
    async playRound() {
        console.clear()
        console.log(`
        Round ${this.roundNumber} \n Team ${this.team.teamName} playing with ${this.team.leader.name} as a Leader
        `)
        await this.selectCard(this.team.leader)
        while( this.constructedHand.hand.length < 5 ) {
            console.log(`1.Play   2.Pass`)
            prompt.start()
            const {turnOption} = await prompt.get([`Select option for your turn ${this.team.supporter.name}`])
            this.turnOption = turnOption
            if (this.turnOption === 1) {
                console.log(`You have selected option ${this.turnOption}`)
                await this.selectCard(this.team.supporter)
            }
            else {
                console.log(`${this.team.supporter.name} has Passed its turn.`)
                prompt.start()
                const {turnOption} = await prompt.get([`Select option for your turn ${this.team.leader.name}`])
                this.turnOption = turnOption
                console.log(`You have selected option ${this.turnOption}`)
                if (this.turnOption === 1) {
                    await this.selectCard(this.team.leader)
                }
                else {
                    await this.selectCard(this.team.supporter)
                }
            }
            
        }
        this.team.establishNewLeader()
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