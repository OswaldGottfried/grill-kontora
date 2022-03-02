import {observer} from 'mobx-react-lite';
import Link from 'next/link';

import {useStore} from 'models';
import formatPrice from 'lib/formatPrice';
import {isLunchTime, LAUNCH_CATEGORY_NAME} from 'constants/lunch';

import Price from '@/common/price/price';
import Button from '@/common/buttons/button/button';
import CartItem from '@/cart/cartItem/cartItem';

const CartLayout = observer(() => {
  const {totalPrice, items, totalItems} = useStore('cart');
  const isEmptyCart = totalItems === 0;
  const isDisabledForOrder = (categoryName: string) => {
    return categoryName === LAUNCH_CATEGORY_NAME && !isLunchTime();
  };
  const isOneOfItemIsDisabled = items.some(({category}) => isDisabledForOrder(category));

  return (
    <section className="lg:pl-16 lg:pr-16 pt-16 sm:p-4 sm:mb-12 max-w-4xl flex flex-col ml-auto mr-auto">
      {isEmptyCart ? (
        <>
          <h1>Корзина пуста</h1>
          <div className="flex w-full mt-16 justify-center">
            <Button className="mb-16">
              <Link href="/">
                <p className="sm:text-lg">Вернуться на главную</p>
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>У вас отличный вкус!</h1>
          {isOneOfItemIsDisabled && (
            <h3 className="text-punch mt-4 pb-2 text-xg">
              Ланчи доступны к заказу с 12:00 до 16:00
            </h3>
          )}
          <ul className="mt-14 md:mt-8">
            {items.map((item) => (
              <CartItem
                key={`${item.id}_${item.modId}`}
                item={item}
                isDisabledForOrder={isDisabledForOrder(item.category)}
              />
            ))}
            <li className="mt-8 text-2xl flex justify-end w-full">
              {totalItems > 0 && (
                <h3>
                  Итого к оплате: <Price price={formatPrice(totalPrice)} />
                </h3>
              )}
            </li>
          </ul>
          <div className="flex w-full justify-end mt-12 mb-12 sm:justify-center sm:mt-6 sm:mb-6">
            <Button isDisabled>
              <p className="sm:text-lg">Перейти к оформлению</p>
              {/* <Link href="/checkout">
              </Link> */}
            </Button>
          </div>
        </>
      )}
    </section>
  );
});

export default CartLayout;
