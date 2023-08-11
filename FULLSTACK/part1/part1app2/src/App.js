import { useState } from 'react'

const sum = (p1, p2, p3) => {
  return p1 + p2 + p3
}

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
      <TotalAll good={good} neutral={neutral} bad={bad} />
      <Avarage good={good} neutral={neutral} bad={bad}/>
      <Positives good={good} neutral={neutral} bad={bad}/>
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
const GoodTotal = (props) => <div>Good: {props.good}</div>

const NeutralTotal = (props) => <div>Neutral: {props.neutral}</div>

const BadTotal = (props) => <div>Bad: {props.bad}</div>

const TotalAll = (props) => {
  const result = sum(props.good, props.neutral, props.bad)
  //console.log(result)

  return (
    <div>All: {result}</div>
  )
}

//CALCULATOR COMPONENTS
const Avarage = (props) => {
  const avarage = (p1, p2, p3) => {
    return p3 === 0 ? 0 : (p1 - p2) / p3
  }

  const summ = sum(props.good, props.neutral, props.bad)

  const result2 = avarage(props.good, props.bad, summ)

  return (
    <div>Avarage: {result2}</div>
  )
}

const Positives = (props) => {
  const procent = (p1, p2,) => {
    return p2 === 0 ? 0 : p1 / p2
  }

  const summ = sum(props.good, props.neutral, props.bad)
  const result3 = procent(props.good, summ)

  return (
    <div>Positive: {result3}</div>
  )
}


export default App