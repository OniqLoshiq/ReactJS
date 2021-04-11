import CardColumns from 'react-bootstrap/CardColumns';
import ListArticle from '../Article/ListArticle';

import styled from 'styled-components';

const ListCategoryArticles = () => {
    return (
        <>
            <Styles>
                <CardColumns>
                    <ListArticle show={true}/>
                    <ListArticle />
                    <ListArticle show={true}/>
                    <ListArticle />
                    <ListArticle show={true}/>
                    <ListArticle />
                    <ListArticle />
                    <ListArticle show={true}/>
                    <ListArticle />
                </CardColumns>
            </Styles>
        </>
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

export default ListCategoryArticles;