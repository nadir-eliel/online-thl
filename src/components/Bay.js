import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BayModal } from './BayModal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const Bay = ({ idbay, plate, date, ruc, rego, socket }) => {

    const [plateText, setPlateText] = useState(plate);
    const [dateText, setDateText] = useState(date);
    const [rucValue, setRucValue] = useState(ruc);
    const [regoValue, setRegoValue] = useState(rego);
    const [isEditing, setIsEditing] = useState(false);

    /*
        const handleEditPlateDateClick = () => {
            setIsEditing(true);
        };

        const handleSaveClick = () => {
            setIsEditing(!isEditing);
        }
    */

    const handleSave = (updatedPlate, updatedDate, updatedRuc, updatedRego) => {
        setPlateText(updatedPlate);
        setDateText(updatedDate);
        setRegoValue(updatedRego);
        setRucValue(updatedRuc);
        socket.emit('put-event',
            {
                idbay: idbay,
                plate: updatedPlate,
                date: updatedDate,
                rego: updatedRego,
                ruc: updatedRuc
            })
    };

    return (
        <div className="">
            {isEditing ? (
                <BayModal
                    position={idbay}
                    plate={plateText}
                    date={dateText}
                    ruc={rucValue}
                    rego={regoValue}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="editableItem">
                    <div className="bayPosition" onClick={() => setIsEditing(!isEditing)}>
                        <p>{idbay}</p>
                    </div>
                    <div className='bayContent'>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">PLATE</InputGroup.Text>
                            <Form.Control
                                placeholder="AAA123"
                                aria-label="Plate"
                                aria-describedby="basic-addon1"
                                value={plateText}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">DATE</InputGroup.Text>
                            <Form.Control
                                placeholder="31/05"
                                aria-label="Date"
                                aria-describedby="basic-addon1"
                                value={dateText}
                            />
                        </InputGroup>
                        <div className="buttons">
                            <Button htmlFor="rego" variant={regoValue ? "success" : "danger"} disabled className="btn-block">REGO</Button>
                            <Button htmlFor="ruc" variant={rucValue ? "success" : "danger"} disabled className="btn-block">RUC</Button>
                            <Button htmlFor="rego" variant={regoValue ? "success" : "danger"} disabled className="btn-block">COF</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
