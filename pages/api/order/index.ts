import API from 'constants/endpoint';
import instance from 'lib/axios';
import {ResponseType} from 'types';
import {OrderType} from 'types/order';
import {NextApiRequest, NextApiResponse} from 'next';

export const createOrder = async (order: OrderType): Promise<OrderType> =>
  instance
    .post<ResponseType<OrderType>>(API.createOrder, {params: order})
    .then((res) => res.data.response);

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  createOrder(request.body).then((res) => response.status(200).json(res));
}
