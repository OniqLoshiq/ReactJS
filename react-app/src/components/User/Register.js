import { useState } from "react";
import DatePicker from 'react-date-picker';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Title from '../Shared/Title';
import HrLine from '../Shared/HrLine';
import styled from 'styled-components';
import defaultProfilePicture from '../../assets/img/person-reading-book.png'


const Register = () => {
    const [previewPicture, setPreviewPicture] = useState(defaultProfilePicture)
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Styles>
            <Title title='Register as a new member' />
            <HrLine hrWidth="75%" mTop="1rem" mBottom="2.2rem" />
            <div className="profile-wrapper">
                <img className="profile-picture" src={previewPicture} alt='profile-picture' />
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="tooltip-right">
                            Reset picture to default
                        </Tooltip>
                    }
                >
                    <button className="close-button">&#10006;</button>
                </OverlayTrigger>
            </div>
            <Form className="form-form">
                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <Form.Group as={Col} lg="10" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group as={Col} lg="10" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} lg="10" controlId="profilePicture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" id="profilePicture" label='Profile Picture' />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Group as={Col} lg="10" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="Your first name ..." />
                        </Form.Group>

                        <Form.Group as={Col} lg="10" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Your last name ..." />
                        </Form.Group>

                        <Form.Group as={Col} lg="10" controlId="dateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <DatePicker className="form-control" format="dd/MM/yyyy" value={startDate} onChange={setStartDate} />
                        </Form.Group>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <Form.Group as={Col} lg="10" controlId="password">
                            <hr className="hr-form" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Group as={Col} lg="10" controlId="repeatPassword">
                            <hr className="hr-form" />
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat Password" />
                        </Form.Group>
                    </Form.Group>
                </Form.Row>
                <div className="wrapper">
                    <Button variant="info" type="submit">
                        Become a member
                </Button>
                </div>

            </Form>
        </Styles>
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
    
    input, .react-date-picker, #profilePicture{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid blue;

        &:focus, &:active {
            box-shadow: none;
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
`;