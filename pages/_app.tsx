import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {NextWebVitalsMetric} from 'next/dist/next-server/lib/utils';
import {AnimateSharedLayout} from 'framer-motion';

import Layout from '@/layout/layout';

import {pageview} from 'lib/gtag';

import 'styles/index.css';
import {Provider, rootStore} from '../models';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: React.FC<PropsType> = ({Component, pageProps}) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (process.env.NODE_ENV === 'production') {
        pageview(url);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <AnimateSharedLayout>
        <Provider value={rootStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </AnimateSharedLayout>
    </>
  );
};

export default App;
