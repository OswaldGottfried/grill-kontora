import {FC} from 'react';
import dynamic from 'next/dynamic';
import {Element} from 'react-scroll';
import {useRouter} from 'next/router';

import {CategoryType, ProductType} from 'types';
import {DEFAULT_CATEGORY} from 'constants/category';

const CategoryList = dynamic(() => import('@/components/category/categoryList/categoryList'));
const ProductItems = dynamic(() => import('@/components/category/productItems/productItems'));

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
