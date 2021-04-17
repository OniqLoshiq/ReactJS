import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import parseDate from '../../helpers/parseDate';


const LatestCard = ({ _id, title, frontPicture, createdAt, category}) => {
    const parsedCreatedAt = parseDate(createdAt);

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
                    {/* <Card.Text>{subtitle}</Card.Text> */}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        <div>{category.name}</div>
                        <div>{parsedCreatedAt}</div>
                    </small>
                </Card.Footer>
            </Card>
        </Styles>
    );
}

export default LatestCard;

const Styles = styled.div`
    .card{
        max-width: 16.5rem;
        margin-bottom: 2rem;

        &:hover button{
            display: inline-block;
            z-index: 0;
        }
    }

    .card-img-top{
        height: 10rem;
    }

    .card-title{
        height: 10.5rem;
    }

    /* .card-text{
        height: 13rem;
    } */

    img{
        max-width: 16.5rem;
        max-height: calc(16.5rem/1.47);
        object-fit: cover;
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
        top: 20%;
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

    .text-muted{
        display: flex;
        justify-content: space-between;
    }
`;
