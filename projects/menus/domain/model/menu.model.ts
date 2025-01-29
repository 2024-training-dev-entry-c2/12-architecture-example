import { IDishResponse } from 'dishes';

export interface IMenu {
  //response
  name: string;
}
export interface IMenuResponse {
  id: number;
  name: string;
  dishfoods: IDishResponse[];
}
