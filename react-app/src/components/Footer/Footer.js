import styled from 'styled-components';

const Styles = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    background-color: blue;
    font-size: 0.75rem;
    color: white;
`;


const Footer = () => {
    return (
        <Styles>
            <span>Copyright &copy; 2021 OniqLoshiq Design since 1987. All rights reserved. </span>
        </Styles>
    );
};

export default Footer;