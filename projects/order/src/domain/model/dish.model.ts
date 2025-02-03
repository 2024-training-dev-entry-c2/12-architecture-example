import { IOrder } from "./order.model";

export interface IDish {
  id?: number;
  name: string;
  description: string;
  price: number | string | null;
  type: string;
  menuId?: number;
  menuName?: string | null;
  orders?: IOrder[];
}