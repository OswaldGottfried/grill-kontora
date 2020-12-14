import {ThemeProvider} from 'next-themes';
import {FC} from 'react';

import Layout from 'components/layout';

import 'styles/index.css';
import {Provider, rootStore} from '../models';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: FC<PropsType> = ({Component, pageProps}) => (
  <ThemeProvider defaultTheme="dark" attribute="class">
    <Provider value={rootStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ThemeProvider>
);

export default App;
