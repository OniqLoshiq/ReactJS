import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import sky from '../../assets/img/sky.jpg';


const FeaturedCard = () => {
    return (
        <Styles>
            <Card className="bg-dark text-white">
                <Link to="/user/signIn">
                    <Card.Img src={sky} alt="Card image" />
                    <div className="button-wrapper">
                        <button type="button">Read More</button>
                    </div>
                    <Card.ImgOverlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                    </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text>
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
         margin-left: 1.7rem;
         margin-right: 1.7rem;
         margin-bottom: 1.5rem;
   }

    .card, .card-img {
        max-width: 500px;
        width: calc(100vw/2);
        height: calc(100vw*0.28);
        max-height: calc(500px/1.786);
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
        top:50%;
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
`;