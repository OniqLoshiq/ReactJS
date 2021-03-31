import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const SignIn = () => {
    return (
        <Styles>
            <div className="title">Sing In</div>
            <Row className="wrapper">
                <Col md="4" className="panel-left center-wrapper">
                    <div><img src="/EP-logo_1.png" alt="e-platform logo" /></div>
                    <div>e-Platform</div>
                </Col>
                <Col md="8" className="panel-right">
                    <Form>
                        <Form.Row>
                            <Col md="10" >
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Enter username" />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" />
                                </Form.Group>
                                <Form.Group as={Row} controlId="rememberMeCheck">
                                    <Col>
                                        <Form.Check label="Remember me" />
                                    </Col>
                                </Form.Group>
                                <div className="center-wrapper bottom-margin-setter">
                                    <Button variant="primary" type="submit">
                                        Sign In
                                    </Button>
                                </div>
                                <div className="bottom-margin-setter content-center">Don't have an account? <Link to="user/register">Join us now</Link></div>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
            <div className="inner-footer">
                Your privacy is our mission &hearts; "Ho-ho-ha-ha"
            </div>
        </Styles>
    )
}

export default SignIn;


const Styles = styled.div`
    .title{
        padding-bottom: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 2rem;
    }

    .wrapper{
        width:70%;
        margin: auto;
        margin-bottom: 1.5rem;

        & .form-label[for="username"]{
        padding-top: 1.5rem;
        }
    }
   
    .panel-left{
        background-color: red;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        flex-direction: column;

        & img{
            width: 8rem;
        }

        & div:nth-of-type(2){
           font-size: 1.25rem;
           font-weight: bold;
           font-style: italic;
        }
    }

    .panel-right{
        background-color: silver;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        padding-left: 2rem;
    }

    .form-check, .inner-footer, .title, .content-center{
        text-align: center;
    }

    .center-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bottom-margin-setter{
        margin-bottom: 1rem;
    }

    @media screen and (max-width: 767px) {
        .panel-right {
            background-color: silver;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            border-top-right-radius: 0px;
            padding-left: 1rem;
        }

        .panel-left{
            background-color: red;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            border-bottom-left-radius: 0px;
            padding-right: 0;
            flex-direction: row;

            & img{
            width: 5rem;
            padding: 0.75rem 0.75rem 0.75rem 0;
        }
        }
}
`;