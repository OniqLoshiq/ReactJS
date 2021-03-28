import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
    img {
        padding: 0;
        margin: 0.5rem 1rem;
        position: fixed;
        z-index: 2000;
        width: ${props => props.shouldFormat ? "40px" : "65px"};
        height: ${props => props.shouldFormat ? "40px" : "65px"};
    }
    .navbar {
        background-color:  ${props => props.shouldFormat ? "rgba(255, 138, 101, 1)" : "rgba(255, 138, 101, .1)"};
        padding: 0.5rem 2rem 0.5rem 5.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        justify-content: flex-end;
    }

    a, .navbar-nav .nav-link {
        color: white;
        text-decoration: none;

         &:hover {
        color: red;
        }
     }
`;

const Header = ({
    shouldFormatHeader
}) => {
    return (
        <Styles shouldFormat={shouldFormatHeader}>
            <Link to='/'>
                <img src="/EP-logo_1.png" alt="e-platform logo" />
            </Link>
            <Navbar expand="md" fixed="top">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" >Home</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                        <Nav.Link href="#">Contacts</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#">Hello, Dokka!</Nav.Link>
                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
};

export default Header;