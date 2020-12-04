import Head from 'next/head';
import {observer} from 'mobx-react-lite';
import {CartType} from 'types/cart';

import CartStore from 'stores/CartStore';

const Cart = observer(() => {
  const {cartInfo} = CartStore;

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>

      <section className="pl-16 pr-16 pt-16">
        {cartInfo.length === 0 ? <h1>Корзина пуста</h1> : <h1>У вас отличный вкус!</h1>}

        <ul>
          {cartInfo.map((item) =>
            Object.keys(item).map((key) => (
              <li key={key}>{`${key}: ${item[key as keyof CartType]}`}</li>
            )),
          )}
        </ul>
      </section>
    </>
  );
});

export default Cart;
