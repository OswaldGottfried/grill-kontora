import {observer} from 'mobx-react-lite';
import clsx from 'clsx';

import {useStore} from 'models';
import formatPrice from 'lib/formatPrice';
import {ServiceMode} from 'types/order';
import {DELIVERY_PRICE, FREE_ORDER_AMOUNT} from 'constants/price';

import Price from '@/common/price/price';
import CartItem from '@/cart/cartItem/cartItem';
import Rouble from '@/common/price/rouble/rouble';
import s from '@/cart/cartItem/cartItem.module.scss';

type PropsType = {
  className?: string;
};

const TotalList: React.FC<PropsType> = observer(({className}) => {
  const {totalPrice, items} = useStore('cart');
  const {service_mode: serviceMode} = useStore('checkout');
  const finalPrice = formatPrice(totalPrice);
  const isDeliveryFree =
    (serviceMode === ServiceMode.Delivery && finalPrice >= FREE_ORDER_AMOUNT) ||
    serviceMode !== ServiceMode.Delivery;
  const deliveryCost = isDeliveryFree ? 0 : DELIVERY_PRICE;

  return (
    <section className={className}>
      <ul>
        {items.map((item) => (
          <CartItem key={`${item.id}_${item.modId}`} item={item} isOrder />
        ))}

        {serviceMode === ServiceMode.Delivery && (
          <li className={clsx(s.cartItem, 'items-center')}>
            <h3 className="ml-2 text-lg">Доставка</h3>
            {!isDeliveryFree && (
              <p className="ml-6">
                Закажи ещё на{' '}
                <span className="text-red-500">
                  {FREE_ORDER_AMOUNT - finalPrice} <Rouble />
                </span>{' '}
                для бесплатной доставки
              </p>
            )}

            <Price price={deliveryCost} />
          </li>
        )}

        <li className="mt-3 mb-10 text-xl flex justify-end items-center w-full">
          <h3>
            Итого к оплате: <Price price={finalPrice + deliveryCost} />
          </h3>
        </li>
      </ul>
    </section>
  );
});

export default TotalList;
