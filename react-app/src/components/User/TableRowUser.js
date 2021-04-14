import { useState } from 'react';
import usersService from '../../services/usersService';

const TableRowUser = ({ number, id, username, firstName, lastName, email, role }) => {
    const [roleState, setRoleState] = useState(role);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleSelectChange = ({ target: { value } }) => {
        if (value === roleState) {
            setIsDisabled(true)
        } else {
            setRoleState(value);
            setIsDisabled(false);
        }
    }

    const handleUpdateClick = () => {
        usersService.updateRole(id, roleState)
            .then(res => {
                setIsDisabled(true)
            })
    }

    return (
        <tr>
            <td>{number}</td>
            <td>{username}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>
                <select value={roleState} onChange={handleSelectChange}>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="basic">Basic</option>
                </select>
                <button onClick={handleUpdateClick} disabled={isDisabled}>Update</button>
            </td>
        </tr>
    )
}

export default TableRowUser;