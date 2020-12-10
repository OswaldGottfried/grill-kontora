import Header from '@/components/header/header';
import s from './topBanner.module.scss';

const TopBanner = (): JSX.Element => {
  const scrollToMenu = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={s.topBanner}>
      <Header />
      <div className={s.container}>
        <h1 className={s.title}>Гриль контора</h1>
        <h2 className={s.subTitle}>кухня на углях доставка бургеров</h2>
        <button className={s.button} type="button" onClick={scrollToMenu}>
          Посмотреть меню
        </button>
      </div>
    </section>
  );
};

export default TopBanner;
