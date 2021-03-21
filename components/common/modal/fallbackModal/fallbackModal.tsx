import Modal, {Styles} from 'react-modal';

import Plus from 'public/svg/plus.svg';

import s from './fallBackModal.module.scss';
import {PHONE} from 'constants/contacts';
import {observer} from 'mobx-react-lite';
import {useStore} from 'models';
import CartItem from '@/cart/cartItem/cartItem';
import Price from '@/common/price/price';
import formatPrice from 'lib/formatPrice';

type PropsType = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const customStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(3px)',
    zIndex: 5,
  },
  content: {
    top: '65px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    position: 'fixed',
    overflowY: 'scroll',
    border: 'none',
    background: 'rgb(255, 255, 255)',
    borderRadius: '8px',
    marginRight: '-50%',
    maxHeight: '95vh',
    maxWidth: '95vw',
    minHeight: '52px',
    transform: 'translateX(-50%)',
    zIndex: 5,
    color: 'black',
  },
};

const FallBackModal: React.FC<PropsType> = observer(({isOpen, onRequestClose}) => {
  const {totalPrice, items, totalItems} = useStore('cart');

  return (
    <Modal {...{isOpen, onRequestClose}} style={customStyles}>
      <div className={s.modal}>
        <button onClick={onRequestClose} className={s.closeButton}>
          <Plus />
        </button>
        <h1>
          Упсс...
          <span className={s.emodji}>&#129335;&#8205;&#9792;&#65039;</span>
        </h1>
        <p className={s.text}>
          Мы меняем страницу заказа, она вот-вот будет готова.
          <br /> Вы всегда можете сделать заказ по телефону
          <br />
          <a className="italic underline" href={`tel:${PHONE.href}`}>
            {PHONE.value}
          </a>
        </p>

        {items.length === 0 && <h2 className="mt-8">Ваш заказ:</h2>}
        <ul className="mt-12 md:mt-8">
          {items.map((item) => (
            <CartItem key={`${item.id}_${item.modId}`} item={item} />
          ))}
          <li className="mt-8 text-2xl flex justify-end w-full">
            {totalItems > 0 && (
              <h3>
                Итого к оплате: <Price price={formatPrice(totalPrice)} />
              </h3>
            )}
          </li>
        </ul>
      </div>
    </Modal>
  );
});

export default FallBackModal;
