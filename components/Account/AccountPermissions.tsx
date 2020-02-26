import React from "react";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import cookie from "js-cookie";
import { Header, Checkbox, Table, Icon } from "semantic-ui-react";

const AccountPermissions = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
    console.log(response.data);
  };

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as='h2'>
        <Icon name='settings' />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const UserPermission = ({ user }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox toggle />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.createdAt}</Table.Cell>
      <Table.Cell>{user.updatedAt}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
    </Table.Row>
  );
};

export default AccountPermissions;
