import {useCallback, FormEvent, ChangeEvent, useState} from 'react';
import {AxiosError, AxiosResponse} from 'axios';
import {useRouter} from 'next/router';
import {observer} from 'mobx-react-lite';

import {ServiceMode, OrderType, OrderErrorType, OrderResponseType} from 'types/order';
import formatPrice from 'lib/formatPrice';
import instance from 'lib/axios';
import {useStore} from 'models';
import {MIN_ORDER_AMOUNT, FREE_ORDER_AMOUNT, DELIVERY_PRICE} from 'constants/price';

import Tabs from '@/common/tabs/tabs';
import Tab from '@/common/tabs/tab/tab';
import Input from '@/common/input/input';
import Button from '@/common/buttons/button/button';

import ORDER_INPUTS from './input';

const CheckoutForm = observer(() => {
  const {service_mode: serviceMode, setValue, getField, getFields, setOrderId} = useStore(
    'checkout',
  );
  const {items, totalPrice} = useStore('cart');
  const finalPrice = formatPrice(totalPrice);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const ORDER_TABS = [
    {title: 'Доставка', value: ServiceMode.Delivery, input: 'delivery'},
    {title: 'Самовывоз', value: ServiceMode.Takeaway, input: 'takeAway'},
  ] as const;
  const isDeliveryFree =
    (serviceMode === ServiceMode.Delivery && finalPrice >= FREE_ORDER_AMOUNT) ||
    serviceMode !== ServiceMode.Delivery;
  const deliveryCost = isDeliveryFree ? 0 : DELIVERY_PRICE;

  const isOrderAvailable =
    (finalPrice >= MIN_ORDER_AMOUNT && serviceMode === ServiceMode.Delivery) ||
    serviceMode === ServiceMode.Takeaway;

  const onChange = useCallback(
    ({currentTarget}: ChangeEvent<HTMLInputElement>) => {
      setErrors({[currentTarget.name]: ''});
      setValue(currentTarget.name as keyof typeof getField, currentTarget.value);
    },
    [setValue, setErrors],
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const order: OrderType = {
      ...getFields,
      spot_id: 1,
      products: items.map(({id, modId, count}) => ({
        product_id: id,
        modificator_id: modId || undefined,
        count,
      })),
      delivery_price: serviceMode === ServiceMode.Delivery ? deliveryCost * 100 : undefined,
    };

    instance
      .post('/api/order', order, {baseURL: '/'})
      .then(({data}: AxiosResponse<OrderResponseType>) => {
        window.gtag('event', 'purchase', {
          transaction_id: data.incoming_order_id,
          shipping: order.delivery_price,
          currency: 'RUB',
          items: items.map(({id, modId, count, name, price}) => ({
            id,
            variant: modId || undefined,
            quantity: count,
            name,
            price: formatPrice(price),
          })),
        });
        setLoading(false);
        setOrderId(data.incoming_order_id);
        router.push(`thankYou/${data.incoming_order_id}`);
      })
      .catch(({response}: AxiosError<OrderErrorType>) => {
        setLoading(false);
        if (response?.data) {
          setErrors({[response.data.field]: response.data.message});
        }
      });
  };

  const setServiceMode = useCallback(
    (value: string) => {
      setValue('service_mode', Number(value));
    },
    [setValue],
  );

  return (
    <Tabs
      className="w-2/4 lg:w-full"
      activeIndex={serviceMode === ServiceMode.Delivery ? 0 : 1}
      onClick={setServiceMode}
    >
      {ORDER_TABS.map((tab) => (
        <Tab key={tab.input} title={tab.title} value={tab.value} className="w-1/3 sm:w-1/2">
          <form className="mt-8 mr-8 w-full flex flex-col " onSubmit={onSubmit}>
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
                  error={errors[name as keyof typeof errors]}
                />
              ),
            )}
            <Button
              type="submit"
              className="mt-12 sm:mt-8"
              color="primary"
              isDisabled={!isOrderAvailable}
              isLoading={loading}
            >
              <span>
                {isOrderAvailable
                  ? `${tab.input === 'takeAway' ? 'Забрать с собой' : 'Заказать доставку'}`
                  : `Набери на ${MIN_ORDER_AMOUNT - finalPrice} ₽ и
                      сможешь заказать доставку`}
              </span>
            </Button>
            {isOrderAvailable && (
              <p className="mt-6 leading-3 text-sm text-gray-300">
                Нажимая на кнопку &quot;
                {tab.input === 'takeAway' ? 'Забрать с собой' : 'Заказать доставку'}
                &quot;, вы даете согласие на обработку своих персональных данных
              </p>
            )}
          </form>
          <div className="mt-10" />
        </Tab>
      ))}
    </Tabs>
  );
});

CheckoutForm.displayName = 'CheckoutForm';

export default CheckoutForm;
