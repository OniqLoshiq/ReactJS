import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

const Layout = ({
    children
}) => {
    return (
        <Styles>
            <Container>
                <div className='blur'>
                    {children}
                </div>
            </Container>
        </Styles>
    );
};

export default Layout;

const Styles = styled.div`
   background-color: rgba(255,255,255,0.8);
   padding-top: 10px;
    .container{
        padding-bottom: 3.5rem;
        padding-top: 1.5rem;
        background: rgba(189, 189, 189, 0.4);
        border-radius: 0.75rem;
        margin-top: -4rem;
    }

    .blur {
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding-top: 10px;
  border: 1px solid rgba(255,255,255,0.2);
}
`;