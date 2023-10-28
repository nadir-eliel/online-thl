import React, { useState } from 'react';
import { Todo } from './Todo';
import { v4 as uuidv4 } from "uuid";

export const Tabla = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const generateTodoItems = () => {
    const todoItems = [];

    for (let i = 1; i <= 32; i++) {
      todoItems.push(
        <div key={i} className="col-3">
          <Todo
            key={i}
            number={i}
            editTodo={editTodo}
            clearTodo={clearTodo}
          />
        </div>
      );
    }

    return todoItems;
  };

  const editTodo = (id) => {
    console.log('Editando TODO');
    setTodos(
      todos.map((todo) =>
        todo.key === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const clearTodo = (id) => {
    // TODO: reset de la patente, reset de fecha y de los botones RUC/REGO
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="row">
      {generateTodoItems()}
    </div>
  );
};
