import {ThemeProvider} from 'next-themes';
import {FC} from 'react';

import Layout from 'components/layout';

import 'styles/index.css';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: FC<PropsType> = ({Component, pageProps}) => {
  return (
    <ThemeProvider enableSystem attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
