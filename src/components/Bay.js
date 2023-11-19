import React, { useState } from 'react';
import { BayModal } from './BayModal';

export const Bay = ({ position, plate, date, ruc, rego }) => {

    const [plateText, setPlateText] = useState(plate);
    const [dateText, setDateText] = useState(date);
    const [rucValue, setRucValue] = useState(ruc);
    const [regoValue, setRegoValue] = useState(rego);
    const [isEditing, setIsEditing] = useState(false);



    const handleRucClick = () => {
        setRucValue(!rucValue); // Cambiar el valor de RUC
    };

    const handleRegoClick = () => {
        setRegoValue(!regoValue); // Cambiar el valor de REGO
    };

    const handleEditPlateDateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(!isEditing);
    }

    const handleSave = (updatedPlate, updatedDate, updatedRuc, updatedRego) => {

        setPlateText(updatedPlate);
        setDateText(updatedDate);
        setRucValue(updatedRuc);
        setRegoValue(updatedRego);
    };

    return (
        <div className="editable-item">
            {isEditing ? (
                <BayModal
                    position={position}
                    plate={plate}
                    date={date}
                    ruc={ruc}
                    rego={rego}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="dark-background">
                    <div className="container">
                        <div className="number-container" onClick={() => setIsEditing(!isEditing)}>
                            <p>{position}</p>
                        </div>
                        <div className="div-2 inline-labels">
                            <p>
                                <label htmlFor="date">{plateText}</label>
                            </p>
                            <p>
                                <label htmlFor="date">{dateText}</label>
                            </p>
                        </div>
                        <div className="div-3 inline-labels">
                            <p>
                                <label htmlFor="ruc" className={rucValue ? "green-text" : "red-text"}>RUC</label>
                            </p>
                            <p>
                                <label htmlFor="rego" className={regoValue ? "green-text" : "red-text"}>REGO</label>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
