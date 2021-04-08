import styled from 'styled-components';

const HrLine = ({ hrWidth, mTop, mBottom }) => {
    return (
        <Styles className="hr-custom" hrWidth={hrWidth} mTop={mTop} mBottom={mBottom} />
    );
};

export default HrLine;

const Styles = styled.hr`
    &.hr-custom{
        width: ${props => props.hrWidth ? props.hrWidth : '100%'};
        margin-top: ${props => props.mTop ? props.mTop : '0rem'};
        margin-bottom: ${props => props.mBottom ? props.mBottom : '0rem'};
    }
`;