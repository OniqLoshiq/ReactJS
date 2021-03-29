import { useState } from "react";
import DatePicker from 'react-date-picker';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Styles = styled.div`
    padding-bottom: 2rem;

    .wrapper{
        display: flex;
        justify-content: center;
    }

    hr{
       background-color:red;
       display: block;
       width: 100%;
    }

    .react-date-picker__wrapper{
        border-style: none;
    }
    
`;

const Register = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Styles>
            <div>Register new User</div>

            <Form>
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
                            <Form.File type="file" id="profilePicture" label='Profile Picture' custom />
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
                        <hr />
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Group as={Col} lg="10" controlId="repeatPassword">
                        <hr />
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

export default Register