const express = require('express')
const path = require('path')

const Deal = require('./models/deal')
const Deck = require('./models/deck')
const Player = require('./models/player')
const Round = require('./models/round')
const Team = require('./models/team')

const port = 80

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

// COMMENCING DEAL
const deal = new Deal(teamNS, teamEW)

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath);
})


app.listen(port, () => {
    console.log(`Concerto Server running on port ${port}`)
    
    deal.playDeal()
})