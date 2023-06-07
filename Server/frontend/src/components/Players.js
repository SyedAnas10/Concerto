// src/Player.js
import React, { useState } from 'react';
import Player from '../models/player';

const PlayerSignup = ({ onSignup }) => {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSignup = () => {
    if (name.trim() !== '') {
      const newPlayer = new Player(name)
      onSignup(newPlayer);
      setName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
      />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}

export default PlayerSignup;