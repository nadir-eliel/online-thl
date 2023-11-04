import React, { useState } from 'react';

export const Bay = () => {
    const [plateText, setPlateText] = useState("LPB725");
    const [dateText, setDateText] = useState("27/4");
    const [rucValue, setRucValue] = useState(false);
    const [regoValue, setRegoValue] = useState(false);
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
        setRegoValue(!regoValue);
    };

    return (
        <div className="editable-item">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={plateText}
                        onChange={handlePlateChange}
                    />
                    <input
                        type="text"
                        value={dateText}
                        onChange={handleDateChange}
                    />
                    <input
                        type="text"
                        value={rucValue}
                        onChange={handleRucClick}
                    />
                    <input
                        type="text"
                        value={regoValue}
                        onChange={handleRegoClick}
                    />
                </div>
            ) : (
                <div className="dark-background">
                    <div className="container">
                        <div className="number-container">
                            <p>32</p>
                        </div>
                        <div className="div-2 inline-labels">
                            <p>
                                <label htmlFor="plate">LBP725</label>
                            </p>
                            <p>
                                <label htmlFor="date">27/12</label>
                            </p>
                        </div>
                        <div className="div-3 inline-labels">
                            <p>
                                <label htmlFor="ruc" onClick={handleRucClick} className={rucValue ? "green-text" : "red-text"}>RUC</label>
                            </p>
                            <p>
                                <label htmlFor="rego" onClick={handleRegoClick} className={regoValue ? "green-text" : "red-text"}>REGO</label>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Guardar" : "Editar"}
            </button>
        </div>
    );
}
