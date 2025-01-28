export interface IUser {
  id: number;
  name: string;
}
export interface Iclient {
  id:number;
  name:string;
  email:string;
  isOften:boolean;
  orderIds:number[];
}