
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Title from '../Shared/Title';
import HrLine from '../Shared/HrLine';
import TextareaTinyMce from '../Shared/TextareaTinyMce';
import styled from 'styled-components';
import CommonInput from '../FormFields/CommonInput';
import { articleValidations as validations } from '../../helpers/formValidations';
import NotificationContext from "../../contexts/notificationContext";
import AuthConext from '../../contexts/authContext';
import articlesService from '../../services/articlesService';
import CategorySelectList from '../Category/CategorySelectList';
import MyErrorMessage from '../FormFields/MyErrorMessage';


const CreateArticle = () => {
    const [customServerError, setCustomServerError] = useState(null);
    const notifications = useContext(NotificationContext);
    const auth = useContext(AuthConext);
    const history = useHistory();

    const schema = Yup.object().shape(validations);

    return (
        <Formik
            initialValues={{
                title: '',
                subtitle: '',
                body: '',
                frontPicture: '',
                category: '',
                author: auth.userCredentials?.id
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    const result = await articlesService.create(values);

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
                handleChange,
                setFieldValue,
                touched,
                errors,
                isSubmitting
            }) => (
                <Styles>
                    <Title title='Create Article' />
                    <HrLine hrWidth="75%" mTop="1rem" mBottom="2.2rem" />
                    {customServerError && <div className="server-error">{customServerError}</div>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col md="9" >
                                <Form.Group>
                                    <CommonInput
                                        label="Title"
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter the title of your article"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <CommonInput
                                        label="Subtitle"
                                        type="text"
                                        name="subtitle"
                                        id="subtitle"
                                        as="textarea"
                                        rows={2}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} lg="5">
                                <Form.Label>Front picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="frontPicture"
                                    id="frontPicture"
                                    onChange={e => {
                                        setFieldValue('frontPicture', e.target.files[0]);
                                    }
                                    }
                                />
                                 {touched.frontPicture && errors.frontPicture ? (<MyErrorMessage message={errors.frontPicture} />) : null}
                            </Form.Group>
                            <Form.Group as={Col} lg="4">
                                <CategorySelectList
                                    label='Category'
                                    name='category'
                                    id='category'
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Col md="9" >
                                <Form.Label>Body</Form.Label>
                                {touched.body && errors.body ? (<MyErrorMessage message={errors.body} />) : null}
                                <TextareaTinyMce
                                    id='body'
                                    name="body"
                                    handleChange={handleChange}
                                />
                                <div className="center-wrapper bottom-margin-setter">
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        Publish
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

    #frontPicture {
        padding: 0.2rem 0;
    }

    #subtitle, #frontPicture {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid blue;
        outline: none;
    }

    #subtitle:hover, #frontPicture:hover {
        box-shadow: none;
        border-bottom: 2px solid red;
        background-color: rgba(255, 0, 0, 0.2);
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
        margin-top: 2rem;
    }
`;

export default CreateArticle;