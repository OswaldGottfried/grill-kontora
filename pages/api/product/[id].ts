import {NextApiRequest, NextApiResponse} from 'next';
import instance from 'lib/axios';
import {ResponseType, ProductType} from 'types';
import {API} from 'constants/endpoint';

export const fetchProduct = async (product_id: string): Promise<ProductType> =>
  instance
    .get<ResponseType<ProductType>>(API.getProduct, {params: {product_id}})
    .then((res) => res.data.response);

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchProduct(request.query.id.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json('product is not found');
    }
  });
}
