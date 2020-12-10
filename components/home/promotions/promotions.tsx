import Image from 'next/image';

import s from './promotions.module.scss';

const Promotions = (): JSX.Element => (
  <section className={s.promotions}>
    <div className="w-2/4">
      <Image
        src="/burger.jpg"
        className="object-cover overflow-hidden w-full h-auto"
        alt="Бургер"
        layout="responsive"
        width={300}
        height={300}
      />
    </div>
    <div className="w-2/4">
      <Image
        src="/burger-square-banner.jpg"
        className="object-cover overflow-hidden w-full h-auto"
        alt="Бургер"
        layout="responsive"
        width={300}
        height={300}
      />
    </div>
  </section>
);

export default Promotions;
