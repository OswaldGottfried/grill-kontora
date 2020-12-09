import fetchCategories from 'pages/api/fetchCategories';
import {NextApiRequest, NextApiResponse} from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchCategories().then((res) => response.status(200).json(res));
}
