import {FC} from 'react';

import Header from '@/components/header/header/header';
import Footer from '@/components/footer';

type PropsType = {
  children: JSX.Element;
};

const Layout: FC<PropsType> = ({children}) => {
  return (
    <>
      <Header />
      <main
        style={{backgroundImage: 'linear-gradient(170deg, #250000 0%, #000 76%)'}}
        className="min-h-screen text-white bg-black  -mt-40 pt-40"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
