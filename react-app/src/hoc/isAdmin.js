import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const isAdmin = (WrappedComponent) => {

    const Component = (props) => {
        const { userCredentials } = useContext(AuthContext);
        const history = useHistory();

        if (userCredentials.role !== "admin") {
            history.push('/')

            return null;
        }

        return <WrappedComponent {...props} />
    }

    return Component;
};

export default isAdmin;