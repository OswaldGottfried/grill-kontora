import {Link} from 'react-scroll';

import Header from '@/components/header/header';
import s from './topBanner.module.scss';

const TopBanner = (): JSX.Element => {
  return (
    <section className={s.topBanner}>
      {/* <Header /> */}
      <div className={s.container}>
        <h1 className={s.title}>Гриль контора</h1>
        <h2 className={s.subTitle}>
          <p>кухня на углях</p>
          <p>доставка бургеров</p>
        </h2>
        <Link className={s.button} to="menu" duration={700} offset={-30} smooth>
          Посмотреть меню
        </Link>
      </div>
    </section>
  );
};

export default TopBanner;
