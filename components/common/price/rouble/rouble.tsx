import Head from 'next/head';
import s from './rouble.module.scss';

const Rouble: React.FC = () => (
  <>
    <Head>
      <link rel="preload" href="/fonts/rouble.ttf" as="font" crossOrigin="" />
    </Head>
    <span className={s.rouble}>i</span>
  </>
);

export default Rouble;
