import {ThemeProvider} from 'next-themes';
import {FC} from 'react';

import Layout from 'components/layout';

import 'styles/index.css';
import {StoresProvider, stores} from 'stores';

export type PropsType = {
  Component: any;
  pageProps: any;
};

const App: FC<PropsType> = ({Component, pageProps}) => (
  <ThemeProvider defaultTheme="dark" attribute="class">
    <Layout>
      <StoresProvider value={stores}>
        <Component {...pageProps} />
      </StoresProvider>
    </Layout>
  </ThemeProvider>
);

export default App;
