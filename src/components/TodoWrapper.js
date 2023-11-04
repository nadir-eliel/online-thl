import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bay } from "./Bay";
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
            <h1>ON LINE</h1>
            <Bay />
        </div>
    )
}