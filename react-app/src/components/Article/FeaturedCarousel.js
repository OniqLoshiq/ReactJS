import Carousel from 'react-bootstrap/Carousel';

import styled from 'styled-components';

import FeaturedCard from './FeaturedCard';

const FeaturedCarousel = () => {
    return (
        <Styles>
            <Carousel indicators={false} pause='hover'>
                <Carousel.Item interval={20000}>
                    <FeaturedCard />
                    <FeaturedCard />
                </Carousel.Item>
                <Carousel.Item interval={20000}>
                    <FeaturedCard />
                    <FeaturedCard />
                </Carousel.Item>
                <Carousel.Item interval={20000}>
                    <FeaturedCard />
                    <FeaturedCard />
                </Carousel.Item>
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

    .carousel-caption {
        bottom: 0;
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
        padding-right: 2rem;
        padding-bottom: 3rem;
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
