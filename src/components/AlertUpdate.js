import React from 'react'
import Toast from 'react-bootstrap/Toast';

export const AlertUpdate = ({ isUpdated, closeToast }) => {

    return (<Toast show={isUpdated} onClose={closeToast}>
        <Toast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
            />
            <strong className="me-auto">Atention!</strong>
        </Toast.Header>
        <Toast.Body>You're seeing an old version, close this to see the latest version!</Toast.Body>
    </Toast>)
}