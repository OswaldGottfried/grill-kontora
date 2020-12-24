import {observer} from 'mobx-react-lite';
import {useStore} from 'models';

import Tabs from '@/common/tabs/tabs';
import Tab from '@/common/tabs/tab/tab';

import s from './checkoutLayout.module.scss';

const CheckoutLayout = observer(() => {
  const {totalItems} = useStore('cart');

  return (
    <section className={s.checkout}>
      <h1 className="mb-8">Оформление заказа</h1>
      <Tabs>
        <Tab title="tab 1">
          <h2>Tab 1</h2>
        </Tab>
        <Tab title="tab 2">
          <h2>Tab 2</h2>
        </Tab>
      </Tabs>
    </section>
  );
});

export default CheckoutLayout;
