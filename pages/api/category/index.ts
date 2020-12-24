import {NextApiRequest, NextApiResponse} from 'next';

import instance from 'lib/axios';
import {ResponseType, CategoryType} from 'types';
import {API} from 'constants/endpoint';

const categorySortRule = {
  '8': {
    sort_order: 1,
  },
  '12': {
    sort_order: 2,
  },
  '7': {
    sort_order: 3,
  },
  '1': {
    sort_order: 4,
  },
  '14': {
    sort_order: 5,
  },
  '3': {
    sort_order: 6,
  },
  '6': {
    sort_order: 7,
  },
  '13': {
    sort_order: 8,
  },
  '10': {
    sort_order: 9,
  },
  '2': {
    sort_order: 10,
  },
  '11': {
    sort_order: 11,
  },
  '4': {
    category_hidden: true,
  },
  '5': {
    category_hidden: true,
  },
  '15': {
    category_hidden: true,
  },
} as const;

export const fetchCategories = async (): Promise<CategoryType[]> =>
  instance.get<ResponseType<CategoryType[]>>(API.getCategories).then((res) =>
    res.data.response

      .map((item) => ({
        ...item,
        ...categorySortRule[item.category_id as keyof typeof categorySortRule],
      }))
      .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
      .filter((item) => item.category_hidden !== true),
  );

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchCategories().then((res) => response.status(200).json(res));
}
