const express = require('express')
const Deck = require('./models/deck')
const Player = require('./models/player')
const Round = require('./models/round')
const Team = require('./models/team')

const port = 3000

const app = express()
const newDeck = new Deck()

// SETTING UP PLAYERS
const player1 = new Player("Anas")
const player2 = new Player("Saad")
const player3 = new Player("Nauman")
const player4 = new Player("Carl")

// SETTING UP TEAMS
const teamNS = new Team(player1, player2, 'North South')
const teamEW = new Team(player3, player4, 'East West')

// DEALING CARDS
for( let i = 0; i < 13; i++) {
    player1.cards.push(newDeck.draw())
    player2.cards.push(newDeck.draw())
    player3.cards.push(newDeck.draw())
    player4.cards.push(newDeck.draw())
}

// CONSTRUCTING POKER HAND
const round = new Round(player4, teamNS)


app.listen(port, () => {
    console.log(`Concerto Server running on port ${port}`)
    
    for (let i = 0; i < 2; i++) {
        round.play(player1.cards.pop(), teamNS.player1)
        round.play(player2.cards.pop(), teamNS.player2)
    }
    round.play(player1.cards.pop(), teamNS.player1)
})