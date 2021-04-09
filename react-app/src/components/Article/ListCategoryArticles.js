import CardColumns from 'react-bootstrap/CardColumns';
import ListArticle from '../Article/ListArticle';
import ListArticle2 from '../Article/ListArticle2';

import styled from 'styled-components';

const ListCategoryArticles = () => {
    return (
        <>
            <Styles>
                <CardColumns>
                    <ListArticle />
                    <ListArticle2 />
                    <ListArticle2 />
                    <ListArticle2 />
                    <ListArticle2 />
                    <ListArticle />
                </CardColumns>
            </Styles>
        </>
    )
}

const Styles = styled.div`
    .card-columns{
        column-count: 4;
    }
`;

export default ListCategoryArticles;