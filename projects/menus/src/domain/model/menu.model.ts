import { IDish } from 'dishes';

export interface IMenu {
  id: number;
  name: string;
  dishfoods: IDish[];
 
}
export interface IMenuRequest {
  name: string;
}
