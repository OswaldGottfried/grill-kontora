import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {NextWebVitalsMetric} from 'next/dist/next-server/lib/utils';
import {AnimateSharedLayout} from 'framer-motion';
import ym, {YMInitializer} from 'react-yandex-metrika';

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
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // To hit only in production and only on client side (in browser)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const url = window.location.pathname + window.location.search;
      ym('hit', url);
    }
  }, []);

  return (
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
};

export const reportWebVitals = ({id, name, label, value}: NextWebVitalsMetric): void => {
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
};

export default App;
