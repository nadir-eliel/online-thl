import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button'
import React from "react";
import './Todo.css'

export const Todo = ({ number }) => {
    return (
       <div className="Todo" >
            <span> { number} </span>
            <span>ASD564</span>
            <span>27/10</span>
            <Button variant="outline-success">REGO</Button>{' '}
            <Button variant="outline-danger">RUC</Button>{' '}

            <div>
                <FontAwesomeIcon icon={faPenToSquare} />
                <FontAwesomeIcon icon={faTrash} onClick={() => console.log("delete it")} />
            </div>
        </div>
    )
}
/** A cada SPAN darle un espaciado para que no quede todo pegado
 *
 */