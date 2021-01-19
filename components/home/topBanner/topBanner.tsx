import {Link} from 'react-scroll';

import Button from '@/common/buttons/button/button';
import s from './topBanner.module.scss';

const TopBanner = (): JSX.Element => {
  return (
    <section className={s.topBanner}>
      <div className={s.container}>
        <h1 className={s.title}>Гриль контора</h1>
        <h2 className={s.subTitle}>
          <p>кухня на углях</p>
          <p>доставка бургеров</p>
        </h2>
        <Button color="primary">
          <Link to="menu" duration={700} offset={-30} smooth>
            Посмотреть меню
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default TopBanner;
