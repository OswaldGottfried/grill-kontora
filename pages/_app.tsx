import {AnimateSharedLayout} from 'framer-motion';

import Layout from '@/layout/layout';

import 'styles/index.css';
import {Provider, rootStore} from '../models';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: React.FC<PropsType> = ({Component, pageProps}) => (
  <AnimateSharedLayout>
    <Provider value={rootStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </AnimateSharedLayout>
);

export default App;
