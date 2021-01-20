import dynamic from 'next/dynamic';

import {CategoryType, ProductType} from 'types';

const TopBanner = dynamic(() => import('@/home/topBanner/topBanner'));
const Category = dynamic(() => import('@/category/category'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: React.FC<PropsType> = ({categories, products}) => {
  if (!categories || !products) return null;
  return (
    <div className="bg-black">
      <TopBanner />
      <Category categories={categories} products={products} />
    </div>
  );
};

export default Home;
