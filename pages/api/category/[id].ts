import {NextApiRequest, NextApiResponse} from 'next';

import {fetchProducts} from 'pages/api/products/[id]';

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchProducts(request.query.id.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json([]);
    }
  });
}
