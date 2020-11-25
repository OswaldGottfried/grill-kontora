import Head from 'next/head';

import Category from '@/components/category';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <main>
        <Category />
      </main>
    </>
  );
}
