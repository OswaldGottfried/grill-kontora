import Map from '@/common/map/map';

import TotalList from './totalList/totalList';
import CheckoutForm from './checkoutForm/checkoutForm';
import s from './checkoutLayout.module.scss';

const CheckoutLayout = () => {
  return (
    <section className={s.checkout}>
      <h1 className="mb-12 sm:text-3xl sm:ml-0 ml-20 sm:mb-8">Оформление заказа</h1>
      <div className="inline-flex lg:flex-col w-full justify-between">
        <CheckoutForm />
        <TotalList className="w-1/3 lg:w-full ml-auto mr-auto sm:w-full" />
      </div>
      <Map />
    </section>
  );
};

export default CheckoutLayout;
