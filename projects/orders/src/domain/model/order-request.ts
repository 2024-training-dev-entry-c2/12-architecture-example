import { IDishOrder } from "./dish-order.model";

export interface IOrderRequest{
    id: number;
    clientId: number;
    dishes: IDishOrder[];
    date: Date;
}