import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BayModal } from './BayModal';

export const Bay = ({ position, plate, date, ruc, rego }) => {

    const [plateText, setPlateText] = useState(plate);
    const [dateText, setDateText] = useState(date);
    const [rucValue, setRucValue] = useState(ruc);
    const [regoValue, setRegoValue] = useState(rego);
    const [isEditing, setIsEditing] = useState(false);





    const handleEditPlateDateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(!isEditing);
    }

    const handleSave = (updatedPlate, updatedDate, updatedRuc, updatedRego) => {

        setPlateText(updatedPlate);
        setDateText(updatedDate);
        setRegoValue(updatedRego);
        setRucValue(updatedRuc);
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
                <div className="bay-background">
                    <div className="container">
                        <div className="number-container" onClick={() => setIsEditing(!isEditing)}>
                            <p>{position}</p>
                        </div>
                        <div className="div-2 inline-labels d-flex flex-column">
                            <p>
                                <label htmlFor="date">{plateText}</label>
                            </p>
                            <p>
                                <label htmlFor="date">{dateText}</label>
                            </p>
                        </div>
                        <div className="div-3 inline-labels d-flex flex-column">
                            <p className="w-100">
                                <Button htmlFor="rego" variant={regoValue ? "outline-success" : "outline-danger"} disabled className="btn-block">REGO</Button>
                            </p>
                            <p className="w-100">
                                <Button htmlFor="ruc" variant={rucValue ? "outline-success" : "outline-danger"} disabled className="btn-block">RUC</Button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
