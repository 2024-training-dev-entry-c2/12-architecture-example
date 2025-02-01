export interface IViewOrden{
  id?: number,
  priceTotal: number,
  dateOrder?: Date,
  statusOrder: string,
  client: IClient
  isFrecuent: boolean,
  items: Item[]
}

export interface IClient {
    id?: number,
    name: string,
    email: string,
    numberPhone: string,
    isFrecuent: boolean
}

export interface IDish {
  id: number;
  name: string;
  price: number;
  popular: boolean;
}

export interface Item {
  id: number;
  name: string;
  quantity: number;
  dish: IDish;
}
