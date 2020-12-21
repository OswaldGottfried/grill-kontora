import {Link} from 'react-scroll';

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
        <Link className={s.button} to="menu" duration={700} offset={-30} smooth>
          Посмотреть меню
        </Link>
      </div>
      {/* <picture className={s.bg}>
        <source srcSet="/banner.webp" type="image/webp" />
        <source srcSet="/banner.jpg" type="image/jpg" />

        <img srcSet="/banner.jpg" alt="banner" />
      </picture> */}
    </section>
  );
};

export default TopBanner;
