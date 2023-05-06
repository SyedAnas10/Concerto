class Team {
    constructor(player1, player2, teamName) {
        this.player1 = player1
        this.player2 = player2
        this.teamName = teamName
        this.leader = this.player1
    }
}

module.exports = Team