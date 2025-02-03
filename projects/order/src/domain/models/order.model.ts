import { ICustomer } from './customer.model';
import { IDish } from './dish.model';

export interface IOrder {
  orderId: number;
  totalOrderPrice: number;
  date: Date;
  customer: ICustomer;
  dishes: IDish[];
}

export interface IOrderForm {
  customerId: number;
  dishesIds: number[];
}
