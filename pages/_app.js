import Head from "next/head";
import { Providers } from "../src/components/providers"; // Ensure this path is correct based on your project structure
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Providers> {/* This wraps your Component with all context providers */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link type="text/css" rel="stylesheet" href="/css/plugins.css?ver=4.1"/>
        <link type="text/css" rel="stylesheet" href="/css/style.css?ver=4.1"/>
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
