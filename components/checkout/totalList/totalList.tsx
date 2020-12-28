import {observer} from 'mobx-react-lite';
import {useStore} from 'models';

import Price from '@/common/price/price';
import formatPrice from 'lib/formatPrice';
import CartItem from '@/cart/cartItem/cartItem';
import {ServiceMode} from 'types/order';

import s from '@/cart/cartItem/cartItem.module.scss';

const TotalList = observer(() => {
  const {totalPrice, items} = useStore('cart');
  const {service_mode: serviceMode} = useStore('checkout');
  const isDelivery = serviceMode === ServiceMode.Delivery;
  const price = formatPrice(totalPrice);
  const DELIVERY_COST = 100;

  return (
    <section>
      <ul>
        {items.map((item) => (
          <CartItem key={`${item.id}_${item.modId}`} item={item} isOrder />
        ))}
        {isDelivery && (
          <li className={s.cartItem}>
            <h3 className="ml-2 text-lg">Доставка</h3> <Price price={100} />
          </li>
        )}
        <li className="mt-3 mb-10 text-xl flex justify-end items-center w-full">
          <h3>
            Итого к оплате: <Price price={isDelivery ? price + DELIVERY_COST : price} />
          </h3>
        </li>
      </ul>
    </section>
  );
});

export default TotalList;
