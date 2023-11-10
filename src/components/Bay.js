import React, { useState } from 'react';

export const Bay = ({ position, plate, date, ruc, rego }) => {

    const [plateText, setPlateText] = useState(plate);
    const [dateText, setDateText] = useState(date);
    const [rucValue, setRucValue] = useState(ruc);
    const [regoValue, setRegoValue] = useState(rego);
    const [isEditing, setIsEditing] = useState(false);

    const handlePlateChange = (event) => {
        // Limitar a 6 caracteres en mayúsculas
        setPlateText(event.target.value.slice(0, 6).toUpperCase());
    };

    const handleDateChange = (event) => {
        // Limitar a 3 a 5 caracteres
        setDateText(event.target.value.slice(0, 5));
    };

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
    return (
        <div className="editable-item">
            {isEditing ? (
                <div className='container'>
                    <div className="number-container">
                        <p>{position}</p>
                    </div>
                    <div className="div-2 inline-labels">
                        <input
                            type="text"
                            value={plateText}
                            onChange={handlePlateChange}
                            placeholder='example: AAA123'
                        />
                        <input
                            type="text"
                            value={dateText}
                            onChange={handleDateChange}
                            placeholder='example: 12/7'
                        />
                    </div>
                    <div className="div-3 inline-labels">
                        <p>
                            <label htmlFor="ruc" onClick={handleRucClick} className={rucValue ? "green-text" : "red-text"}>RUC</label>
                        </p>
                        <p>
                            <label htmlFor="rego" onClick={handleRegoClick} className={regoValue ? "green-text" : "red-text"}>REGO</label>
                        </p>
                    </div>
                    <div>
                        <button type='submit' onClick={handleSaveClick}>SAVE</button>
                        <button type='submit' onClick={handleSaveClick}>CANCEL</button>
                    </div>
                </div>
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
