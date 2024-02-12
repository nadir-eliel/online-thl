import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bay } from "./Bay";
import { AlertUpdate } from './AlertUpdate'
import { LoadingSpinner } from './LoadingSpinner'
import { Error } from './Error'
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

    //TODO: Esta función hay que borrarla o rediseñarla
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

    //TODO: terminar este handleReset
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

    if (error) return <div><Error /></div>;
    if (!estacionamientos) return <div><LoadingSpinner /></div>;

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