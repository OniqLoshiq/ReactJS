import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import TableRowUser from './TableRowUser';
import usersService from '../../services/usersService';

const ListUsers = () => {
    const [users, setUsers] = useState(null);
    const [search, setSearch] = useState('')

    useEffect(() => {
        usersService.getAll(search)
            .then(res => {
                setUsers(res)})
    }, [search]);

    const handleSearchClick= (e) => {
        e.preventDefault();
        setSearch(e.target["search"].value);
    }

    return (
        <Styles>
            <Form inline onSubmit={handleSearchClick}>
                <FormControl type="text" placeholder="Search" name="search" className="mr-sm-2" />
                <Button variant="outline-success" type="submit">Search</Button>
            </Form>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users ? users.map((user, index) =>  
                    <TableRowUser 
                        key={user.id}
                        number={index + 1}
                        username={user.username}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                        role={user.role}
                    />) : <tr><td colSpan="6">No results found</td></tr>}
                </tbody>
            </Table>
        </Styles>
    )
}

const Styles = styled.div`
    .form-inline {
        margin-bottom: 1.5rem;
    }
`;

export default ListUsers;