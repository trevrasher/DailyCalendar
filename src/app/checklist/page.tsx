"use client";
import { useState } from 'react';

interface Todo {
    text:string;
    completed:boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Next.js', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ])

  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    setTodos([
      ...todos,
      { id: todos.length+1, text: newTodo, completed: false }
    ]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); 
  };


 return (
    <div className="todo-container">
      <h1 className="card">Todo List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add</button>
      </form>
      <div className ="todo-body"> 
        {todos.map((item) => {
          return(
            <div key={item.id} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  setTodos(todos.map(todo => 
                    todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
                  ));
                }}
              />
              <span className={item.completed ? 'completed' : ''}>{item.text}</span>
              <button onClick={() => deleteTodo(item.id)} className="delete-button">
                 X
            </button>
                  </div>
          )
        })}
      </div>
    </div>
 );
};