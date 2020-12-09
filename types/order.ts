import {CartType} from 'types/cart';

export enum ServiceMode {
  DineIn = 1,
  Takeaway = 2,
  Delivery = 3,
}

type OrderDineInType = {
  spot_id: number;
  phone: string;
  products: CartType[];
  service_mode: ServiceMode.DineIn | ServiceMode.Takeaway;
  first_name?: string;
  last_name?: string;
  address?: string;
  comment?: string;
};

type OrderDeliveryType = OrderDineInType & {
  service_mode: ServiceMode.Delivery;
  delivery_price: number;
};

export type OrderType = OrderDeliveryType | OrderDineInType;