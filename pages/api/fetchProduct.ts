import instance from 'lib/axios';
import {ResponseType, ProductType} from 'types';
import {API} from 'constants/endpoint';

const fetchProduct = async (product_id: string): Promise<ProductType> =>
  instance
    .get<ResponseType<ProductType>>(API.getProduct, {params: {product_id}})
    .then((res) => res.data.response);

export default fetchProduct;
