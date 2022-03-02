import {NextApiRequest, NextApiResponse} from 'next';

import instance from 'lib/axios';
import {ProductType, ResponseType} from 'types';
import {API} from 'constants/endpoint';
import hiddenProducts from 'pages/api/hiddenProducts';

export const fetchProducts = async (category_id: string): Promise<ProductType[]> =>
  instance
    .get<ResponseType<ProductType[]>>(API.getProducts, {
      params: {category_id},
    })
    .then((res) => {
      return res.data.response?.filter(
        ({menu_category_id, product_id}) =>
          !hiddenProducts[menu_category_id as keyof typeof hiddenProducts]?.includes(
            product_id as never,
          ),
      );
    });

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchProducts(request.query.id.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json('product is not found');
    }
  });
}
