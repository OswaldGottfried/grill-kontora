import {NextApiRequest, NextApiResponse} from 'next';

import instance from 'lib/axios';
import {ResponseType, CategoryType} from 'types';
import {API} from 'constants/endpoint';

export const categorySortRule = {
  '8': {
    sort_order: 10,
  },
  '12': {
    sort_order: 20,
  },
  '7': {
    sort_order: 30,
  },
  '1': {
    sort_order: 40,
  },
  '14': {
    sort_order: 50,
  },
  '3': {
    sort_order: 60,
  },
  '6': {
    sort_order: 70,
  },
  '13': {
    sort_order: 80,
  },
  '10': {
    sort_order: 90,
  },
  '2': {
    sort_order: 100,
  },
  '11': {
    sort_order: 110,
  },
  '4': {
    sort_order: 51,
  },
  '5': {
    sort_order: 41,
  },
  '15': {},
} as const;

export const fetchCategories = async (): Promise<CategoryType[]> =>
  instance.get<ResponseType<CategoryType[]>>(API.getCategories).then(({data}) => {
    return data.response
      ? data.response
          .map((item) => ({
            ...item,
            ...categorySortRule[item.category_id as keyof typeof categorySortRule],
          }))
          .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
          .filter((item) => item.category_hidden !== true)
      : [];
  });

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchCategories().then((res) => {
    response.status(200).json(res);
  });
}
