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

    .overlay {
    background-color: #807e7e;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

    .container {
       color: white
    }
    
`;

const JumbotronWrapper = () => {
    return (
        <Styles>
            <Jumbotron fluid className="jumbo">
                <div className="overlay"></div>
                <Container>
                    <h1>Welcome</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi pariatur doloribus voluptates quas iure rerum eum accusamus eius blanditiis provident.</p>
                </Container>
            </Jumbotron>
        </Styles>
    );
}

export default JumbotronWrapper;