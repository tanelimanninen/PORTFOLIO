import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])

  const employeeItems = employees.map((employee,index) =>
  <Employee key={index} employee={employee}/>
  );

  return (
    <div className="App">
      {employeeItems}
    </div>
  );
}

function Employee(props) {
  return (
    <div className="Employee">
      <img alt='employeeimage' src={props.employee.image}></img>
      <h2>{props.employee.firstname} {props.employee.lastname}</h2>
      <p>{props.employee.email}</p>
      <p>{props.employee.phone}</p>
    </div>
  )
}

export default App;
