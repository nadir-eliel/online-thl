import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export const ResetConfirmation = ({keyword, showConfirmation, handleConfirmationClose, handleReset, handleKeywordChange}) => {

    return (
        <Modal show={showConfirmation} onHide={handleConfirmationClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Por favor, ingresa la palabra clave:</p>
                <input type="text" value={keyword} onChange={handleKeywordChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleConfirmationClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleReset}>
                    Resetear
                </Button>
            </Modal.Footer>
        </Modal>
    )
}