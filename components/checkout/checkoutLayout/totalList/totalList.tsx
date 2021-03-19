import {observer} from 'mobx-react-lite';
import {useStore} from 'models';
import clsx from 'clsx';

import Price from '@/common/price/price';
import CartItem from '@/cart/cartItem/cartItem';
import s from '@/cart/cartItem/cartItem.module.scss';
import formatPrice from 'lib/formatPrice';
import {ServiceMode} from 'types/order';
import {FREE_ORDER_AMOUNT} from 'constants/price';
import Rouble from '@/common/price/rouble/rouble';

type PropsType = {
  deliveryCost: number;
  isDeliveryFree: boolean;
};

const TotalList: React.FC<PropsType> = observer(({deliveryCost, isDeliveryFree}) => {
  const {totalPrice, items} = useStore('cart');
  const {service_mode: serviceMode} = useStore('checkout');
  const finalPrice = formatPrice(totalPrice);

  return (
    <section>
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
