import React, { useState } from 'react'
import Deck from '../models/deck'

const Game = ({teams}) => {

    const [dealNumber, setDealNumber] = useState(1)
    const [roundNumber, setRoundNumber] = useState(1)
    const team1 = teams[0]
    const team2 = teams[2]
    const [team1Score, setTeam1Score] = useState(0)
    const [team2Score, setTeam2Score] = useState(0)
    const [playingTeam, setPlayingTeam] = useState(team1)

    console.log('=> ', teams)
    return (
        <div>
            <h2>{`    Deal ${dealNumber} Round ${roundNumber} `}</h2>
            <h5>{`played by Team ${playingTeam.teamName} with ${playingTeam.leader.name} as a leader`}</h5>
        </div>
    )
}

export default Game