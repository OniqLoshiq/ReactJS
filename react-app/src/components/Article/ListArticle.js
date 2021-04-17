import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import styled from 'styled-components';
import parseDate from '../../helpers/parseDate';

const ListArticle = ({ _id, title, subtitle, frontPicture, createdAt, author, category }) => {
    const parseDateCreatedAt = parseDate(createdAt);

    return (
        <Styles>
            <Card>
                <Link to={`/article/${_id}`}>
                    <Card.Img variant="top" src={frontPicture} />
                    <button type="button">Read More</button>
                    <div className="hover-overlay"></div>
                </Link>

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {subtitle}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Author: {author.username}</ListGroupItem>
                    <ListGroupItem>Category: {category.name}</ListGroupItem>
                </ListGroup>
                <Card.Footer className="text-muted">
                    <div>{parseDateCreatedAt}</div>
                </Card.Footer>
            </Card>
        </Styles>
    );
};

export default ListArticle;

const Styles = styled.div`
    .card{
        max-width:16rem;

        &:hover button{
            display: inline-block;
            z-index: 0;
        }
    }

    .list-group-item{
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
    }

   .text-muted{
       display: flex;
       justify-content: space-between;
   }

   .hover-overlay{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        &:hover{
            background-color: rgba(232, 232, 232, 0.2);
        }
    }

    button{
        display:none;
        position: absolute;
        text-align: center;
        left: 50%;
        top: 17%;
        transform: translateX(-50%) translateY(-50%);
        background: none;
	    color: inherit;
	    border: 1px solid;
	    padding: 0.5rem;
	    font: inherit;
	    cursor: pointer;
	    outline: inherit;
        text-transform: uppercase;
    }
    
    a {
        color: white;
        text-decoration: none;
    }
`;