import { Idish } from "../../../../dish/src/domain/model/dish.model";

export interface Imenu {
  id: number;
  name: string;
  description: string;
  dishIds: Idish[];
  restaurantId?: number;
}