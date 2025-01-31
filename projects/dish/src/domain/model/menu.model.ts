import { IDish } from "./dish.model";

export interface IMenu {
  id: number;
  name: string;
  description: string;
  dishes?: IDish[];
}