import { IClient } from "client";

export interface IOrder {
    id:number;
    client:IClient;
    localDate:Date;
    dishfoodIds:number[];
    totalPrice:number;
    
}
export interface IOrderRequest {
    clientId:number;
    localDate:Date;
    dishfoodIds:number[];
}