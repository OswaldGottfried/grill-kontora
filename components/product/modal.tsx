import {FC} from 'react';
import Modal from 'react-modal';

import {ProductType} from 'types';
import {useRouter} from 'next/router';
import Product from '@/components/product/product';

Modal.setAppElement('#__next');

type PropsType = {
  products: ProductType[];
};

const ProductModal: FC<PropsType> = ({products}) => {
  const router = useRouter();
  if (!router.query.productId) return null;
  const product = products.find(({product_id}) => product_id === router.query.productId) || null;

  // console.log({id: router.query.productId, products});

  return (
    <Modal
      isOpen={Boolean(router.query.productId)}
      onRequestClose={() => router.push('/')}
      contentLabel="Product modal"
      className="bg-gray-900"
    >
      <Product product={product} />
    </Modal>
  );
};
export default ProductModal;
