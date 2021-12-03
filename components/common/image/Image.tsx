import Image, {ImageProps} from 'next/image';
import {motion} from 'framer-motion';

type Props = {
  src?: string | null;
  name?: string;
  className?: string;
} & Omit<ImageProps, 'src'>;

const ProductImage: React.FC<Props> = ({src, name, className, ...props}) => (
  <motion.div layoutId={`image_${name}_${src}`} className={className}>
    <Image
      src={src ? `https://gril-kontora.joinposter.com${src}` : '/burger.svg'}
      width={src ? 500 : 200}
      height={src ? 500 : 200}
      quality={70}
      alt={name}
      {...props}
    />
  </motion.div>
);

export default ProductImage;
