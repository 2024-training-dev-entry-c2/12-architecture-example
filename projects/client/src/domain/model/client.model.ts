
export interface IClient {
  id:number;
  name:string;
  email:string;
  isOften:boolean;
  orderIds:number[];
}
export interface IClientRequest{
  name:string;
  email:string;
  isOften:false;
}