import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios, { AxiosResponse } from "axios";
import Router from "next/router";

import { IUser } from "../models/User";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }): Promise<{ pageProps: any }> {
    const { token }: { [token: string]: string } = parseCookies(ctx);

    let pageProps: any = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute: boolean = ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload: { headers: { Authorization: string } } = {
          headers: { Authorization: token }
        };
        const url: string = `${baseUrl}/api/account`;
        const response: AxiosResponse<any> = await axios.get(url, payload);
        const user: IUser = response.data;
        const isRoot: boolean = user.role === "root";
        const isAdmin: boolean = user.role === "admin";

        // If authenticated, but not role 'admin' or 'root', redirect from '/create' page
        const isNotPermitted: boolean = !(isRoot || isAdmin) && ctx.pathname === "/create";
        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        // 1) Throw out invalid token
        destroyCookie(ctx, "token");
        // 2) Redirect to login
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps };
  }

  // Listen to storage on other opened pages to log out at the same time
  componentDidMount(): void {
    window.addEventListener("storage", this.syncLogout);
  }

  // Redirect to 'login' page when logging out
  syncLogout = (event): void => {
    if (event.key === "logout") {
      console.log("Logged out from storage");
      Router.push("/login");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
