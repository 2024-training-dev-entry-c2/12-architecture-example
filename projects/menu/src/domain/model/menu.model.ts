import { Idish } from 'dish';

export interface Imenu {
  id: number;
  name: string;
  description: string;
  dishes: Idish[];
  restaurantId?: number;
}
