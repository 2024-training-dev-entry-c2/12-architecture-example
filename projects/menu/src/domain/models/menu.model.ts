export interface IDish {
  id: number;
  name: string;
  price: number;
  menuId: number;
}

export interface IMenu {
  menuId: number;
  name: string;
  description: string;
  dishes: IDish[];
}

export interface IMenuResponse {
  menuId: number;
  name: string;
  description: string;
  dishesIds: number[];
}
