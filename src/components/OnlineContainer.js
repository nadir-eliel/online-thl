import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bay } from "./Bay";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { ResetConfirmation } from "./ResetConfirmation";
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

uuidv4()

export const OnlineContainer = () => {
    const [bays, setBays] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const receiveUpdate = (data) => {
            // console.log({ data })
            setIsUpdated(true)
        }

        socket.on('put-broadcast', receiveUpdate)

        return () => {
            socket.off('put-broadcast', receiveUpdate);
        };
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/bays');

            if (response.ok) {
                const data = await response.json();
                setBays(data.slice(0, 4));
            } else {
                console.error('Error al obtener datos de la API:', response.status);
            }
        } catch (error) {
            console.error('Error en la llamada a la API:', error);
        }
    };

    const chunkArray = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const renderColumns = () => {
        console.log({ bays })
        return bays.map((bay) => (
            <Bay key={bay.idbay}
                idbay={bay.idbay}
                plate={bay.plate}
                date={bay.date}
                ruc={bay.ruc}
                rego={bay.rego}
                socket={socket} />
        ))
        /*const chunkedOnline = chunkArray(bays, 8);

        return chunkedOnline.map((column, columnIndex) => (
            <div key={columnIndex} className="col-3">
                {column.map((bay, rowIndex) => (
                    <Bay
                        key={rowIndex}
                        position={bay.idbay}
                        plate={bay.plate}
                        date={bay.date}
                        ruc={bay.ruc}
                        rego={bay.rego}
                        socket={socket}
                        className="bay-item"
                    />
                ))}
            </div>
        ));*/
    };

    const handleConfirmationShow = () => {
        setShowConfirmation(true);
    };

    const handleConfirmationClose = () => {
        setShowConfirmation(false);
        setKeyword('');
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleReset = async () => {

        if (keyword === 'clean') {
            // for (let index = 1; index <= 32; index++) {
            try {

                const response = await fetch(`http://localhost:4000/api/bays/reset?reset=clean`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al guardar los cambios');
                }

                response.json();
            } catch (error) {
                console.error('Error al guardar los cambios:', error.message);
            }
            //  }
            setBays([]);
            handleConfirmationClose();
            renderColumns()
        } else {
            alert('Palabra clave incorrecta');
        }
    }

    const closeToast = () => {
        setIsUpdated(!isUpdated);
        window.location.reload()
    }

    return (
        <div className="OnlineContainer">
            <h1>Online Container</h1>

            <Toast show={isUpdated} onClose={closeToast}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Atention!</strong>
                </Toast.Header>
                <Toast.Body>Woohoo, you're seeing an old version, close this to see the latest version!</Toast.Body>
            </Toast>
            {renderColumns()}
        </div>
    );
}