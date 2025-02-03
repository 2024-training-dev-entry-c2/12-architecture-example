import { IDish } from "dishes";

export interface IMenu {
  id: number,
  name: string,
  schedule: string,
  dishes: IDish[]
}
