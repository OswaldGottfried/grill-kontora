import dynamic from 'next/dynamic';

const CartPage = dynamic(() => import('@/components/cart'));

const Cart = (): JSX.Element => <CartPage />;

export default Cart;
