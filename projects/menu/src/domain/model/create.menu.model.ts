import { ICreateDish } from "dishes"

export interface ICreateMenu{
  menu_name: string
  menu_schedule: string
  menu_dishes: ICreateDish[]
}
