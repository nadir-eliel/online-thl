import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import imageTechDifficulties from '../images/technical-difficulties.jpg';

export const Error = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)}>
                <Alert.Heading>Oh snap! We got an error!</Alert.Heading>
                <p>
                Unfortunately the server has responded with an error. Please contact Nadir 🤓
                </p>
                <img src={imageTechDifficulties} alt='technical difficulties'/> 
            </Alert>
        );
    }
}
