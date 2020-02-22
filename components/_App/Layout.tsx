import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";

const Layout = ({ children, user }) => (
  <>
    <Head>
      <HeadContent />
      {/* Stylesheets */}
      <link rel='stylesheet' type='text/css' href='/static/styles.css' />
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      <link
        rel='stylesheet'
        href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
      />
      {/* <link
        rel='stylesheet'
        href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
      /> */}
      <title>ReactReserveApp</title>
    </Head>
    <Header user={user} />
    <Container text styles={{ paddingTop: "1em" }}>
      {children}
    </Container>
  </>
);

export default Layout;
