import {NextApiRequest, NextApiResponse} from 'next';
import fetchProduct from 'pages/api/fetchProduct';

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchProduct(request.query.id.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json('product is not found');
    }
  });
}
