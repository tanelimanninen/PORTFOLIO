import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";
import React, { useState } from 'react';
import './App.css';

//ACTIONS AS CONSTS

const addTodo = text => ({ type: 'ADD_TODO', text, id: Math.random() })

const removeTodo = id => ({ type: 'REMOVE_TODO', id })


// Redux Reducer
function todosReducer(state = { todos:[] }, action)  {
  switch (action.type) {
    case 'ADD_TODO': 
      return { // returning a copy of orignal state 
        ...state, //copying the original state
        todos: [...state.todos, {text: action.text, id: action.id}] //new todos array 
      }
    case 'REMOVE_TODO':
      const newTodos = state.todos.filter(todo => todo.id !== action.id);
      return {
        ...state, 
        todos: newTodos
      }
    default: return state;
  }
}

function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos);

  // add a new item
  const handleSubmit = (event) => {
    // prevent normal submit event
    event.preventDefault();
    // use redux to store a new todo
    dispatch(addTodo(itemText))
    // modify newItem text to ""
    setItemText("")
  }

  // remove item
  const removeItem = (id) => {
    // use redux
    dispatch(removeTodo(id))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
        <input type='submit' value='Add'/>
      </form>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text+" "} <span onClick={() => removeItem(item.id)}> delete </span>
          </li>
        ))}
      </ul>   
    </div>
  )  
}

function App() {

  const store = createStore(todosReducer)

  return (
    <div>
      <Provider store={store}>
        <Banner/>
        <ToDoFormAndList/>
      </Provider>
  </div>    
  );
}

export default App;
