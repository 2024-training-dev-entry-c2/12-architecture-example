export interface IOrder {
  idOrder?: number;
  totalAmount: number;
  orderItems: IOrderItem[];
  clientName: string;
}

export interface IOrderItem {
  idOrderItem?: number;
  idDish: number;
  quantity: number;
  // idOrder?: number;
}
