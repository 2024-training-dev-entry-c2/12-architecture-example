export interface IOrder {
  idOrder?: number;
  totalAmount: number;
  orderItems: IOrderItem[];
  clientName: string;
}

export interface IOrderItem {
  idItem?: number;
  dishName: string;
  quantity: number;
  price: number;
}
