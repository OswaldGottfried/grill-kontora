import Image, {ImageProps} from 'next/image';

type Props = {
  src?: string | null;
  name?: string;
  className?: string;
} & Omit<ImageProps, 'src'>;

const ProductImage: React.FC<Props> = ({src, name, className, ...props}) => (
  <Image
    className={className}
    src={src ? `https://gril-kontora.joinposter.com${src}` : '/burger.svg'}
    width={src ? 500 : 200}
    height={src ? 500 : 200}
    quality={30}
    alt={name}
    {...props}
  />
);

export default ProductImage;
