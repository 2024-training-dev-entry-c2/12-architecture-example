import { IDishes } from "dishes";

export interface IOrders{
    id: number;
    orderDate: string;
    totalPrice: number;
    clientId:number;
    clientName: string;
    clientEmail: string;
    dishes: Array<IDishes>;
}