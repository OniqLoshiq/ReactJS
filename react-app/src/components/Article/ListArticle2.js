import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import styled from 'styled-components';
import keyboard from '../../assets/img/keyboard.jpg'

const ListArticle2 = () => {
    return (
        <Styles>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={keyboard} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quiasdasd asd asd qw wqef cdf sdf sdfewrg sv dsgre ggf vdfg werg dfg dsfg ck example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Author: OniqLoshiq</ListGroupItem>
                    <ListGroupItem>Category: Science</ListGroupItem>
                </ListGroup>
                <Card.Footer className="text-muted">
                    <div>2 days ago</div>
                    <div>2 days ago</div>
                </Card.Footer>
            </Card>
        </Styles>
    );
};

export default ListArticle2;

const Styles = styled.div`
    max-width:15rem;
    
    .card{
        max-width:15rem;
    }

    .list-group-item{
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
    }

   .text-muted{
       display: flex;
       justify-content: space-between;
   }
`;