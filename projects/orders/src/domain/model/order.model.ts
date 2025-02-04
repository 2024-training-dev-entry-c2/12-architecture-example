import { IClient } from "./client.model";
import { IDish } from "./dish.model";

export interface IOrder {
    id?: number; 
    clientId: number;
    dishesId: number[];
    client?: IClient[];
    dishes?: IDish[];
    totalPrice?: number; 
    orderDate?: string; 
  }