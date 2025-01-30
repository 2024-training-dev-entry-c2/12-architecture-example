import { IClient } from "clients";

export interface IOrder{
    id: number;
    client: IClient;
    //dishes: IDishOrderResponse[];
    date: Date;
    total: number;
}