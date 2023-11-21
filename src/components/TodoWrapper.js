import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bay } from "./Bay";
import io from 'socket.io-client';

uuidv4()
const socket = io.connect("http://localhost:4000/");

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://online-thl-backend-o1it.vercel.app/api/bays');

                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
                } else {
                    console.error('Error al obtener datos de la API:', response.status);
                }
            } catch (error) {
                console.error('Error en la llamada a la API:', error);
            }
        };

        fetchData();

         socket.on('put-event', (data) => {
             console.log('Evento PUT recibido:', data);
         });
    }, []);

    const addTodo = todo => {
        setTodos([...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false }
        ])
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const chunkArray = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const renderColumns = () => {
        const chunkedTodos = chunkArray(todos, 8);

        return chunkedTodos.map((column, columnIndex) => (
            <div key={columnIndex} className="col-3">
                {column.map((bay, rowIndex) => (
                    <Bay
                        key={rowIndex}
                        position={bay.idbay}
                        plate={bay.plate}
                        date={bay.date}
                        ruc={bay.ruc}
                        rego={bay.rego}
                        className="bay-item"
                    />
                ))}
            </div>
        ));
    };

    return (
        <div className="TodoWrapper">
            <h1>ON LINE</h1>
            <div className="row">
                {renderColumns()}
            </div>
        </div>
    );
}