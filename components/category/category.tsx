import {Heading} from 'grommet';
import {FC, useState} from 'react';

import {CategoryType, ProductType} from 'types';
import CategoryList from '@/components/category/categoryList/categoryList';
import CategoryItems from '@/components/category/categoryItems/categoryItems';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Category: FC<PropsType> = ({categories, products}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.category_id);

  return (
    <section className="p-16">
      <Heading>Меню</Heading>
      <CategoryList
        categories={categories}
        selected={selectedCategory}
        setCategory={setSelectedCategory}
      />
      <CategoryItems selected={selectedCategory} products={products} />
    </section>
  );
};

export default Category;
