import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Title from '../Shared/Title';
import HrLine from '../Shared/HrLine';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from 'formik';

import CommonInput from '../FormFields/CommonInput';
import defaultProfilePicture from '../../assets/img/person-reading-book.png'
import { registerValidations as validations } from '../../helpers/formValidations';
import authService from '../../services/authService';
import NotificationContext from "../../contexts/notificationContext";

const Register = () => {
    const [previewPicture, setPreviewPicture] = useState(defaultProfilePicture);
    const [customServerError, setCustomServerError] = useState(null);
    const notification = useContext(NotificationContext);
    const history = useHistory();

    const previewFile = (file) => {
        const reader = new FileReader();

        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewPicture(reader.result);
            }
        }
    }

    const resetPreviewPicture = () => {
        setPreviewPicture(defaultProfilePicture);
    }


    const schema = Yup.object().shape(validations);

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                dateOfBirth: new Date(),
                profilePicture: null,
                password: '',
                repeatPassword: ''
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    const result = await authService.register(values, previewPicture);
                    notification.update('success', result);
                    setCustomServerError(null);
                    setTimeout(() => {
                        notification.reset();
                        history.push('/user/signIn');
                    }, 1500);
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
                setFieldValue,
                isSubmitting
            }) => (
                <Styles>
                    <Title title='Register as a new member' />
                    <HrLine hrWidth="75%" mTop="1rem" mBottom="2.2rem" />
                    <div className="profile-wrapper">
                        <img className="profile-picture" src={previewPicture} alt='profile-avatar' />
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                <Tooltip>
                                    Reset picture to default
                                </Tooltip>
                            }
                        >
                            <button className="close-button" onClick={resetPreviewPicture}>&#10006;</button>
                        </OverlayTrigger>
                    </div>
                   {customServerError &&  <div className="server-error">{customServerError}</div>}
                    <Form className="form-form" onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col md="6">
                                <Form.Group as={Col} lg="10">
                                    <CommonInput
                                        label="Username"
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Enter username"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} lg="10">
                                    <CommonInput
                                        label="Email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} lg="10">
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="profilePicture"
                                        id="profilePicture"
                                        onChange={e => {
                                            setFieldValue('profilePicture', e.target.files[0]);
                                            previewFile(e.target.files[0])
                                        }
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col md="6">
                                <Form.Group as={Col} lg="10">
                                    <CommonInput
                                        label="First Name"
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Your first name ..."
                                    />
                                </Form.Group>

                                <Form.Group as={Col} lg="10">
                                    <CommonInput
                                        label="Last Name"
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Your last name ..."
                                    />
                                </Form.Group>

                                <Form.Group as={Col} lg="10" controlId="dateOfBirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <DatePicker className="form-control"
                                        format="dd/MM/yyyy"
                                        name="dateOfBirth"
                                        value={values.dateOfBirth}
                                        onChange={e => {
                                            setFieldValue("dateOfBirth", e)
                                        }} />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Group as={Col} lg="10">
                                    <hr className="hr-form" />
                                    <CommonInput
                                        label="Password"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password ..."
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Group as={Col} lg="10">
                                    <hr className="hr-form" />
                                    <CommonInput
                                        label="Repeat Password"
                                        type="password"
                                        name="repeatPassword"
                                        id="repeatPassword"
                                        placeholder="Repeat Password ..."
                                    />
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                        <div className="wrapper">
                            <Button variant="info" type="submit" disabled={isSubmitting}>
                                Become a member
                            </Button>
                        </div>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>
                </Styles>
            )}
        </Formik>
    )
}

export default Register;

const Styles = styled.div`
    padding-bottom: 2rem;
    
    .form-form{
        margin-top: 2rem;
    }
        
    .wrapper{
        display: flex;
        justify-content: center;
    }

    .hr-form{
       background-color:red;
       display: block;
       width: 100%;
    }

    .react-date-picker__wrapper{
        border-style: none;
    }

    #profilePicture{
        background-color: white;
    }
    
    .react-date-picker, #profilePicture{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid blue;

        &:focus, &:active {
            box-shadow: none
            border-bottom: 2px solid red;
            background-color: rgba(255, 0, 0, 0.2);
        }
    }

    .form-group{
        margin-left: auto;
        margin-right: auto;
    }

    .profile-wrapper{
        display:flex;
        justify-content:center;
    }

    .profile-picture{
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 1rem;
        background-color: white;
        display: inline-block;
        box-shadow: 0 0 0 0.25em #357a38,
                    0 0 0 1em #8bc34a;
    }

    .close-button{
        position: absolute;
        margin-left: 275px;
        background: none;
        border: none;
        width: 20px;
        height: 20px;
        opacity: 0.3;

        &:hover{
            opacity: 1;
        }

        &:before, &:after {
            background-color: #333;
        }
    }

    .server-error{
        color:red;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 2rem;
    }
`;