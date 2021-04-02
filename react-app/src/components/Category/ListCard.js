import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import sky from '../../assets/img/sky.jpg';

import styled from 'styled-components';

const ListCard = () => {
    return (
        <Styles>
            <Card>
                <Link to="/categories/:id">
                    <Card.Img variant="top" src={sky} />
                    <Card.ImgOverlay>
                        <Card.Title className="title-normal">Science</Card.Title>
                        <Card.Title className="title-on-hover">The pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence
                        <button type="button">View Resources</button>
                        </Card.Title>
                        <Card.Text>
                            <span>Unique articles: 30</span>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Link>
            </Card>
        </Styles>
    );
}

export default ListCard;

const Styles = styled.div`
    display: flex;
    position: relative;
    margin: 1rem 0;
    min-width: 50%;

    .card{
        border: none;

        &:hover .title-on-hover{
            display: block;
            @supports (-webkit-line-clamp: 2) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: initial;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        }

        &:hover .title-normal{
            display: none;
        }

        &:hover .card-img-overlay{
            cursor: pointer;     
            background-color: rgba(232, 232, 232, 0.2);

        }
    }

    .card-img-top{
        max-height: 100px;
        object-fit: cover;
        /* object-position: 50% 0%; */
        border-radius: 20px;
    }

    .card-text{
        text-align:right;
        font-size: 1rem;
        color: white;
    }

    span{
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
    }

    .card-title{
        color: white;
        font-size: 2rem;
    }

    .title-normal{
        display: block;
    }

    .title-on-hover{
        display: none;
        text-align: center;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    button{
        position: absolute;
        text-align: center;
        left: 50%;
        top: 80%;
        transform: translateX(-50%) translateY(-50%); 
        background: none;
	    color: inherit;
	    border: 1px solid;
	    padding: 0.25rem;
	    font: inherit;
	    cursor: pointer;
	    outline: inherit;
        text-transform: uppercase;
        font-size: 0.75rem;
    }
`;