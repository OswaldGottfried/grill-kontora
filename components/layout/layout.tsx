import Header from '@/header/header/header';
import Footer from '@/footer/footer';

import s from './layout.module.scss';

const Layout: React.FC = ({children}) => (
  <>
    <Header />
    <main className={s.main}>{children}</main>
    <Footer />
  </>
);

export default Layout;
