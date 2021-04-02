import Carousel from 'react-bootstrap/Carousel';
import LatestCardGroup from './LatestCardGroup';
import styled from 'styled-components';

const LatestCarousel = () => {
    return (
        <Styles>
            <Carousel indicators={false} pause='hover'>
                <Carousel.Item interval={20000}>
                    <LatestCardGroup />
                </Carousel.Item>
                <Carousel.Item interval={20000}>
                    <LatestCardGroup />
                </Carousel.Item>
            </Carousel>
        </Styles>
    )
};

export default LatestCarousel;

const Styles = styled.div`
    display: flex;

    .carousel, .carousel-item{
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

    .carousel-inner{
        max-width: 1056px;
    }

    .carousel-caption {
        bottom: 0;
    }

    .carousel-control-next{
        padding-left: 2rem;
        padding-bottom: 3rem;
    }

    .carousel-control-next-icon{
        background-color: silver;
        padding-left: 1rem;
        padding-bottom: 1.5rem;
    }

    .carousel-control-prev-icon{
        background-color: silver;
        padding-right: 1rem;
        padding-bottom: 1.5rem;
    }

    .carousel-control-prev{
        padding-right: 3rem;
        padding-bottom: 3rem;
        right: 0;
        justify-content: flex-start;
    }

    .carousel-control-next{
        right: 0;
        justify-content: flex-end;
    }

    .carousel-control-next, .carousel-control-prev{
            padding:0;
            padding-bottom: 1.5rem;
            width: 5%;
    }

    @media screen and (max-width: 1199px) {
        .carousel-inner{
            max-width: 550px;
        }
    }

    @media screen and (max-width: 575px) {
        .carousel-inner{
            max-width: 262px;
        }
    }
`;