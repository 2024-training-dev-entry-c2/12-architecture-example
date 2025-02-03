import { IOrder } from "./order.model";

export interface IClient {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  userType: string;
  orders?: IOrder[];
}