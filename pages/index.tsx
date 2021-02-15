import {GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Head from 'next/head';

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

  return (
    <Head>
      <title>Гриль контора - Ревда</title>
      <meta
        name="description"
        content="Бомбические вкусы в Ревде! От классики до нереальных сочетаний. Приходи в гости и испытай гастрономическое удовольствие🔥"
      />
      <meta
        name="keywords"
        content="grill contora, гриль контора, доставка еды, ревда, бургеры, ревда доставка, доставка бургеров, бургер, шаурма"
      />
    </Head>
  );
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
