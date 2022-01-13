import './App.css';
import Die from './Components/Die/Die';
import React from 'react';
import { nanoid } from 'nanoid'; 
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])
   

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    const newDice = []
    for (let i=0; i<10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie() 
    })
    )
  }
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
     }))
  }
  function resetGame() {
    setDice(allNewDice())
    setTenzies(false)
  }
  const diceElement = dice.map(obj => <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} holdDice={() => holdDice(obj.id)} />)


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='btn-roll' onClick={tenzies ? resetGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button> 
    </main>
  );
}
