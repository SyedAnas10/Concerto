import React, { useState } from 'react'
import PokerHand from '../models/pokerHand'

const Round = ({team, playCard}) => {
    const [roundNumber, setRoundNumber] = useState(1)
    const [currentLeader, setCurrentLeader] = useState(team.leader)
    const roundLeader = team.leader

    const play = index => {
        const card = currentLeader.cards[index]
        const player = currentLeader
        playCard(card, player)
        currentLeader.cards.splice(index, 1)
        team.establishNewLeader()
        setCurrentLeader(team.leader)
    }

    return (
        <div>
            <h2> {`Round ${roundNumber} played by Team ${team.teamName} with ${team.leader.name} as the leader`}</h2>
            <h4> {` This is ${currentLeader.name}'s turn`} </h4>
            <ul>
                {currentLeader.cards.map((card, index) => (
                <button style={{marginLeft: 5}} onClick={() => play(index)}>{card.cardName}</button>
                ))}
          </ul>
        </div>
    )
}

export default Round