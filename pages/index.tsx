import Head from 'next/head';

import Category from '@/components/category';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Гриль контора в Ревде</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Category />
    </>
  );
}
