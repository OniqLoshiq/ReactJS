import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import parseDate from '../../helpers/parseDate';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import { faThumbsUp as solThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as solThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as regThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalDelete from '../Shared/ModalDelete';

const ReadArticle = ({
    userRole,
    isLogged,
    isCreator,
    hasLiked,
    hasDisliked,
    handleLikeClick,
    handleDislikeClick,
    handleDeleteArticle,
    _id,
    title,
    subtitle,
    body,
    frontPicture,
    likes,
    dislikes,
    createdAt,
    category,
    author
}) => {
    const parsedCreated = parseDate(createdAt);

    return (
        <Styles>
            <div className="article-container">
                <section className="main-title">
                    <div className="title">Title</div>
                    <div className="title-text">{title}</div>
                </section>

                <section className="meta">
                    <section className="poster">
                        <img className="front-picture" src={frontPicture} alt='article front' />
                    </section>
                    <div className="info">
                        <section className="main-subtitle">
                            <div className="title">Subtitle</div>
                            <div className="subtitle-text">{subtitle}</div>
                        </section>
                        <section className="wrapper">
                            <section className="author-info">
                                <section className="avatar">
                                    <img className="avatar-picture" src={author.profilePicture} alt='author avatar' />
                                </section>
                                <section className="author">
                                    <div className="title">Author</div>
                                    <div className="credentials">{author.firstName} <span className="username">"{author.username}"</span> {author.lastName}</div>
                                </section>
                            </section>
                            <section className="article-info">
                                <div className="category">
                                    <Link to={`/category/${category._id}`}>
                                        Category: {category.name}
                                    </Link>
                                </div>
                                <div>Created: {parsedCreated}</div>
                            </section>
                        </section>
                    </div>
                </section>

                <section className="body">
                    <section className="body-title">
                        <div className="title">Body</div>
                        {(isCreator || userRole === 'admin' || userRole === 'moderator') ? (
                             <div className="edit-delete">
                             <Button variant="warning" size="sm" className="edit"><Link to={`/article/edit/${_id}`}>Edit</Link></Button>
                             {userRole === 'admin' || userRole === 'moderator' ?  (<ModalDelete handleDeleteArticle={handleDeleteArticle}/>) : null}
                         </div>
                        ) : null}
                        
                        <div className="actions-wrapper">
                            {isLogged && !isCreator ?
                                (<div className="approvals">
                                    <button className="likes" onClick={handleLikeClick}>
                                        {hasLiked && (<FontAwesomeIcon icon={solThumbsUp} size="lg" />)}
                                        {!hasLiked && (<FontAwesomeIcon icon={regThumbsUp} size="lg" />)}
                                        {likes.length}
                                    </button>
                                    <button className="dislikes" onClick={handleDislikeClick}>
                                        {hasDisliked && <FontAwesomeIcon icon={solThumbsDown} size="lg" />}
                                        {!hasDisliked && <FontAwesomeIcon icon={regThumbsDown} size="lg" />}
                                        {dislikes.length}
                                    </button>
                                </div>) :
                                (<div className="approvals">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={"tooltip-top"}>
                                                Sign in to rate or it's just you :)
                                            </Tooltip>
                                        }
                                    >
                                        <button className="likes"><FontAwesomeIcon icon={regThumbsUp} size="lg" /> {likes.length}</button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={"tooltip-top"}>
                                                Sign in to rate or it's just you :)
                                            </Tooltip>
                                        }
                                    >
                                        <button className="dislikes"><FontAwesomeIcon icon={regThumbsDown} size="lg" /> {dislikes.length}</button>
                                    </OverlayTrigger>
                                </div>)
                            }
                        </div>
                    </section>

                    <section className="text-editor">
                        <Editor
                            apiKey="3ru051la3ygpszi787gxznred27xo7l4dwb1wojv9qn01k9w"
                            initialValue={body}
                            disabled={true}
                            inline={true}
                        />
                    </section>
                </section>
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    background-color: white;
    margin: 0 1rem;
    padding: 1rem 0;

    .title{
        font-size: 0.8rem;
        text-decoration: underline;
        text-transform: uppercase;
        font-style: italic;
    }

    .title-text {
        font-size: 1.1rem;
        font-weight: bold;
        text-transform: uppercase;
    }

    .meta{
        display: flex;
        border-bottom: 0.5px solid gray;
        border-top: 0.5px solid gray;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        .poster {
            margin-right: 0.5rem;
            max-height: 320px;
            max-width: 565px;
        }

        .front-picture{
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .author-info {
            display: flex;
            padding-bottom: 0.5rem;

            .author {
                margin-left: 0.5rem;
            }
        }

        .article-info{
            display: flex;
            justify-content: space-between;

            a {
                text-decoration: underline;
                color: inherit;
            }

            a:hover{
                color: red;
            }
        }

        .avatar-picture {
            max-height: 3rem;
            max-width: 3rem;
            object-fit: cover;
        }

        .username{
            font-style: italic;
        }
    }

    .body {
        .body-title{
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
        }

        .delete{
            margin-left: 0.5rem;
        }
        .edit {
            margin-right: 0.5rem;

            & a {
                text-decoration:none;
                color:white;
            }
        }

        .approvals {
            display:flex;
        }

        .likes, .dislikes {
            background: none;
	        border: none;
	        padding: 0;
	        cursor: pointer;
	        outline: none;

        }

        .likes {
            color: green;
            margin-right: 1rem;
           
        }

        .dislikes {
            color: red;
        }
    }

   
    @media screen and (max-width: 991px) {
        .meta{
            flex-wrap: wrap;
        }

        .poster {
        margin-right: 0rem;
        }
    }

    @media screen and (max-width: 767px) {
        .article-info{
            flex-wrap: wrap;
            flex-direction: column;
        }
    }
`;

export default ReadArticle;