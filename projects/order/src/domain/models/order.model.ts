import { ICustomer } from './customer.model';
import { IDish } from './dish.model';

export interface IOrder {
  orderId: number;
  totalOrderPrice: number;
  date: string;
  customer: ICustomer;
  dishes: IDish[];
}

export interface IOrderForm {
  date: string;
  customerId: number;
  dishIds: number[];
}
