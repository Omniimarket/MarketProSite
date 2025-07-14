// pages/_app.tsx
// Custom App component to initialize pages and include global styles.
import '../styles/globals.css';
import Head from 'next/head'; // Import Head for global meta/links
import type { AppProps } from 'next/app'; // Import AppProps for typing

function MyApp({ Component, pageProps }: AppProps) { // Added AppProps type
  return (
    <>
      <Head>
        {/* Global meta tags, links, etc. */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Google Fonts - Inter */}
        
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
