import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (token: string): void => {
  cookie.set("token", token);
  Router.push("/account");
};

export const redirectUser = (ctx: { req: any; res: any }, location: string): void => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const handleLogout = (): void => {
  cookie.remove("token");
  // To logout from all opened windows
  window.localStorage.setItem("logout", (Date as any).now());
  Router.push("/login");
};
