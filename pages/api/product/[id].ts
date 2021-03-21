import {NextApiRequest, NextApiResponse} from 'next';

import instance from 'lib/axios';
import {ResponseType, ProductType} from 'types';
import {API} from 'constants/endpoint';
import hiddenProducts from 'pages/api/hiddenProducts';

export const fetchProduct = async (product_id: string): Promise<ProductType | null> =>
  instance
    .get<ResponseType<ProductType>>(API.getProduct, {params: {product_id}})
    .then(({data: {response}}) =>
      hiddenProducts[response.menu_category_id as keyof typeof hiddenProducts]?.includes(
        response.product_id as never,
      )
        ? null
        : response,
    );

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchProduct(request.query.id.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json('product is not found');
    }
  });
}
