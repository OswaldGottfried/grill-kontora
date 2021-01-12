export enum ServiceMode {
  DineIn = 1,
  Takeaway = 2,
  Delivery = 3,
}

type OrderProductType = {
  product_id: string;
  modificator_id?: string;
  count: number;
};

type OrderDineInType = {
  spot_id: number;
  phone: string;
  products: OrderProductType[];
  service_mode: ServiceMode.Takeaway;
  first_name?: string;
  last_name?: string;
  email?: string;
  comment?: string;
  delivery_price?: number;
};

type OrderDeliveryType = OrderDineInType & {
  service_mode: ServiceMode.Delivery;
  address?: string;
};

export type OrderType = OrderDeliveryType | OrderDineInType;

export type OrderResponseType = {
  incoming_order_id: number;
  type: number;
  spot_id: number;
  status: number;
  client_id: number;
  client_address_id: number;
  table_id: null;
  comment: string;
  created_at: string;
  updated_at: string;
  transaction_id: null;
  service_mode: number;
  delivery_price: number;
  fiscal_spreading: number;
  fiscal_method: '';
  promotion: null;
  first_name: string;
  last_name: null;
  phone: string;
  email: string;
  sex: null;
  birthday: null;
  address: string;
  products: OrderProductType[];
};

export type OrderErrorType = {
  error: number;
  message: string;
  field: string;
};
