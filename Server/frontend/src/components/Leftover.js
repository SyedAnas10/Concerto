import React, { useEffect, useState } from 'react'

const Round = ({team, playCard, roundNumber, constructedHand}) => {
    let passCount = JSON.parse(window.localStorage.getItem('passCount')) || 0
    let isDoublePass = (passCount === 2) ? true : false

    const [forced, setForced] = useState(false)

    const [currentLeader, setCurrentLeader] = useState(team.leader)
    const [renderVariable, setRenderVariable] = useState(0)


    const play = index => {
        const card = currentLeader.cards[index]
        const player = currentLeader
        currentLeader.cards.splice(index, 1)
        if (forced) {
            playCard(card, player, forced)
            if (team.leader.cards.length === 0) {
                team.establishNewLeader()
                setCurrentLeader(team.leader)
            } else {
                setRenderVariable(renderVariable + 1)
            }
        } else {
            playCard(card, player, forced)
            team.establishNewLeader()
            setCurrentLeader(team.leader)
        }
    }

    const passCard = () => {
        passCount++
        window.localStorage.setItem('passCount', passCount);
        team.establishNewLeader()
        setCurrentLeader(team.leader)
    }

    const forceTurn = () => {
        setForced(true)
        window.localStorage.setItem('passCount', 2);
        team.establishNewLeader()
        setCurrentLeader(team.leader)
    }

    return (
        <div>
            <h2> {`Round ${roundNumber} played by Team ${team.teamName}`}</h2>
            <h4> {` This is ${currentLeader.name}'s turn`} </h4>
            <button disabled={isDoublePass} style={{marginLeft: 3}} className={!isDoublePass ? 'optionButton':'disabledOptionButton'} onClick={passCard}>PASS</button>
            <button style={{marginLeft: 8}} className={!forced ? 'optionButton':'disabledOptionButton'} onClick={forceTurn}>FORCE</button>
            <ul>
                {currentLeader.cards.map((card, index) => (
                <button className='cardButton' onClick={() => play(index)}>{card.cardName}</button>
                ))}
            </ul>
            <h3> Constructed Hand </h3>
            <ul>
                {constructedHand.hand.map(card => (
                    <li> {card.card.cardName} </li>
                ))}
            </ul>
        </div>
    )
}

export default Round