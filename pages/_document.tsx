import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Lato" as="style" rel="preload" />

          <link rel="icon" href="/favicon.jpg" />
          <meta
            name="description"
            content="Доставка еды в Ревде. Гриль контора - это вкусно, уютно, тепло."
          />
          <meta
            name="keywords"
            content="grill contora, гриль контора, доставка еды, ревда, бургеры"
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
