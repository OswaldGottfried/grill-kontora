import {memo} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';

import {ProductType} from 'types';
import getPriceFromProduct from 'lib/getPriceFromProduct';

import ProductImage from '@/common/image/Image';
import Price from '@/common/price/price';

import AddToCartButton from './addToCartButton/addToCartButton';

import s from '../productItems.module.scss';

type ProductItemProps = {
  product: ProductType;
  addToCart: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProductItem = memo<ProductItemProps>(({product, addToCart}) => {
  return (
    <li key={product.product_id} className={s.item}>
      <Link href={`/product/${product.product_id}`}>
        <figure className={s.image}>
          <ProductImage name={product.product_name} src={product.photo} objectFit="cover" />
        </figure>
      </Link>
      <div className="inline-flex w-full justify-between items-center h-16">
        <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
          <motion.h3 className={s.title} layoutId={product.product_name}>
            <a href={`/product/${product.product_id}`}>{product.product_name}</a>
            {product.out > 0 && ` ${product.out} гр.`}
          </motion.h3>
        </Link>
        <div className="mr-4">
          <Price price={getPriceFromProduct(product)} isExact={Boolean(product.modifications)} />
        </div>
      </div>
      <AddToCartButton product={product} addToCart={addToCart} />
    </li>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;
