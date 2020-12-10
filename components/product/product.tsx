import {FC} from 'react';

import {ProductType, MayBe} from 'types';

type PropsType = {
  product: MayBe<ProductType>;
};

const Product: FC<PropsType> = ({product}) => {
  if (!product) return null;

  return (
    <section>
      <h1>{product.product_name}</h1>
      <ul>
        {Object.keys(product).map((key) => (
          <li key={key}>{`${key}: ${product[key as keyof ProductType]}`}</li>
        ))}
      </ul>
    </section>
  );
};

export default Product;
