import {Box, Carousel, Image as GrommetImage} from 'grommet';
import Image from 'next/image';

const Promotions = () => (
  <section className=" inline-flex rounded-2xl justify-center shadow-2xl">
    <div className="w-2/4 relative">
      <Image
        src="/burger.jpg"
        className="object-cover overflow-hidden w-full h-auto"
        alt="Бургер"
        layout="fill"
      />
    </div>

    <div className="w-2/4 min-h-full">
      <Carousel className="max-h-96 overflow-hidden">
        <GrommetImage
          fit="cover"
          src="https://images.unsplash.com/photo-1585730315692-5252e57d4b40"
        />
        <GrommetImage
          fit="cover"
          src="https://images.unsplash.com/photo-1606131731446-5568d87113aa"
        />
      </Carousel>
    </div>

    {/* <GrommetImage
        fit="cover"
        src="https://images.unsplash.com/photo-1585730315692-5252e57d4b40"
      /> */}
    {/* <GrommetImage
        fit="cover"
        src="https://images.unsplash.com/photo-1606131731446-5568d87113aa"
      /> */}
  </section>
);

export default Promotions;
