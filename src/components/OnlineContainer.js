import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bay } from "./Bay";
import { AlertUpdate } from './AlertUpdate'
import Button from 'react-bootstrap/Button';
import useSWR from 'swr'

import { ResetConfirmation } from "./ResetConfirmation";
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_API_URL_LOCAL)

uuidv4()

export const fetcher = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export const OnlineContainer = () => {
    const [isUpdated, setIsUpdated] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [keyword, setKeyword] = useState('');

    /*
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
            const response = await fetch(`${process.env.REACT_APP_API_URL_LOCAL}/api/bays`);

            if (response.ok) {
                const data = await response.json();
                setBays(data);
            } else {
                console.error('Error al obtener datos de la API:', response.status);
            }
        } catch (error) {
            console.error('Error en la llamada a la API:', error);
        }
    };
    */

    const chunkArray = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const renderColumns = (estacionamientos) => {
        return estacionamientos.map((bay, rowIndex) => (
            <Bay
                key={bay.idbay}
                idbay={bay.idbay}
                plate={bay.plate}
                date={bay.date}
                ruc={bay.ruc}
                rego={bay.rego}
                socket={socket}
            />
        ))
    }

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

                const response = await fetch(`${process.env.REACT_APP_API_URL_LOCAL}/api/bays/reset?reset=clean`, {
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
            //setBays([]);
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

    // using SWR
    const { data: estacionamientos, error } = useSWR(`${process.env.REACT_APP_API_URL_LOCAL}/api/bays`, fetcher);

    if (error) return <div>Error fetching data</div>;
    if (!estacionamientos) return <div>Loading...</div>;

    return (
        <div className="OnlineContainer">
            <h1 className="title">Online Container</h1>
            <AlertUpdate isUpdated={isUpdated} closeToast={closeToast} />
            <div className="bayContainer">
                {estacionamientos.map((bay, rowIndex) => (
                    <Bay
                        key={rowIndex}
                        bay={bay}
                        socket={socket}
                    />
                ))}
            </div>
        </div>
    );
}