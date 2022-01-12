import './App.css';
import Die from './Components/Die/Die';
import React from 'react';
import { nanoid } from 'nanoid'; 

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i=0; i<10; i++) {
      newDice.push(
        {value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      )
    }
    return newDice
  }
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      if (die.isHeld) {
        return die
      } else {
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      }
    })
    )
  }
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
     }))
  }

  const diceElement = dice.map(obj => <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} holdDice={() => holdDice(obj.id)} />)
 
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
