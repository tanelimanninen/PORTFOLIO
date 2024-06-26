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
      <Header text='Give Feedback' />
      <Button handleClick={addBad} text='Bad' />
      <Button handleClick={addNeutral} text='Neutral' />
      <Button handleClick={addGood} text='Good' />
      <Header text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


//HEADER COMPONENT
const Header = (props) => <h1>{props.text}</h1>

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
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td><StatisticLine value={props.good} /></td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td><StatisticLine value={props.neutral} /></td>
        </tr>
        <tr>
          <td>Bad</td>
          <td><StatisticLine value={props.bad} /></td>
        </tr>
        <tr>
          <td>Total</td>
          <td><StatisticLine type="TotalAll" value={totalFeedback} good={props.good} neutral={props.neutral} bad={props.bad} /></td>
        </tr>
        <tr>
          <td>Average</td>
          <td><StatisticLine type="Average" value={totalFeedback} good={props.good} neutral={props.neutral} bad={props.bad} /></td>
        </tr>
        <tr>
          <td>Positives</td>
          <td><StatisticLine type="Positives" value={totalFeedback} good={props.good} neutral={props.neutral} bad={props.bad} /></td>
        </tr>
      </tbody>
    </table>
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
      {props.text} {value}
    </div>
  )
}


export default App