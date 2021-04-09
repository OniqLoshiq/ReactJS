import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

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

const Styles = styled.div`

    .container{
        padding-bottom: 3.5rem;
        padding-top: 2.5rem;
        background-color: silver;
        border-radius: 0.75rem;
        margin-top: -4rem;
    }
`;