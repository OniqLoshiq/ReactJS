import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Title from '../Shared/Title';
import HrLine from '../Shared/HrLine';
import styled from 'styled-components';
import CommonInput from '../FormFields/CommonInput';
import { categoryValidations as validations } from '../../helpers/formValidations';
import NotificationContext from "../../contexts/notificationContext";
import categoriesService from '../../services/categoriesService';
import MyErrorMessage from '../FormFields/MyErrorMessage';

//name description picture


const CreateCategory = () => {
    const [customServerError, setCustomServerError] = useState(null);
    const notifications = useContext(NotificationContext);
    const history = useHistory();

    const schema = Yup.object().shape(validations);

    return (
        <Formik
            initialValues={{
                name: '',
                picture: '',
                description: ''
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
                try{
                    const result = await categoriesService.create(values);
                    if (customServerError) setCustomServerError(null);
                    notifications.timeout("success", result);
                    history.push('/');
                } catch (err) {
                    if (typeof err === 'object') {
                        throw err;
                    }
                    setCustomServerError(err);
                }
            }}
        >
            {({
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                isSubmitting
            }) => (
                <Styles>
                    <Title title='Create Category Field' />
                    <HrLine hrWidth="75%" mTop="1rem" mBottom="2.2rem" />
                    {customServerError && <div className="server-error">{customServerError}</div>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col md="9" >
                                <Form.Group>
                                    <CommonInput
                                        label="Name"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter category name"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Picture as Poster</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="picture"
                                        id="picture"
                                        onChange={e => {
                                            setFieldValue('picture', e.target.files[0]);
                                        }
                                        }
                                    />
                                    {touched.picture && errors.picture ? (<MyErrorMessage message={errors.picture} />) : null}
                                </Form.Group>
                                <Form.Group>
                                    <CommonInput
                                        label="Description"
                                        type="text"
                                        name="description"
                                        id="description"
                                        as="textarea"
                                        rows={4}
                                    />
                                </Form.Group>
                                <div className="center-wrapper bottom-margin-setter">
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        Create
                                    </Button>
                                </div>
                            </Col>
                        </Form.Row>
                    </Form>
                </Styles>
            )}
        </Formik>
    )
}

const Styles = styled.div`
    padding-bottom: 2rem;

    .form-row{
        display: flex;
        justify-content: center;
    }

    .btn-primary {
        background-color:#81C784;
        border-color: #81C784;
    }

    textarea, #picture {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid #BDBDBD;
        outline: none;

        &:hover {
            box-shadow: none;
            border-bottom: 2px solid red;
            background-color: rgba(207, 216, 220, 0.2);
        }
    }

    .server-error{
        color:red;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 2rem;
    }
`;

export default CreateCategory;