class Team {
    constructor(player1, player2, teamName) {
        this.teamName = teamName
        this.player1 = player1
        this.player2 = player2
        this.leader = player1
        this.supporter = player2
    }

    establishNewLeader() {
        this.leader = this.leader === this.player1 ? this.player2 : this.player1
        this.supporter = this.supporter === this.player1 ? this.player2 : this.player1
    }
}

module.exports = Team