import { IDishResponse } from 'dishes';

export interface IMenu {
  id: number;
  name: string;
  dishfoods: IDishResponse[];
 
}
export interface IMenuRequest {
  name: string;
}
