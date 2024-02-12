import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import estoImage from '../images/technical-difficulties.jpg';

export const Error = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)}>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                Unfortunately the server has responded with an error. Please contact Nadir 🤓
                </p>
                <img src={estoImage} alt='technical difficulties'/> 
            </Alert>
        );
    }
}
