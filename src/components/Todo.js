import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button'
import React from "react";

export const Todo = ({ number, editTodo, clearTodo }) => {
    return (
        <div className="Todo" >
            <span className="BayNumber"> {number} </span>
            <span>ASD54</span>
            <span>27/10</span>
            {/* <Button variant="outline-success">REGO</Button>{' '}
            <Button variant="outline-danger">RUC</Button>{' '} */}

            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo()} />
                <FontAwesomeIcon icon={faTrash} onClick={() => clearTodo()} />
            </div>
        </div>
    )
}
