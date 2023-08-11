import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral +1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <Header1 />
      <Button handleClick={addBad} text='Bad' />
      <Button handleClick={addNeutral} text='Neutral' />
      <Button handleClick={addGood} text='Good' />
      <Header2 />
      <GoodTotal good={good}/>
      <NeutralTotal neutral={neutral} />
      <BadTotal bad={bad} />
    </div>
  )
}

//HEADER COMPONENTS X2
const Header1 = () => <h1>Give Feedback</h1>

const Header2 = () => <h1>Statistics</h1>

//BUTTON COMPONENT
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

//STATS COMPONENTS
const GoodTotal = (props) => <div>Good {props.good}</div>

const NeutralTotal = (props) => <div>Neutral {props.neutral}</div>

const BadTotal = (props) => <div>Bad {props.bad}</div>


export default App