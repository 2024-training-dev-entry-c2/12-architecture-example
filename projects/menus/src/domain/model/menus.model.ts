import { IDish } from 'dishes';


export interface IMenu {
  id: string;
  name: string;
  description: string;
  dishes: IDish[];
}
