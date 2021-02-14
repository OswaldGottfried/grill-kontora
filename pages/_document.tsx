import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';

import {GA_TRACKING_ID} from 'lib/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Lato" as="style" />
          <link rel="icon" href="/favicon.jpg" />
          <meta name="yandex-verification" content="690e0ebf52500cb1" />
          <meta
            name="description"
            content="Доставка еды в Ревде. Гриль контора - это вкусно, уютно, тепло."
          />
          <meta
            name="keywords"
            content="grill contora, гриль контора, доставка еды, ревда, бургеры, ревда доставка"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
