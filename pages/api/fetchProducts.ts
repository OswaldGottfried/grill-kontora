import instance from 'lib/axios';
import {ResponseType, ProductType} from 'types';
import {API} from 'constants/endpoint';

const fetchProducts = async (category_id: string): Promise<ProductType[]> =>
  instance
    .get<ResponseType<ProductType[]>>(API.getProducts, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      params: {category_id, type: 'products'},
    })
    .then((res) => res.data.response);

export default fetchProducts;
