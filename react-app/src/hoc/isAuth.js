import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const isAuth = (WrappedComponent) => {

    const Component = (props) => {
        const { userCredentials } = useContext(AuthContext);
        const history = useHistory();

        if (!userCredentials?.username) {
            history.push('/user/signIn')

            return null;
        }

        return <WrappedComponent {...props} />
    }

    return Component;
};

export default isAuth;