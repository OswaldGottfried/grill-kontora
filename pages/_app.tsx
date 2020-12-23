import {FC} from 'react';
import {AnimateSharedLayout} from 'framer-motion';

import Layout from 'components/layout';

import 'styles/index.css';
import {Provider, rootStore} from '../models';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: FC<PropsType> = ({Component, pageProps}) => (
  <AnimateSharedLayout>
    <Provider value={rootStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </AnimateSharedLayout>
);

export default App;
