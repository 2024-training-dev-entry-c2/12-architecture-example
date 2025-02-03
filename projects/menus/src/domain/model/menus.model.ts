import { IDish } from "../../../../dishes/src/domain/model/dishes.model";


export interface IMenu {
  id: string;
  name: string;
  description: string;
  dishes: IDish[];
}
