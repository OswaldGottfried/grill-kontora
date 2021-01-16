import {GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {fetchCategories} from 'pages/api/category';

type PropsType = {
  categoryId: number;
};

const Home: React.FC<PropsType> = ({categoryId}) => {
  const {push} = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    push(`/category/${categoryId}`, undefined, {shallow: true});
  }, [categoryId, push]);

  return null;
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await fetchCategories();
  const categoryId = categories[0]?.category_id || 1;

  return {
    props: {
      categoryId,
    },
  };
};

export default Home;
