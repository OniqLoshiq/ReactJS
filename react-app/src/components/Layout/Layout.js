import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

const Styles = styled.div`
    padding-bottom: 3rem;
`;

const Layout = ({
    children
}) => {
    return (
        <Styles>
            <Container>
                {children}
            </Container>
        </Styles>
    );
};


export default Layout;