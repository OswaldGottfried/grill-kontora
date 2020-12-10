import {FC} from 'react';

import Footer from '@/components/footer';

type PropsType = {
  children: JSX.Element;
};

const Layout: FC<PropsType> = ({children}) => {
  return (
    <>
      <main className="bg-gray-300 dark:bg-gray-900 min-h-screen text-black dark:text-white">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
