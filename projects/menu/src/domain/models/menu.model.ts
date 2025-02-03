import { IDish } from './dish.model';

export interface IMenu {
  menuId: number;
  name: string;
  description: string;
  dishes: IDish[];
}

export interface IMenuFormDto {
  menuId: number | null;
  name: string;
  description: string;
  dishIds: number[];
}
