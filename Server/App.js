import React, { useState } from 'react';

const PokerGame = () => {
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState(Array(4).fill([]));
  const [currentTeam, setCurrentTeam] = useState('A');
  const [round, setRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cardsPlayed, setCardsPlayed] = useState([]);

  const createDeck = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck = [];

    for (let suit of suits) {
      for (let rank of ranks) {
        newDeck.push({ suit, rank });
      }
    }

    return newDeck;
  };

  // Function to shuffle the deck of cards
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const distributeCards = () => {
    const newDeck = createDeck();
    const shuffledDeck = shuffleDeck(newDeck);
    const newPlayers = Array(4).fill([]);

    for (let i = 0; i < shuffledDeck.length; i++) {
      const playerIndex = i % 4;
      newPlayers[playerIndex] = [...newPlayers[playerIndex], shuffledDeck[i]];
    }

    setDeck(shuffledDeck);
    setPlayers(newPlayers);
    setCurrentTeam('A');
    setRound(1);
    setCurrentPlayer(0);
    setCardsPlayed([]);
  };

  const removeCard = (playerIndex, cardIndex) => {
    if (
      (currentTeam === 'A' && (playerIndex === 0 || playerIndex === 1)) ||
      (currentTeam === 'B' && (playerIndex === 2 || playerIndex === 3))
    ) {
      const updatedPlayers = [...players];
      updatedPlayers[playerIndex].splice(cardIndex, 1);
      setPlayers(updatedPlayers);

      if (updatedPlayers[playerIndex].length === 0) {
        setCurrentTeam(currentTeam === 'A' ? 'B' : 'A');
      }

      setCardsPlayed([...cardsPlayed, { playerIndex, cardIndex }]);
      if (cardsPlayed.length === 4) {
        if (currentTeam === 'A' && round === 5) {
          setCurrentTeam('B');
          setRound(1);
        } else if (currentTeam === 'B' && round === 5) {
          setCurrentTeam('A');
          setRound(1);
        } else {
          setRound(round + 1);
        }
        setCurrentPlayer(0);
        setCardsPlayed([]);
      } else {
        setCurrentPlayer((currentPlayer + 1) % 4);
      }
    }
  };

  return (
    <div>
      <h1>Poker Game</h1>
      <button onClick={distributeCards}>Start Game</button>
      <div>
        {players.map((player, playerIndex) => (
          <div key={playerIndex}>
            <h3>Player {playerIndex + 1}</h3>
            {currentPlayer === playerIndex && <p>It's your turn to play!</p>}
            <ol>
              {player.map((card, cardIndex) => (
                <li
                  key={cardIndex}
                  onClick={() => removeCard(playerIndex, cardIndex)}
                  style={{ cursor: 'pointer' }}
                >
                  {card.rank} {card.suit}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <h2>Current Team: Team {currentTeam}</h2>
      <h2>Round: {round}</h2>
    </div>
  );
};

export default PokerGame;
