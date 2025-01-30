import { IDish } from '../../../../dish/src/domain/model/dish.model';

export interface IMenu {
  menuId: number;
  name: string;
  description: string;
  dishes: IDish[];
}
