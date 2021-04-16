import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import parseDate from '../../helpers/parseDate';
import { faThumbsUp as solThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FeaturedCard = ({ _id, title, subtitle, frontPicture, updatedAt, categoryName, categoryId, likesCount }) => {
    const parsedUpdatedAt = parseDate(updatedAt);

    return (
        <Styles>
            <Card className="bg-dark text-white">
                <Link to={`/article/${_id}`}>
                    <Card.Img src={frontPicture} alt="Article" />
                    <button type="button">Read More</button>
                    <Card.ImgOverlay>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {subtitle}
                        </Card.Text>
                       
                            <small className="text-muted">
                                <div>{categoryName}</div>
                                <div>Last updated: {parsedUpdatedAt}</div>
                                <div><FontAwesomeIcon icon={solThumbsUp} /> {likesCount}</div>
                            </small>
                    </Card.ImgOverlay>
                </Link>
            </Card>
        </Styles>
    )
}

export default FeaturedCard;

const Styles = styled.div`
   display: inline-block;
   text-align: left;

   .card {
         margin-left: 1.5rem;
         margin-right: 1.5rem;
         margin-bottom: 1.5rem;
   }

    .card, .card-img {
        max-width: 500px;
        width: calc(100vw/2);
        height: calc(100vw*0.28);
        max-height: calc(500px/1.786);
        min-width: 260px;
        object-fit: cover;

        &:hover .card-img{
            cursor: pointer;
            transform: scale(1.02);
        }

        &:hover .card-img-overlay{
            transform: scale(1.02);
            cursor: pointer;     
            background-color: rgba(232, 232, 232, 0.2);
        }

        &:hover button{
            display: inline-block;
            z-index: 1;
        }
    }

    button{
        display:none;
        position: absolute;
        text-align: center;
        left: 50%;
        top: 45%;
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

    .card-img-overlay{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .text-muted{
        display: flex;
        justify-content: space-between;
        color: white !important;
    }

    .card-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @supports (-webkit-line-clamp: 2) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: initial;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    @media screen and (max-width: 1199px) {
        .card, .card-img{
            max-width: 525px;
        }
    }
`;