import {observer} from 'mobx-react-lite';
import {useStore} from 'models';
import {useCallback, FormEvent, ChangeEvent} from 'react';

import {ServiceMode} from 'types/order';
import Tabs from '@/common/tabs/tabs';
import Tab from '@/common/tabs/tab/tab';
import Input from '@/common/input/input';
import Button from '@/common/buttons/button/button';
import s from './checkoutLayout.module.scss';
import ORDER_INPUTS from './input';

const ORDER_TABS = [
  {title: 'Доставка', value: ServiceMode.Delivery, input: 'delivery'},
  {title: 'Самовывоз', value: ServiceMode.Takeaway, input: 'takeAway'},
] as const;

const CheckoutLayout = observer(() => {
  const {service_mode: serviceMode, setValue, getField} = useStore('checkout');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <h1 className="mb-12 sm:text-3xl sm:mb-8">Оформление заказа</h1>

      <Tabs activeIndex={serviceMode === ServiceMode.Delivery ? 0 : 1} onClick={setServiceMode}>
        {ORDER_TABS.map((tab) => (
          <Tab key={tab.input} title={tab.title} value={tab.value} className="w-1/3 sm:w-1/2">
            <form
              className="mt-8 w-2/3 sm:w-full flex flex-col ml-auto mr-auto"
              onSubmit={onSubmit}
            >
              {ORDER_INPUTS[tab.input].map(
                ({placeholder: label, type, name, inputmode, required, autoComplete}) => (
                  <Input
                    name={name}
                    key={name}
                    placeholder={label}
                    type={type}
                    value={getField(name)}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    required={required}
                    inputmode={inputmode}
                  />
                ),
              )}
              <Button type="submit" className="mt-12 sm:mt-8">
                <span>Сделать заказ</span>
              </Button>
            </form>
          </Tab>
        ))}
      </Tabs>
    </section>
  );
});

export default CheckoutLayout;
