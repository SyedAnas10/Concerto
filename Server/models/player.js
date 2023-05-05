class Player {
    constructor(name) {
        this.name = name
        this.id = Math.random().toString(16).slice(2)
    }
}

module.exports = Player