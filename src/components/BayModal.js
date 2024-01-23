import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const BayModal = ({ position, plate, date, ruc, rego, onSave, onCancel }) => {
    const [updatedPlate, setUpdatedPlate] = useState(plate);
    const [updatedDate, setUpdatedDate] = useState(date);
    const [updatedRuc, setUpdatedRuc] = useState(ruc);
    const [updatedRego, setUpdatedRego] = useState(rego);

    const handleSave = async () => {
        const updatedData = {
            plate: updatedPlate,
            date: updatedDate,
            ruc: updatedRuc,
            rego: updatedRego
        };

        try {
            const response = await fetch(`http://localhost:4000/api/bays/${position}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            await response.json();
            onSave(updatedPlate, updatedDate, updatedRuc, updatedRego);
            onCancel();
        } catch (error) {
            console.error('Error al guardar los cambios:', error.message);
        }
    };


    const handlePlateChange = (event) => {
        // Limitar a 6 caracteres en mayúsculas
        setUpdatedPlate(event.target.value.slice(0, 6).toUpperCase());
    };

    const handleDateChange = (event) => {
        // Limitar a 3 a 5 caracteres
        setUpdatedDate(event.target.value.slice(0, 5));
    };

    const handleRucClick = () => {
        setUpdatedRuc(!updatedRuc); // Cambiar el valor de RUC
    };

    const handleRegoClick = () => {
        setUpdatedRego(!updatedRego); // Cambiar el valor de REGO
    };
    
    return (
        <Modal show={true} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Editing Bay {position}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    <div className="div-2 inline-labels">
                        <div className="inline-item">
                            <p>PLATE</p>
                            <input
                                type="text"
                                value={updatedPlate}
                                onChange={handlePlateChange}
                            />
                        </div>
                        <div className="inline-item">
                            <p>DATE</p>
                            <input
                                type="text"
                                value={updatedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className="div-3 inline-labels">
                        <p>
                            <Button htmlFor="rego" onClick={handleRegoClick} className={updatedRego ? "btn-success" : "btn-danger"}>REGO</Button>
                        </p>
                        <p>
                            <Button htmlFor="ruc" onClick={handleRucClick} className={updatedRuc ? "btn-success" : "btn-danger"}>RUC</Button>
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >
    );
};
