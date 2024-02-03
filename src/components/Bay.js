import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BayModal } from './BayModal';

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
                        <dl className="labels">
                            <div>
                                <dt>REGO:</dt>
                                <dd>{plateText}</dd>
                            </div>
                            <div>
                                <dt>DATE:</dt>
                                <dd>{dateText}</dd>
                            </div>
                        </dl>
                        <div className="buttons">
                            <Button htmlFor="rego" variant={regoValue ? "outline-success" : "outline-danger"} disabled className="btn-block">REGO</Button>
                            <Button htmlFor="ruc" variant={rucValue ? "outline-success" : "outline-danger"} disabled className="btn-block">RUC</Button>
                            <Button htmlFor="rego" variant={regoValue ? "outline-success" : "outline-danger"} disabled className="btn-block">COF</Button>
                            {/* <Button htmlFor="ruc" variant={rucValue ? "outline-success" : "outline-danger"} disabled className="btn-block">SELF</Button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
