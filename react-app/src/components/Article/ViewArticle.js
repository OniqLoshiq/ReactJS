import { useState, useEffect, useCallback, useContext } from 'react';
import articlesService from '../../services/articlesService';
import styled from 'styled-components';
import NotificationContext from '../../contexts/notificationContext';
import AuthContext from '../../contexts/authContext';
import ReadArticle from './ReadArticle';

const ViewArticle = ({ match }) => {
    const [article, setArticle] = useState('');
    const notifications = useContext(NotificationContext);
    const auth = useContext(AuthContext);

    const loadArticle = useCallback(() => {
        articlesService.getOne(match.params.id)
            .then(res => {
                setArticle(res)
            })
            .catch(err => {
                if (typeof err === "object") {
                    throw err;
                }
                notifications.timeout("danger", err);
            })
        // eslint-disable-next-line
    }, [setArticle]);

    useEffect(() => {
        loadArticle();
    },[loadArticle])

    return (
        <Styles>
            {article && <ReadArticle {...article}/>}
        </Styles>
    );
}

const Styles = styled.div`
    background-color: white;
`;

export default ViewArticle;