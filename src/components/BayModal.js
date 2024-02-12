import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const BayModal = ({ bay, onSave, onCancel }) => {
    const { idbay, plate, date, ruc, rego, cof } = bay

    const [updatedPlate, setUpdatedPlate] = useState(plate);
    const [updatedDate, setUpdatedDate] = useState(date);
    const [updatedRuc, setUpdatedRuc] = useState(ruc);
    const [updatedRego, setUpdatedRego] = useState(rego);
    const [updatedCof, setUpdatedCof] = useState(cof);

    const handleSave = async () => {
        const updatedData = {
            plate: updatedPlate,
            date: updatedDate,
            ruc: updatedRuc,
            rego: updatedRego,
            cof: updatedCof
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL_LOCAL}/api/bays/${idbay}`, {
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
            onSave(updatedPlate, updatedDate, updatedRuc, updatedRego, updatedCof);
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

    const handleCofClick = () => {
        setUpdatedCof(!updatedCof); // Cambiar el valor de COF
    };

    return (
        <Modal show={true} onHide={onCancel} size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Editing Bay {idbay}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">PLATE</InputGroup.Text>
                    <Form.Control
                        placeholder="AAA123"
                        aria-label="Plate"
                        aria-describedby="basic-addon1"
                        value={updatedPlate}
                        onChange={handlePlateChange}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">DATE</InputGroup.Text>
                    <Form.Control
                        placeholder="31/05"
                        aria-label="Date"
                        aria-describedby="basic-addon1"
                        value={updatedDate}
                        onChange={handleDateChange}
                    />
                </InputGroup>

                <div className="buttons">
                    <Button htmlFor="rego" onClick={handleRegoClick} variant={updatedRego ? "success" : "danger"}>REGO</Button>
                    <Button htmlFor="ruc" onClick={handleRucClick} variant={updatedRuc ? "success" : "danger"}>RUC</Button>
                    <Button htmlFor="cof" onClick={handleCofClick} variant={updatedCof ? "success" : "danger"}>COF</Button>
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
