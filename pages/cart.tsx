import Head from 'next/head';
import {observer} from 'mobx-react-lite';
import {CartType} from 'types/cart';

import {useStore} from 'hooks';

const Cart = observer(() => {
  const {info, remove} = useStore('cart');

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>

      <section className="pl-16 pr-16 pt-16">
        {info.length === 0 ? <h1>Корзина пуста</h1> : <h1>У вас отличный вкус!</h1>}

        {info.map((item) => (
          <ul key={item.id}>
            {Object.keys(item).map((key) => (
              <li key={key}>{`${key}: ${item[key as keyof CartType]}`} </li>
            ))}
            <button
              aria-label="Удалить товар"
              type="button"
              value={item.id}
              onClick={(event) => remove(event.currentTarget.value)}
            >
              x
            </button>
          </ul>
        ))}
      </section>
    </>
  );
});

export default Cart;
