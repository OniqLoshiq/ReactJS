import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';


const Notification = ({ type, message }) => {
    return (
        <Styles>
            <Alert variant={type}>
                {message}
            </Alert>
        </Styles>
    );
}

const Styles = styled.div`
    position: fixed;
    bottom: 30px;
    z-index: 3000;
    width: 450px;
    right: 10px;
    text-align: center;
`;

export default Notification;