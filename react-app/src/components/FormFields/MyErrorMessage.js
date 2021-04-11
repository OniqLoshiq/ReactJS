import styled from 'styled-components';
 
const MyErrorMessage = ({message}) => {
    return (
        <Style className="error">{message}</Style>
    );
}

const Style = styled.div`
    color: red;
    font-size: 0.8rem;
`;

export default MyErrorMessage;