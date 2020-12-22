import {FC} from 'react';

import Layout from 'components/layout';

import 'styles/index.css';
import {Provider, rootStore} from '../models';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: FC<PropsType> = ({Component, pageProps}) => (
  <Provider value={rootStore}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default App;
