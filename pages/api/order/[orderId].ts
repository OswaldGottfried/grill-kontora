import {NextApiRequest, NextApiResponse} from 'next';
import instance from 'lib/axios';
import {API} from 'constants/endpoint';
import {OrderResponseType} from 'types/order';
import {ResponseType} from 'types';

export const fetchOrder = async (incoming_order_id: string): Promise<OrderResponseType> =>
  instance
    .get<ResponseType<OrderResponseType>>(API.getOrder, {params: {incoming_order_id}})
    .then(({data}) => data.response);

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  fetchOrder(request.query.orderId.toString()).then((res) => {
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json('order is not found');
    }
  });
}
