// src/App.js
import React, { useEffect, useState } from 'react';
import PlayerSignup from './components/Players';
import Team from './models/team';
import Deal from './models/deal';
import Round from './components/Round';
import Deck from './models/deck';
import PokerHand from './models/pokerHand';

function App() {
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [deal, setDeal] = useState(null);
  const [playingTeam, setPlayingTeam] = useState(null)
  const [roundNumber, setRoundNumber] = useState(1)

  const [team1score, setteam1score] = useState(0)
  const [team2score, setteam2score] = useState(0)

  const cardList = []
  const constructedHand = new PokerHand()

  const playCard = (card, player) => {
    cardList.push(card.cardName)
    constructedHand.hand.push({ card, player})
    if (constructedHand.hand.length === 5) {
      constructedHand.evaluateHand()
      console.log(`The card in the hands are`)
      constructedHand.hand.map(card => console.log(card.card.cardName))
      console.log(`
          \n The hand constructed by team is ${constructedHand.type} \n
          The score is ${constructedHand.score}
      `)
      if(playingTeam === deal.team1) {
        setteam1score(team1score + constructedHand.score)
      } else {
        setteam2score(team2score + constructedHand.score)
      }
      setDealNumber(dealNumber+1)
      setRoundNumber(roundNumber+1)
    }
    else {
      console.log(`The card in the hands are`, constructedHand)
      constructedHand.hand.map(card => console.log(card.card.cardName))
    }
  }

  const [dealNumber, setDealNumber] = useState(0)
  useEffect(() => {
    if (deal) {
      if (dealNumber % 2 === 0) {
        setPlayingTeam(deal.team1)
      } else {
        setPlayingTeam(deal.team2)
      }
    }
  }, [dealNumber])
  

  const handlePlayerSignup = async (player) => {
    const updatedPlayers = [...players, player];
    setPlayers(updatedPlayers);

    if (updatedPlayers.length === 4) {
      dealCards(updatedPlayers)
      formTeams(updatedPlayers)
    }
  };

  const formTeams = players => {
    const team1 = new Team(players[0], players[1], 'North South');
    const team2 = new Team(players[2], players[3], 'East West');
    const deal = new Deal(team1, team2);
    setDeal(deal)
    setPlayingTeam(deal.team1)
  }

  const dealCards = players => {
    const newDeck = new Deck()
    for( let i = 0; i < 13; i++) {
      players[0].cards.push(newDeck.draw())
      players[1].cards.push(newDeck.draw())
      players[2].cards.push(newDeck.draw())
      players[3].cards.push(newDeck.draw())
  }
  }

  return (
    <div className="App">
      {!ready && (
        <div className='App'>
          {(players.length !== 4 && (
            <div>
              <h1>Player Sign-up</h1>
              <PlayerSignup onSignup={handlePlayerSignup} />
            </div>
          ))}
          <h2>Player's Pool:</h2>
          <ul>
            {players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
      {(players.length === 4 && !ready) && (
        <div>
          <h6>Team North South: {`${deal.team1.player1.name}`} and {`${deal.team1.player2.name}`} </h6>
          <h6>Team East West: {`${deal.team2.player1.name}`} and {`${deal.team2.player2.name}`} </h6>
          <button onClick={() => setReady(true)}>Start Game</button>
        </div>
      )}
      {ready && (
        <div className='App'>
          {(playingTeam === deal.team1 && roundNumber < 9) && (
            <Round team={deal.team1} playCard={playCard} roundNumber={roundNumber} constructedHand={constructedHand}/>
          )}
          {(playingTeam === deal.team2 && roundNumber < 9) && (
            <Round team={deal.team2} playCard={playCard} roundNumber={roundNumber} constructedHand={constructedHand}/>
          )}
          {roundNumber === 9 && (
            <div>
              <h2>Deal Completed!</h2>
              <h4>Check below to see the scores</h4>
            </div>
          )}
          <div>
            <h4> Team North South Score </h4>
            <p> {team1score} </p>
            <h4> Team East West Score </h4>
            <p> {team2score} </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
