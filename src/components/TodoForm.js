import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {

    const [value, setValue] = useState("")
    const handleSubmit = evt => {
        evt.preventDefault()
        addTodo(value)
        setValue("")
    }
    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text"
                value={value}
                className="todo-input"
                placeholder="What?"
                onChange={(evt) => setValue(evt.target.value)} />
            <button type="submit" className="todo-btn">add task</button>
        </form>
    )
}