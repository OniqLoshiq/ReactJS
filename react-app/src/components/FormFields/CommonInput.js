import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import MyErrorMessage from './MyErrorMessage';
import styled from 'styled-components';


const CommonInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Styles>
            <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            <Form.Control {...field} {...props}
            />
            {meta.touched && meta.error ? (<MyErrorMessage message={meta.error} />) : null}
        </Styles>
    );
}

const Styles = styled.div`
     input {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid #BDBDBD;
        outline: none;

        &:focus, &:active {
            box-shadow: none;
            border-bottom: 2px solid red;
            background-color: rgba(207, 216, 220, 0.2);
        }
    }
`;

export default CommonInput;