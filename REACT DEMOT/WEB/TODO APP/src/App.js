import React, { useState } from 'react';
import './App.css';


function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  // add a new item -- old function way
  //function handleSubmit(e) {
  // or JavaScript ES6 - arrow function
  const handleSubmit = (event) => {
    // prevent normal submit event
    event.preventDefault();
    // add item to items, Math.random() is used to generate "unique" ID...
    setItems([...items, {id: Math.random(), text: itemText}])
    // modify newItem text to ""
    setItemText("")
  }

  // remove item -- old function way
  // function removeItem(id) {
  // or JavaScript  - lambda or arrow function
  const removeItem = (id) => {
    // filter/remove item with id
    const newItems = items.filter(item => item.id !== id);
    // set new items
    setItems(newItems);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' 
               value={itemText} 
               onChange={event => setItemText(event.target.value)} 
               placeholder="Write a new todo here"/>
        <input type='submit' value='Add'/>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text+" "} <span onClick={() => removeItem(item.id)}> x </span>
          </li>
        ))}
      </ul> 
    </div>
  )  
}

function App() {
  return (
    <div>
      <Banner/>
      <ToDoFormAndList/>
    </div>
  );
}

export default App;
