export interface ICreateOrden {
  id?: number,
  priceTotal: number,
  dateOrder?: Date,
  statusOrder: string,
  client?: IClient
  isFrecuent?: boolean,
  items: Item[]
}

export interface Item {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  menuId: number;
  ordenId?: number;
  dish?: IDish;
}
export interface IDish {
  id?: number;
  name: string;
  price: number;
  popular?: boolean;
}

export interface IClient {
    id?: number,
    name: string,
    email: string,
    numberPhone: string,
    isFrecuent?: boolean
}







