import { IDish } from './dish.model';

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
