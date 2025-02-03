export interface IClients{
    id: number;
    name: string;
    email: string;
    userType:string;
    totalOrders:number;
    orders: Array<{}>;
}
