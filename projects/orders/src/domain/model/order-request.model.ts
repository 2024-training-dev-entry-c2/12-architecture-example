import { IDishOrder } from "./dish-order.model";

export interface IOrderRequest{
    id: number,
    clientId: number | null;
    dishes: IDishOrder[];
    date: Date | null;
}