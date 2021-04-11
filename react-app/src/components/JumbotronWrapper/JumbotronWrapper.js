import { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import typeWriter from '../../assets/img/typewriter.jpg'

const JumbotronWrapper = () => {
    let windowScrollTop;
    const [transform, setTransform] = useState('');

    useEffect(() => {
        if (window.innerWidth >= 768) {
            window.addEventListener("scroll", handleTransform);
        }
        return function cleanup() {
            if (window.innerWidth >= 768) {
                window.removeEventListener("scroll", handleTransform);
            }
        };
    });

    const handleTransform = () => {
         windowScrollTop = window.pageYOffset / 3;
        setTransform("translate3d(0," + windowScrollTop + "px,0)");
    }

    return (
        <Styles >
            <Jumbo fluid className="jumbo"  transformdata={transform}>
                <div className="overlay"></div>
                <Container>
                    <h1>Welcome</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi pariatur doloribus voluptates quas iure rerum eum accusamus eius blanditiis provident.</p>
                </Container>
            </Jumbo>
        </Styles>
    );
}

export default JumbotronWrapper;

const Jumbo = styled(Jumbotron).attrs(props => ({
    style: {
        transform: props.transformdata
    } 
}))`
        position: relative;
        height: 25rem;
        background: url(${typeWriter});
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -2;
        display: flex;
        align-items: center;
        text-align: center;
`;

const Styles = styled.div`

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