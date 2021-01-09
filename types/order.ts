export enum ServiceMode {
  DineIn = 1,
  Takeaway = 2,
  Delivery = 3,
}

type OrderDineInType = {
  spot_id: number;
  phone: string;
  products: {
    product_id: string;
    modificator_id: string;
    count: number;
    price: number;
  }[];
  service_mode: ServiceMode.Takeaway;
  first_name?: string;
  last_name?: string;
  email?: string;
  comment?: string;
  delivery_price: number;
};

type OrderDeliveryType = OrderDineInType & {
  service_mode: ServiceMode.Delivery;
  address?: string;
};

export type OrderType = OrderDeliveryType | OrderDineInType;
