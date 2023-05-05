const express = require('express')
const Deck = require('./models/deck')

const port = 3000

const app = express()
const newDeck = new Deck()

app.listen(port, () => {
    console.log(`Concerto Server running on port ${port}`)
    console.log(newDeck.cards)
})