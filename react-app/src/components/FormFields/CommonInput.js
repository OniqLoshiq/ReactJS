import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import MyErrorMessage from './MyErrorMessage';

const CommonInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            <Form.Control {...field} {...props}
            />
            {meta.touched && meta.error ? (<MyErrorMessage message={meta.error} />) : null}
        </>
    );
}

export default CommonInput;