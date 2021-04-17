import { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import articlesService from '../../services/articlesService';
import styled from 'styled-components';
import NotificationContext from '../../contexts/notificationContext';
import AuthContext from '../../contexts/authContext';
import ReadArticle from './ReadArticle';

const ViewArticle = ({ match }) => {
    const auth = useContext(AuthContext);
    const notifications = useContext(NotificationContext);
    const history = useHistory();
    const [article, setArticle] = useState('');

    const logicStateObject = {
        isLogged: false,
        isCreator: false,
        hasLiked: false,
        hasDisliked: false
    }
    const [logicState, setLogicState] = useState(logicStateObject);


    const loadArticle = useCallback(() => {
        articlesService.getOne(match.params.id)
            .then(res => {
                setArticle(res);
                setLogicState({
                    isLogged: !!auth.userCredentials?.id,
                    isCreator: auth.userCredentials?.id === res.author._id,
                    hasLiked: res.likes.includes(auth.userCredentials?.id),
                    hasDisliked: res.dislikes.includes(auth.userCredentials?.id)
                });
            })
            .catch(err => {
                if (typeof err === "object") {
                    throw err;
                }
                notifications.timeout("danger", err);
            })

    }, [setArticle, setLogicState, match.params.id, auth.userCredentials?.id]);

    const handleDislikeClick = async () => {
        let type;

        if (logicState.hasDisliked) type = 'undislike';
        if (!logicState.hasLiked && !logicState.hasDisliked) type = 'dislike';
        if (logicState.hasLiked && !logicState.hasDisliked) type = 'dislike-unlike';

        try {
            const res = await articlesService.approve(type, article._id, auth.userCredentials.id);
            if (res) {
                if (type === 'undislike') setLogicState({ ...logicState, hasDisliked: false })
                if (type === 'dislike') setLogicState({ ...logicState, hasDisliked: true })
                if (type === 'dislike-unlike') setLogicState({ ...logicState, hasLiked: false, hasDisliked: true })
            }
        } catch (err) {
            if (typeof err === "object") {
                throw err;
            }
            notifications.timeout("danger", err);
        }
    }

    const handleLikeClick = async () => {
        let type;

        if (logicState.hasLiked) type = 'unlike';
        if (!logicState.hasLiked && !logicState.hasDisliked) type = 'like';
        if (!logicState.hasLiked && logicState.hasDisliked) type = 'like-undislike';

        try {
            const res = await articlesService.approve(type, article._id, auth.userCredentials.id);
            if (res) {
                if (type === 'unliked') setLogicState({ ...logicState, hasLiked: false })
                if (type === 'like') setLogicState({ ...logicState, hasLiked: true })
                if (type === 'like-undislike') setLogicState({ ...logicState, hasLiked: true, hasDisliked: false })
            }

        } catch (err) {
            if (typeof err === "object") {
                throw err;
            }
            notifications.timeout("danger", err);
        }
    }

    useEffect(() => {
        loadArticle();
    }, [loadArticle, logicState])

    const handleDeleteArticle = async () => {
        try {
            const result = await articlesService.delete(article._id);
            notifications.timeout("success", result);
            history.push('/');
        } catch (err) {
            if (typeof err === "object") {
                throw err;
            }
            notifications.timeout("danger", err);
        }
    }

    return (
        <Styles>
            {article &&
                <ReadArticle
                    userRole={auth.userCredentials?.role}
                    isLogged={logicState.isLogged}
                    isCreator={logicState.isCreator}
                    hasLiked={logicState.hasLiked}
                    hasDisliked={logicState.hasDisliked}
                    handleLikeClick={handleLikeClick}
                    handleDislikeClick={handleDislikeClick}
                    handleDeleteArticle={handleDeleteArticle}
                    {...article} />}
        </Styles>
    );
}

const Styles = styled.div`
    background-color: white;
`;

export default ViewArticle;