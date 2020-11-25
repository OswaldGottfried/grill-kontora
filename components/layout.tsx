import {FC} from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type PropsType = {
  children: JSX.Element;
};

const Layout: FC<PropsType> = ({children}) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-300 dark:bg-gray-900 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
