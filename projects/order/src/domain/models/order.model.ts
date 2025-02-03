import { ICustomer } from '../../../../customer/src/domain/models/customer.model';
import { IDish } from '../../../../dish/src/domain/model/dish.model';

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
