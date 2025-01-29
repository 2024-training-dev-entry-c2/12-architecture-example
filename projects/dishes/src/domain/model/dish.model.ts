export interface IDish {//response
  name:string;
  price:number;
  isPopular:boolean;
  menuId:number;
}

export interface IDishResponse {
  id:number;
  name:string;
  price:number;
  isPopular:boolean;
  menu:string;
  orderList:number[];
}