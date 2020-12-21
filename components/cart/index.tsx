import Head from 'next/head';
import {observer} from 'mobx-react-lite';

import {useStore} from 'models';
import Price from '@/components/common/price/price';
import CircleButton from '@/components/common/buttons/circleButton/circleButton';
import formatPrice from 'lib/formatPrice';
import Link from 'next/link';

const CartPage = observer(() => {
  const {totalPrice, items, totalItems, remove} = useStore('cart');

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <section className="pl-16 pr-16 pt-16 sm:p-4 sm:mb-12">
        {totalItems === 0 ? <h1>Корзина пуста</h1> : <h1 className="mb-8">У вас отличный вкус!</h1>}

        <ul>
          {items.map((item) => (
            <li
              key={`${item.id}_${item.modId}`}
              className="inline-flex w-full justify-between items-center"
            >
              <Link href={`/product/${item.id}`} as={`/product/${item.id}`}>
                <h2 className="cursor-pointer w-2/6">{item.name}</h2>
              </Link>
              <img src={`https://gril-kontora.joinposter.com${item.image}`} alt="" />
              <Price price={formatPrice(item.price)} />
              <p>{item.count}</p>
              <CircleButton
                className="transform rotate-45"
                label="Удалить товар"
                value={item.id}
                onClick={(event) => remove(event.currentTarget.value)}
              />
            </li>
          ))}
          <li className="mt-8">
            {totalItems > 0 && <h3>Итого к оплате: {formatPrice(totalPrice)}</h3>}
          </li>
        </ul>
      </section>
    </>
  );
});

export default CartPage;
