// pages/_document.js
// This file customizes the initial server-side rendered document.
// It's used to load global resources like fonts and Google Analytics efficiently.

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Load Inter font globally here */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

        {/* Google tag (gtag.js) - Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7ZM060P22W"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7ZM060P22W');
            `,
          }}
        />
        {/* End Google Analytics */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
