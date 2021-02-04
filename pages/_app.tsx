import {AnimateSharedLayout} from 'framer-motion';
import {YMInitializer} from 'react-yandex-metrika';

import Layout from '@/layout/layout';

import 'styles/index.css';
import {Provider, rootStore} from '../models';

export type PropsType = {
  Component: any;
  pageProps: any;
};

Router.events.on('routeChangeComplete', (url: string) => {
  // To hit only in production and only on client side (in browser)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    ym('hit', url);
  }
});

const App: React.FC<PropsType> = ({Component, pageProps}) => (
  <>
    {process.env.NODE_ENV === 'production' && (
      <YMInitializer
        accounts={[parseInt(process.env.YM_COUNTER_ID as string, 10)]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
        version="2"
      />
    )}
    <AnimateSharedLayout>
      <Provider value={rootStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AnimateSharedLayout>
  </>
);

export default App;
