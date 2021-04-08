import styled from 'styled-components';

const Title = ({title}) => {
    return(
    <Styles className="title">
       {title}
    </Styles>
    ); 
};

export default Title;

const Styles = styled.div`
    &.title{
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: -1rem;
        font-size: 1.5rem;
    }
`;