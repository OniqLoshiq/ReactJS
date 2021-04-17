import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import FeaturedCard from './FeaturedCard';

const FeaturedCarousel = ({ articles }) => {
    const articlesArray = articles.reduce((acc, curr, i) => {
        if (i % 2 === 0) {
            acc.push([curr]);
        } else {
            let index = parseInt((i / 2), 10);
            acc[index].push(curr)
        }
        return acc;
    }, []);


    const renderedArticles = articlesArray.map((aa, i) => {
        return (
            <Carousel.Item key={i} interval={5000}>
                {aa.map(a => {
                    return <FeaturedCard key={a._id} {...a} />
                })}
            </Carousel.Item>
        );
    });


    return (
        <Styles>
            <Carousel indicators pause='hover'>
                {articles.length > 0 ? renderedArticles : null}
            </Carousel>
        </Styles>
    );
}

export default FeaturedCarousel;

const Styles = styled.div`
    display: flex;
    
    .carousel, .carousel-item{
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

    .carousel-inner{
        max-width: 1096px;
    }

    .carousel-caption {
        bottom: 0;
    }

    .carousel-idicators {
        background-color: red;
    }

    .carousel-control-next{
        padding-left: 2rem;
        padding-bottom: 3rem;
    }

    .carousel-control-next-icon{
        padding-left: 1rem;
        padding-bottom: 1.5rem;
    }

    .carousel-control-prev-icon{
        padding-right: 1rem;
        padding-bottom: 1.5rem;
    }

    .carousel-control-prev{
        padding-right: 3rem;
        padding-bottom: 3rem;
    }

    .carousel-indicators {
        margin-bottom: 0;
    }

    @media screen and (max-width: 1199px) {
        .carousel-control-next-icon,  .carousel-control-prev-icon{
            background-color: silver;
        }

        .carousel-control-next, .carousel-control-prev{
            padding:0;
            padding-bottom: 1.5rem;
        }

        .carousel-control-prev{
            right: 0;
        }
    }
`;
