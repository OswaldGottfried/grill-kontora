import {FC} from 'react';

import Header from '@/components/header/header';
import Footer from '@/components/footer';

type PropsType = {
  children: JSX.Element;
};

const Layout: FC<PropsType> = ({children}) => {
  return (
    <>
      <Header />
      <main
        style={{minHeight: 'calc(100vh - 129px)'}}
        className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
