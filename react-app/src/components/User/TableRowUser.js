

const TableRowUser = ({number, username, firstName, lastName, email, role}) => {
    return (
        <tr>
            <td>{number}</td>
            <td>{username}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>
                <select>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="basic">Basic</option>
                </select>
                <button>Update</button>
            </td>
        </tr>
    )
}

export default TableRowUser;