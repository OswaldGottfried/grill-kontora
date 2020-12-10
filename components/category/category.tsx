import {FC} from 'react';
import {Element} from 'react-scroll';

import {CategoryType, ProductType} from 'types';
import CategoryList from '@/components/category/categoryList/categoryList';
import ProductItems from '@/components/category/productItems/productItems';
import {useRouter} from 'next/router';
import {DEFAULT_CATEGORY} from 'constants/category';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Category: FC<PropsType> = ({categories, products}) => {
  const {query} = useRouter();
  const selected = typeof query.id === 'string' ? query.id : DEFAULT_CATEGORY;

  return (
    <section className="p-16 xl:p-12 md:p-6 sm:p-4 mt-4">
      <h2>
        <Element name="menu">Меню</Element>
      </h2>
      <CategoryList categories={categories} selected={selected} />
      <ProductItems products={products} />
    </section>
  );
};

export default Category;
