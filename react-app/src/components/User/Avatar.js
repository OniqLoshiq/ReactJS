import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

const Avatar = ({ username, profilePicture }) => {
    return (
        <Styled>
            <span>{username}</span>
            <Image src={profilePicture} rounded className="avatar" />
        </Styled>
    )
}

const Styled = styled.div`
    display:inline-block;
    justify-content: space-between;
    
    span{
        margin-right: 35px;
    }

    .avatar {
        max-width: 40px;
        max-height: 40px;
        top: 0;
        right: 110px;
    }

    &:hover {
            .avatar {max-width: 45px;
            max-height: 45px;
            }
        }
`;

export default Avatar;