export interface IDishRequest {//response
  name:string;
  price:number;
  isPopular:boolean;
  menuId:number;
}

export interface IDish{
  id:number;
  name:string;
  price:number;
  isPopular:boolean;
  menu:number;
  orderList:number[];
}