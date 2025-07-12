// pages/_app.js
// Custom App component to initialize pages and include global styles.
import '../styles/globals.css';
import Head from 'next/head'; // Import Head for global meta/links

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Global meta tags, links, etc. */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts - Inter */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
