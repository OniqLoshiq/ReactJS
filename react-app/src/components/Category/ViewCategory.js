import { useState, useEffect, useContext } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import ListArticle from '../Article/ListArticle';
import articlesService from '../../services/articlesService';
import NotificationContext from '../../contexts/notificationContext';

import styled from 'styled-components';

const ViewCategory = ({ match }) => {
    const [articles, setArticles] = useState(null);
    const notifications = useContext(NotificationContext);

    useEffect(() => {
        articlesService.getAllByCategory(match.params.id)
            .then(res => {
                setArticles(res);
            })
            .catch(err => {
                if (typeof err === "object") {
                    throw err;
                }
                notifications.timeout("danger", err);
            })
    },[])

    return (
        <Styles>
            <CardColumns>
                {articles &&
                    articles.map(a => {
                        return (
                       <ListArticle 
                            key={a._id}
                            {...a}
                       />
                    )
                    })}
            </CardColumns>
        </Styles>
    )
}

const Styles = styled.div`
    .card-columns{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0 auto;

        -webkit-column-count: 4;
        -moz-column-count: 4;
        column-count: 4;
        -webkit-column-gap: 1.7rem;
        -moz-column-gap: 1.7rem;
        column-gap: 1.7rem;
    }
`;

export default ViewCategory;