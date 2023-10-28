import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from 'uuid'
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
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                <Todo task={todo}
                    key={index}
                    deleteTodo={deleteTodo} />
            ))}
        </div>
    )
}