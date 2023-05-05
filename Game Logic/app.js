const Deck = require("./deck")

const deck = Deck()

function listCards() {
    for (card in deck) {
        console.log(card)
    }
}

listCards()