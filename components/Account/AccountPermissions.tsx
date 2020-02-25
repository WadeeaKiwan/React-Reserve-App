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
    // setUsers(response.data);
    console.log(response.data);
  };

  return <>AccountPermissions</>;
};

export default AccountPermissions;
