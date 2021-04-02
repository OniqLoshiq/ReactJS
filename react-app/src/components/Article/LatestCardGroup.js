import CardGroup from 'react-bootstrap/CardGroup';
import LatestCard from './LatestCard';
import styled from 'styled-components';


const LatestCardGroup = () => {
    return (
        <Styles>
            <CardGroup>
                <LatestCard />
                <LatestCard />
                <LatestCard />
                <LatestCard />
            </CardGroup>
        </Styles>
    );
}

export default LatestCardGroup;

const Styles = styled.div`
    display: flex;

   .card-group{
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        margin: auto;
   }

   

   @media screen and (max-width: 1199px) {
        max-width: 550px;
        margin: auto;
    }
`;