export interface IOrder {
  idOrder?: number;
  totalAmount: number;
  orderItems: IOrderItem[];
  clientName: string;
}

export interface IOrderItem {
  idItem?: number;
  idDish: number;
  quantity: number;
  price: number;
}
