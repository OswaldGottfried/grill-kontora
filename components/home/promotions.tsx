import {Carousel, Image as GrommetImage} from 'grommet';
import Image from 'next/image';

const Promotions = (): JSX.Element => (
  <section className="inline-flex rounded-2xl justify-center shadow-2xl w-full">
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
          width="auto"
          height={400}
          fit="cover"
          src="https://images.unsplash.com/photo-1585730315692-5252e57d4b40?q=40&h=400"
          alt="Акция 1"
        />
        <GrommetImage
          width="auto"
          height={400}
          fit="cover"
          src="https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=40&h=400"
          alt="Акция 2"
        />
      </Carousel>
    </div>
  </section>
);

export default Promotions;
