import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import typeWriter from '../../assets/img/typewriter.jpg'

const Styles = styled.div`
    .jumbo{
        position:relative;
        background: url(${typeWriter});
        background-repeat: no-repeat;
        background-size: cover;
        height: 25rem;
        z-index: -2;
        display: flex;
        align-items: center;
        text-align: center;
    }

    .container {
       color: white
    }
    
`;

const JumbotronWrapper = () => {
    return (
        <Styles>
            <Jumbotron fluid className="jumbo">
                <Container>
                    <h1>Welcome</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi pariatur doloribus voluptates quas iure rerum eum accusamus eius blanditiis provident.</p>
                </Container>
            </Jumbotron>
        </Styles>
    );
}

export default JumbotronWrapper;