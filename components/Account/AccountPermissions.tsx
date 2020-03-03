import React from "react";
import baseUrl from "../../utils/baseUrl";
import axios, { AxiosResponse } from "axios";
import cookie from "js-cookie";
import { Header, Checkbox, Table, Icon } from "semantic-ui-react";
import formatDate from "../../utils/formatData";

import { IUser } from "../../models/User";

const AccountPermissions = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (): Promise<void> => {
    const url: string = `${baseUrl}/api/users`;
    const token: string = cookie.get("token");
    const payload: { headers: { Authorization: string } } = { headers: { Authorization: token } };
    const response: AxiosResponse<any> = await axios.get(url, payload);
    setUsers(response.data);
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

const UserPermission = ({ user }: { user: IUser }) => {
  const [admin, setAdmin] = React.useState(user.role === "admin");

  // To prevent checking role when the component mounted
  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    updatePermission();
  }, [admin]);

  const handleChangePermission = (): void => {
    setAdmin(prevState => !prevState);
  };

  const updatePermission = async (): Promise<void> => {
    const url: string = `${baseUrl}/api/account`;
    const payload: { _id: string; role: string } = {
      _id: user._id,
      role: admin ? "admin" : "user"
    };
    await axios.put(url, payload);
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox checked={admin} toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
};

export default AccountPermissions;
