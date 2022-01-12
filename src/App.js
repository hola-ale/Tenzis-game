import './App.css';
import Die from './Components/Die/Die';
import React from 'react';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i=0; i<10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }
  function rollDice() {
    setDice(allNewDice())
  }

  const diceElement = dice.map(num => <Die value={num} />)
 
  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='btn-roll' onClick={rollDice}>Roll
      </button> 
    </main>
  );
}
