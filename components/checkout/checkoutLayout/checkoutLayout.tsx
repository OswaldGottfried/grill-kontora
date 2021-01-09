import {observer} from 'mobx-react-lite';
import {useStore} from 'models';
import {useCallback, FormEvent, ChangeEvent} from 'react';

import Tabs from '@/common/tabs/tabs';
import Tab from '@/common/tabs/tab/tab';
import Input from '@/common/input/input';
import Button from '@/common/buttons/button/button';
import Map from '@/common/map/map';

import {ServiceMode, OrderType} from 'types/order';
import formatPrice from 'lib/formatPrice';
import {createOrder} from 'pages/api/order';
import {MIN_ORDER_AMOUNT, FREE_ORDER_AMOUNT, DELIVERY_PRICE} from 'constants/price';

import TotalList from './totalList/totalList';
import s from './checkoutLayout.module.scss';
import ORDER_INPUTS from './input';

const ORDER_TABS = [
  {title: 'Доставка', value: ServiceMode.Delivery, input: 'delivery'},
  {title: 'Самовывоз', value: ServiceMode.Takeaway, input: 'takeAway'},
] as const;

const CheckoutLayout = observer(() => {
  const {service_mode: serviceMode, setValue, getField, getFields} = useStore('checkout');
  const {items, totalPrice} = useStore('cart');
  const finalPrice = formatPrice(totalPrice);
  const isOrderAvailable =
    (finalPrice > MIN_ORDER_AMOUNT && serviceMode === ServiceMode.Delivery) ||
    serviceMode === ServiceMode.Takeaway;
  const isDeliveryFree =
    (serviceMode === ServiceMode.Delivery && finalPrice >= FREE_ORDER_AMOUNT) ||
    serviceMode !== ServiceMode.Delivery;
  const deliveryCost = isDeliveryFree ? 0 : DELIVERY_PRICE;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order: OrderType = {
      ...getFields,
      spot_id: 1,
      products: items.map(({id, modId, count, price}) => ({
        product_id: id,
        modificator_id: modId,
        count,
        price,
      })),
      delivery_price: serviceMode === ServiceMode.Delivery ? deliveryCost * 100 : 0,
    };

    const response = createOrder(order);

    console.log(response);
  };

  const onChange = useCallback(
    ({currentTarget}: ChangeEvent<HTMLInputElement>) => {
      setValue(currentTarget.name as keyof typeof getField, currentTarget.value);
    },
    [setValue],
  );

  const setServiceMode = useCallback(
    (value: string) => {
      setValue('service_mode', Number(value));
    },
    [setValue],
  );

  return (
    <section className={s.checkout}>
      <h1 className="mb-12 sm:text-3xl ml-20 sm:mb-8">Оформление заказа</h1>
      <div className="inline-flex w-full lg:flex-col">
        <Tabs
          className="w-2/3 lg:w-full"
          activeIndex={serviceMode === ServiceMode.Delivery ? 0 : 1}
          onClick={setServiceMode}
        >
          {ORDER_TABS.map((tab) => (
            <Tab key={tab.input} title={tab.title} value={tab.value} className="w-1/3 sm:w-1/2">
              <form
                className="mt-8 w-4/5 sm:w-full flex flex-col ml-auto mr-auto"
                onSubmit={onSubmit}
              >
                {ORDER_INPUTS[tab.input].map(
                  ({placeholder, type, name, inputmode, required, autoComplete}) => (
                    <Input
                      name={name}
                      key={name}
                      placeholder={placeholder}
                      type={type}
                      value={getField(name)}
                      autoComplete={autoComplete}
                      onChange={onChange}
                      required={required}
                      inputmode={inputmode}
                    />
                  ),
                )}
                <Button
                  type="submit"
                  className="mt-12 sm:mt-8"
                  isDisabled={!isOrderAvailable}
                  color="primary"
                >
                  <span>
                    {isOrderAvailable
                      ? `${tab.input === 'takeAway' ? 'Забрать  с собой' : 'Заказать доставку'}`
                      : `Набери на ${MIN_ORDER_AMOUNT - finalPrice} ${String.fromCharCode(0x20bd)} и
                      сможешь заказать доставку`}
                  </span>
                </Button>
              </form>
              <div className="mt-10" />
            </Tab>
          ))}
        </Tabs>
        <div className="w-1/3 lg:w-4/5 ml-auto mr-auto sm:w-full">
          <TotalList isDeliveryFree={isDeliveryFree} deliveryCost={deliveryCost} />
        </div>
      </div>
      <Map />
    </section>
  );
});

export default CheckoutLayout;
