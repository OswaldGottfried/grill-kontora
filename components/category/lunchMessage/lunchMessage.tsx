import {isLunchCategory} from 'constants/lunch';

type Props = {
  categoryId: string;
};

const LunchMessage: React.FC<Props> = ({categoryId}) =>
  isLunchCategory(categoryId) ? (
    <div className="text-punch text-center mt-4 pb-2 text-xg">
      <h3>Ланчи доступны к заказу с 12:00 до 16:00</h3>
    </div>
  ) : null;

export default LunchMessage;
