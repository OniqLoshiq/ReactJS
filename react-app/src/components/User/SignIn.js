import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Title from '../Shared/Title';
import HrLine from '../Shared/HrLine';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signInValidations as validations } from '../../helpers/formValidations';
import CommonInput from '../FormFields/CommonInput';
import authService from '../../services/authService';
import NotificationContext from "../../contexts/notificationContext";
import AuthContext from "../../contexts/authContext";

const SignIn = () => {
    const [customServerError, setCustomServerError] = useState(null);
    const notification = useContext(NotificationContext);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const schema = Yup.object().shape(validations);

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    const result = await authService.signIn(values);
                    auth.setUserCredentials(result);
                    notification.update('success', 'Sign in was successfull');
                    if (customServerError) setCustomServerError(null);

                    setTimeout(() => {
                        notification.reset();
                        history.push('/');
                    }, 1000);
                } catch (error) {
                    if (typeof error === 'object') {
                        throw error;
                    }
                    setCustomServerError(error);
                }
            }}
        >
            {({
                handleSubmit,
                values,
                isSubmitting
            }) => (
                <Styles>
                    <Title title='Sign in' />
                    <HrLine hrWidth="75%" mTop="1rem" mBottom="2.2rem" />
                    <Row className="wrapper">
                        <Col md="4" className="panel-left center-wrapper">
                            <div><img src="/EP-logo_1.png" alt="e-platform logo" /></div>
                            <div>e-Platform</div>
                        </Col>
                        <Col md="8" className="panel-right">
                            <Form onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Col md="10" >
                                        <Form.Group>
                                            <CommonInput
                                                label="Username"
                                                type="text"
                                                name="username"
                                                id="username"
                                                placeholder="Enter username"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <CommonInput
                                                label="Password"
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Enter password"
                                            />
                                        </Form.Group>
                                        {customServerError &&  <div className="server-error">{customServerError}</div>}
                                        <div className="center-wrapper bottom-margin-setter">
                                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                                Sign In
                                             </Button>
                                        </div>
                                        <div className="bottom-margin-setter content-center">Don't have an account? <Link to="/user/register">Join us now</Link></div>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <div className="inner-footer">
                        Your privacy is our mission &hearts; "Ho-ho-ha-ha"
            </div>
                </Styles>
            )}
        </Formik>
    )
}

export default SignIn;

const Styles = styled.div`
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
        margin-top: 1rem;
    }

    .bottom-margin-setter{
        margin-bottom: 1rem;
    }

    .server-error{
        color:red;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1rem;
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