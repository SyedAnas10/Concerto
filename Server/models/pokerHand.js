const Card = require("./card")
const Player = require("./player")

const pokerHands = {
    SF: "Straight Flush",
    F: "Fours",
    FH: "Full House",
    FL: "Flush",
    ST: "Straight",
    TH: "Threes",
    TP: "Two Pairs",
    P: "Pair"
}

class PokerHand {
    constructor() {
        this.hand = []
        this.score = 0
        this.type = null
    }

    evaluateHand() {
        const values = this.hand.map(card => card.card.value)
        const suits = this.hand.map(card => card.card.suit)
        const uniqueValues = [...new Set(values)]

        // CHECK FOR STRAIGHT FLUSH, THE ROYAL FLUSH IS EQUIVALENT TO STRAIGHT FLUSH
        if ( 
            uniqueValues.length === 5 &&
            suits.every(suit => suit === suits[0]) &&
            (
                Math.max(...values) - Math.min(...values) === 4 ||
                (values.includes('A') && values.includes('K') && values.includes('Q') && values.includes('J') && values.includes("10")) ||
                (values.includes('A') && values.includes('2') && values.includes('3') && values.includes('4') && values.includes("5"))
            )
        ) {
            this.type = pokerHands.SF
        }

        // CHECK FOR FULL HOUSE
        else if (uniqueValues.length === 2) {
            const counts = uniqueValues.map(value => values.filter(v => v === value).length);
            if (counts.includes(2) && counts.includes(3)) {
                this.type = pokerHands.FH
            }
        }

        // CHECK FOR FLUSH
        else if (suits.every(suit => suit === suits[0])) {
            this.type = pokerHands.FL
        }

        // CHECK FOR STRAIGHT
        else if (uniqueValues.length === 5 && Math.max(...values) - Math.min(...values) === 4) {
            this.type = pokerHands.ST
        }

        // CHECK FOR TWO PAIRS
        else if (uniqueValues.length === 3) {
            const counts = uniqueValues.map(value => values.filter(v => v === value).length);
            if (counts.includes(2) && counts.filter(count => count === 2).length === 2) {
              this.type = pokerHands.TP
            }
        }

        // CHECK FOR A PAIR
        else if (uniqueValues.length === 4) {
            this.type = pokerHands.P
        }

        // CHECK FOR FOURS or THREES
        for (let value of uniqueValues) {
            if (values.filter(v => v === value).length === 4) {
                this.type = pokerHands.F
            }
            if (values.filter(v => v === value).length === 3) {
                this.type = pokerHands.TH
            }
        }

        this.evaluateScore()
    }

    evaluateScore() {
        switch (this.type) {
            case pokerHands.SF:
                this.score = 10
                break
            
            case pokerHands.FH:
                this.score = 8
                break
            
            case pokerHands.F:
                this.score = 8
                break

            case pokerHands.FL:
                this.score = 6
                break

            case pokerHands.ST:
                this.score = 5
                break

            case pokerHands.TH:
                this.score = 3
                break
            
            case pokerHands.TP:
                this.score = 2
                break

            case pokerHands.P:
                this.score = 1
                break
        }
    }
}

module.exports = PokerHand