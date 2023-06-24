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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignup()
    }
  }

  return (
    <div className='Signup-Input'>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default PlayerSignup;