// pages/_document.js
// This file customizes the initial server-side rendered document.
// It's used to load global resources like fonts efficiently.

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Load Inter font globally here */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* You can also add other global meta tags or links here if needed */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
