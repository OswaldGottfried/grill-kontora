import {FC} from 'react';

import Header from '@/header/header/header';
import Footer from '@/footer/footer';

type PropsType = {
  children: JSX.Element;
};

const Layout: FC<PropsType> = ({children}) => {
  return (
    <>
      <Header />
      <main
        style={{
          backgroundImage:
            'linear-gradient(170deg, rgba(var(--color-california-rgb), 0.2) 0%, var(--color-black) 76%)',
        }}
        className="min-h-screen text-white bg-black  -mt-40 pt-40"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
