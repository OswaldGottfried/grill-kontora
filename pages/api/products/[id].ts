import {NextApiRequest, NextApiResponse} from 'next';

import instance from 'lib/axios';
import {ResponseType, ProductType} from 'types';
import {API} from 'constants/endpoint';

export const fetchProducts = async (category_id: string): Promise<ProductType[]> =>
  instance
    .get<ResponseType<ProductType[]>>(API.getProducts, {params: {category_id, type: 'products'}})
    .then((res) => res.data.response);

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchProducts(request.query.id.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json('product is not found');
    }
  });
}
