import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import AccountPermissions from "../components/Account/AccountPermissions";
import { parseCookies } from "nookies";
import baseUrl from "../utils/baseUrl";
import axios, { AxiosResponse } from "axios";

import { IUser } from "../models/User";
import { IOrder } from "../models/Order";

const Account = ({ user, orders }: { user: IUser; orders: [IOrder] }) => {
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === "root" && <AccountPermissions />}
    </>
  );
};

Account.getInitialProps = async (ctx: any): Promise<[IOrder] | { orders: any[] }> => {
  const { token }: { [token: string]: string } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }

  const payload: { headers: { Authorization: string } } = { headers: { Authorization: token } };
  const url: string = `${baseUrl}/api/orders`;
  const response: AxiosResponse<[any]> = await axios.get(url, payload);
  return response.data;
};

export default Account;
