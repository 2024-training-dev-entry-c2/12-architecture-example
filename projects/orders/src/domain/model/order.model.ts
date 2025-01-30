import { IClient } from "clients";
import { IDishOrder } from "./dish-order.model";

export interface IOrder{
    id: number;
    client: IClient;
    dishes: IDishOrder[];
    date: Date;
    total: number;
}