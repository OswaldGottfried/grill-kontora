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
      <main className="bg-gray-300 min-h-screen dark:bg-gray-900 text-black dark:text-white pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
