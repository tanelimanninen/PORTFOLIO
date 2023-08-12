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
      <Statistics good={good} neutral={neutral} bad={bad} />
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

//COMPONENT TO UNITE ALL STATISTICS
const Statistics = (props) => {
  const totalFeedback = props.good + props.neutral + props.bad

  if (totalFeedback === 0) {
    return <p>No feedback data yet.</p>
  }

  return (
    <div>
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine type="TotalAll" text="Total" value={totalFeedback} good={props.good} neutral={props.neutral} bad={props.bad} />
      <StatisticLine type="Average" text="Average" good={props.good} neutral={props.neutral} bad={props.bad} />
      <StatisticLine type="Positives" text="Positives" good={props.good} neutral={props.neutral} bad={props.bad} />
    </div>
  )
}

//SINGLE STAT COMPONENT LINE
const StatisticLine = (props) => {
  // CALCULATE SUM OF FEEDBACK
  const totalFeedback = props.good + props.neutral + props.bad

  // CALCULATE AVERAGE OF FEEDBACK
  const calculateAverage = () => {
    return totalFeedback === 0 ? 0 : (props.good - props.bad) / totalFeedback
  };

  // CALCULATE POSITIVE PROCENTAGE OF FEEDBACK
  const calculatePositives = () => {
    return totalFeedback === 0 ? 0 : (props.good / totalFeedback) 
  };

  let value = props.value;

  if (props.type === 'TotalAll') {
    value = totalFeedback
  } else if (props.type === 'Average') {
    value = calculateAverage()
  } else if (props.type === 'Positives') {
    value = calculatePositives()
  }

  return (
    <div>
      {props.text}: {value}
    </div>
  )
}


export default App