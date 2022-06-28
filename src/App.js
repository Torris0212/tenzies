import React from 'react'
import Die from './components/Die'
import Button from './components/Button'
import Statistics from './components/Statistics'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rollCount, setRollCount] = React.useState(0)
  const [timer, setTimer] = React.useState(0)
  const [bestRollClicked, setBestRollClicked] = React.useState(0)
  const [bestTimeUsed, setBestTimeUsed] = React.useState(0)

  React.useEffect(() => {
    const isAllHeld = dice.every(die => die.isHeld === true)
    const firstDiceValue = dice[0].value
    const isAllSameValue = dice.every(die => die.value === firstDiceValue)
    if (isAllHeld && isAllSameValue) setTenzies(true)
  }, [dice])

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prevTimer => tenzies ? prevTimer : prevTimer + 1)
    }, 1000);
    return () => clearInterval(timerId);
  }, [tenzies])

  function allNewDice() {
    const diceArray = []
    for (let i = 0; i< 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return diceArray
  }

  const diceElements = dice.map(die => 
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={holdDice} />
  )

  const roll = () => {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setRollCount(0)
      setTimer(0);
      setBestRollClicked(prevBestRollClicked => prevBestRollClicked === 0 ? rollCount : prevBestRollClicked > rollCount ? rollCount : prevBestRollClicked)
      setBestTimeUsed(prevBestTimeUsed => prevBestTimeUsed === 0 ? timer : prevBestTimeUsed > timer ? timer : prevBestTimeUsed)
    } else {
      setDice(prevDice => prevDice.map(die => 
        die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}))
      setRollCount(prevRollCount => prevRollCount + 1)
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die =>
      die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <Button roll={roll} tenzies={tenzies} />
      <Statistics count={rollCount} timer={timer} bestRollClicked={bestRollClicked} bestTimeUsed={bestTimeUsed} />
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
