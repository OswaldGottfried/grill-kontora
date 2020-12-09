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
    <Layout>
      <Provider value={rootStore}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  </ThemeProvider>
);

export default App;
