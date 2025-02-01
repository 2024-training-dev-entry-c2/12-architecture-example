export interface ICreateOrden {
  id: number;
  priceTotal: number;
  statusOrder: string;
  clientId: number;
  items: IItemCreate[];
}

export interface IItemCreate {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  menuId: number;
  ordenId?: number;
  dish?: Dish;
}
export interface Dish {
  id: number;
  name: string;
  price: number;
  popular: boolean;
}
