import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from 'uuid'
import { Table } from 'react-bootstrap';
import { Tabla } from "./Tabla";
uuidv4()

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false }
        ])
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className="TodoWrapper">
            {/* <TodoForm addTodo={addTodo} /> */}
            <h1>ON LINE</h1>
            <Tabla rows={4} cols={4} />
        </div>
    )
}