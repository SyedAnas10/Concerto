// src/App.js
import React, { useEffect, useState } from 'react';
import PlayerSignup from './components/Players';
import Team from './models/team';
import Deal from './models/deal';
import Round from './components/Round';
import Deck from './models/deck';
import PokerHand from './models/pokerHand';
import Modal from './components/DealtCardsModal';

function App() {

  const [gameCompleted, setGameComplete] = useState(false)
  const [gameWinner, setGameWinner] = useState(null)

  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [deal, setDeal] = useState(null);
  const [playingTeam, setPlayingTeam] = useState(null)
  const [roundNumber, setRoundNumber] = useState(0)

  let dealNumber = JSON.parse(window.localStorage.getItem('dealNumber')) || 0

  const [team1score, setteam1score] = useState(0)
  const [team2score, setteam2score] = useState(0)

  const [team1Hand, setTeam1Hand] = useState(null)
  const [team2Hand, setTeam2Hand] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const cardList = []
  const constructedHand = new PokerHand()


  const playCard = (card, player, forced) => {
    cardList.push(card.cardName)
    console.log(cardList)
    if (!forced) {
      window.localStorage.setItem('passCount', 0);
    }
    constructedHand.hand.push({ card, player})
    if (constructedHand.hand.length === 5) {
      constructedHand.evaluateHand()
      window.localStorage.setItem('passCount', 0);
      if(playingTeam === deal.team1) {
        setteam1score(team1score + constructedHand.score)
        setTeam1Hand(constructedHand.type)
      } else {
        setteam2score(team2score + constructedHand.score)
        setTeam2Hand(constructedHand.type)
      }
      setRoundNumber(roundNumber+1)
    }
  }

  useEffect(() => {
    if (deal) {
      console.log(`deal number ${dealNumber}`) 
      if (dealNumber % 2 === 0) {
        if (roundNumber % 2 === 0) {
          setPlayingTeam(deal.team1)
        } else {
          setPlayingTeam(deal.team2)
        }
      } else {
        if (roundNumber % 2 === 0) {
          setPlayingTeam(deal.team2)
        } else {
          setPlayingTeam(deal.team1)
        }
      }
      
    }
  }, [roundNumber, deal, dealNumber])
  

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
    window.localStorage.setItem('dealNumber', 0);
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

  const startNewDeal = () => {
    players[0].cards = []
    players[1].cards = []
    players[2].cards = []
    players[3].cards = []

    if (dealNumber === 4 ) {
      setGameComplete(true)
      if (team1score > team2score) {
        setGameWinner(deal.team1)
      } else {
        setGameWinner(deal.team2)
      }
    } else {
      window.localStorage.setItem('dealNumber', dealNumber+1);
  
      setTeam1Hand(null)
      setTeam2Hand(null)
      setRoundNumber(0)
      dealCards(players)
      setPlayingTeam(dealNumber % 2 === 0 ? deal.team2 : deal.team1)
    }
  }

  const startNewGame = () => {
    window.location.reload()
  }

  return (
    <div className='Board'>
      {!ready && (
        <div className='Signup'>
          {(players.length !== 4 && (
            <div>
              <h1 style={{ marginLeft: '10px', fontFamily: 'cursive', letterSpacing: '5px'}}>Player Signup</h1>
              <PlayerSignup onSignup={handlePlayerSignup} />
              <h2 style={{ fontFamily: 'cursive', textDecorationLine: 'overline'}}>PLAYERS POOL</h2>
              <ul style={{ listStyle: 'georgian outside url("/non-existent.svg")'}}>
                {players.map((player) => (
                  <li style={{ font: 'status-bar', fontFamily: 'cursive', fontSize: '15px'}} key={player.id}>{player.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {(players.length === 4 && !ready) && (
        <div className='TeamBox'>
          <h3> North South <br />
            {`${deal.team1.player1.name}`} and {`${deal.team1.player2.name}`} 
          </h3>
          <h3>East West <br />
            {`${deal.team2.player1.name}`} and {`${deal.team2.player2.name}`} 
          </h3>
          <button onClick={() => setReady(true)}>Start Game</button>
        </div>
      )}
      {ready && !gameCompleted && (
        <div className='App'> 
          {(playingTeam === deal.team1 && roundNumber < 8) && (
            <Round 
              team={deal.team1} 
              playCard={playCard} 
              roundNumber={roundNumber+1} 
              constructedHand={constructedHand}
            />
          )}
          {(playingTeam === deal.team2 && roundNumber < 8) && (
            <Round 
              team={deal.team2} 
              playCard={playCard} 
              roundNumber={roundNumber+1} 
              constructedHand={constructedHand}
            />
          )}
          {roundNumber === 8 && (
            <div>
              <h2>Deal Completed!</h2>
              <button onClick={startNewDeal} className='continueButton'> Continue </button>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{marginLeft: 'auto'}}>
              <h2> SCORE </h2>
              <h4> North South : {team1score} ({team1Hand || `none`}) </h4>
              <h4> East West : {team2score} ({team2Hand || `none`})</h4>
            </div>
          </div>
        </div>
      )}
      {gameCompleted && (
        <div>
          <h2> Game Completed </h2>
          <h3> Winners </h3>
          <h1> Team {gameWinner.teamName} </h1>
          <button onClick={startNewGame} className='continueButton'> Play Again! </button>
        </div>
      )}
    </div>
  );
}

export default App;
