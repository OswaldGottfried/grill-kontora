import {memo} from 'react';
import Modal, {Styles} from 'react-modal';

import Plus from 'public/svg/plus.svg';

import s from './fallBackModal.module.scss';
import {PHONE} from 'constants/contacts';

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

const FallBackModal = memo<PropsType>(({isOpen, onRequestClose}) => {
  return (
    <Modal {...{isOpen, onRequestClose}} style={customStyles}>
      <div className={s.modal}>
        <button onClick={onRequestClose} className={s.closeButton}>
          <Plus />
        </button>
        <h1>
          Упсс...
          <span className={s.emodji}>&#129335;&#8205;&#9794;&#65039;</span>
        </h1>
        <p className={s.text}>
          Мы работаем над корзиной, но Вы всегда можете сделать заказ по телефону
          <br />
          <a href={`tel:${PHONE.href}`}>{PHONE.value}</a>
        </p>
      </div>
    </Modal>
  );
});

export default FallBackModal;
