import {NextApiRequest, NextApiResponse} from 'next';
import instance from 'lib/axios';
import {AxiosResponse} from 'axios';

import {API} from 'constants/endpoint';
import {OrderType, OrderResponseType, OrderErrorType} from 'types/order';
import {ResponseType} from 'types';

type OrderAxiosResponseType = AxiosResponse<ResponseType<OrderResponseType> | OrderErrorType>;

export const createOrderAxios = async (order: OrderType): Promise<OrderAxiosResponseType> =>
  instance.post(API.createOrder, order);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  switch (request.method) {
    case 'POST':
      createOrderAxios(request.body)
        .then((res) => {
          // @ts-ignore
          if (res.data.error) {
            response.status(400).json(res.data);
          } else {
            // @ts-ignore
            response.status(200).json(res.data.response);
          }
        })
        .catch((error) => console.log(error));
      break;

    default:
      response.status(404);
  }
}
