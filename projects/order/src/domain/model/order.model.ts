import { IDish } from "./dish.model";

export interface IOrder {
  id?: number;
  date?: Date | string | null;
  totalPrice: number | string | null;
  orderDetails: IOrderDetails[];
  dishesQuantity?: number;
  clientId?: number;
  clientName?: string | null;
}

export interface IOrderDetails {
  id: number;
  quantity: number;
  unitPrice: number | string | null;
  subTotal: number | string | null;
  dish: IDish;
}